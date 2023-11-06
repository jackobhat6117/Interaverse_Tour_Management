import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { planeSeatsTemp } from '../../data/flight/planeSeatsTemp';
import getFlightSeats from '../../controllers/Flight/getFlightSeats';
import { def } from '../../config';


export const colorCode = {
  additional: '#aaa',
  included: '#FFF',
  selected: '#FFA30E',
  NA: '#333'
};

const test = def.devStatus === 'test';

function PlaneSeat({flightData,returnData}) {
  // const [data,setData] = useState(planeSeatsTemp);
  const [data,setData] = useState(test ? planeSeatsTemp : null);
  const [selected,setSelected] = useState({});
  const [loading,setLoading] = useState(false);

  const [gotResp,setGotResp] = useState(false);

  const returnDataCall = useCallback((req) => {
    if(returnData && (gotResp || test))
      returnData(req)
  },[returnData,gotResp])

  const fetchFlightSeats = useCallback(async() => {
    if(flightData) {
      const res = await getFlightSeats(flightData);
      return res;
    }
    return {return: false}
  },[flightData])


  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetchFlightSeats();
      setLoading(false);
      if(res.return) {
        setData(res.data)
        setGotResp(true)
      }
    }
    if(flightData)
      load();
  },[flightData])


  // useEffect(() => {
  //   let req = Object.entries(selected).map(([key,obj]) => ({...obj,seatNumber: key}))
  //   console.log(req)
  // },[selected])

  function handleReturn(newObj) {
    let pricingDetail = {
      "seatNumber": 0,
      "amount": 0,
      "currency": "NGN",
      "fareAmount": 0
    }

    let req = Object.entries(newObj).map(([key,obj]) => ({pricingDetail,...obj,seatNumber: key}))
    if(returnDataCall)
      returnDataCall(req)

    // console.log('selected Seat: ',req)
  } 

  let rows = []

  try {
    rows = data.seatmapInformation.row
  } catch(ex) {}

  function toggleSeat(obj,loc) {
    // console.log(' toggle seat : ',obj)
    if(selected[loc]) removeFromSeat(loc)
    else placeSeat(obj,loc)
  }
  function placeSeat(row,key) {
    // let newObj = clone(selected);
    // newObj[key] = row;
    setSelected({[key]:row})

    handleReturn({[key]:row})
  }
  function removeFromSeat(key) {
    const {[key]:_,...rest} = selected;
    setSelected(rest)

    handleReturn(rest)
  }

  // console.log('seatRow: ',planeSeatsTemp.seatmapInformation.row)
  return (
    <div className='flex justify-center gap-2 p-2 flex-wrap'>
      {loading ? (
        <div className='w-full h-full flex border-primary/40 py-2 items-center justify-center'>
          <div className='load'></div>
        </div>
      ):null}

      {/* {flightData.flightNumber} */}

      {rows.map((obj,i) => (
        <div className='flex gap-2' key={i}>
          {obj.rowDetails.seatOccupationDetails && obj.rowDetails.seatOccupationDetails.map((col,i) => {
            let loc = obj.rowDetails.seatRowNumber+""+col.seatColumn
            return (
            <label key={i} onClick={() => toggleSeat(obj,loc)} 
             className={`w-10 h-10 bg-primary/10 flex flex-col items-center justify-center cursor-pointer
              hover:shadow-md shadow-primary hover:border-theme1 border
              ${selected[loc] ? ' bg-theme1 ':''}
            `}>
              {loc}
              {/* <small className='w-full !text-[8px] text-center'>{col.seatCharacteristic['3'] === 'W' && "window"}</small> */}
            </label>
          )})}
        </div>
      ))}
      {!rows.length && !loading && "---"}
    </div>
  )
}

export default memo(PlaneSeat)