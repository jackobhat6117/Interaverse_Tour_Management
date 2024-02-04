import React, { memo, useCallback, useState } from 'react';

export const colorCode = {
  additional: '#aaa',
  included: '#FFF',
  selected: '#FFA30E',
  NA: '#333'
};

// const test = def.devStatus === 'test';

function PlaneSeat({seatMapData,loading,returnData}) {
  const [selected,setSelected] = useState({});
  let deck = seatMapData[0]?.decks?.at(0);
	let seats = deck?.seats

	let width = deck?.deckConfiguration?.width;
	let length = deck?.deckConfiguration?.length;


  function handleReturn(newObj) {
    let pricingDetail = {
      "seatNumber": 0,
      "amount": 0,
      "currency": "NGN",
      "fareAmount": 0
    }

    let req = Object.entries(newObj).map(([key,obj]) => ({pricingDetail,...obj,seatNumber: key}))
    returnData && returnData(req)


  } 

  function toggleSeat(obj,loc) {
    if(selected[loc]) removeFromSeat(loc)
    else placeSeat(obj,loc)
  }
  function placeSeat(row,key) {
    setSelected({[key]:row})

    handleReturn({[key]:row})
  }
  function removeFromSeat(key) {
    const {[key]:_,...rest} = selected;
    setSelected(rest)

    handleReturn(rest)
  }

  return (
    <div className='flex flex-col justify-center gap-2 p-2 flex-wrap'>
      {loading ? (
        <div className='w-full h-full flex border-primary/40 py-2 items-center justify-center'>
          <div className='load'></div>
        </div>
      ):null}

      {[...Array(length)]?.map((_,i) => 
				<div className='flex gap-2 justify-center'> {
					[...Array(width)]?.map((_,j) => {
            // if(width*i+j < seats?.length) return null;

            let seat = seats?.at(width*i+j);
            if(!seat) return null;

            return (
              <span 
                // className='bg-black text-white p-2 m-2 w-10 h-10 flex flex-col items-center justify-center '
                onClick={() => toggleSeat(seat,seat?.number)}
                className={`w-10 h-10 bg-primary/10 flex flex-col items-center justify-center cursor-pointer
                hover:shadow-md shadow-primary hover:border-theme1 border
                ${selected[seat?.number] ? ' bg-theme1 ':''}
              `}>
                {seat?.number}
                {/* {width*i+j} */}
                <sub className='text-[8px]'>
                  {seat?.characteristicsCodes?.includes('W') ? 'window':''}
                </sub>
              </span>
            )
          })
				}</div>
			)}

      {/* {flightData.flightNumber} */}

      {/* {rows.map((obj,i) => (
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
              <small className='w-full !text-[8px] text-center'>{col.seatCharacteristic['3'] === 'W' && "window"}</small>
            </label>
          )})}
        </div>
      ))} */}
      
      <div className='flex items-center justify-center'>
        {!seats?.length && !loading && "---"}
      </div>
    </div>
  )
}

export default memo(PlaneSeat)