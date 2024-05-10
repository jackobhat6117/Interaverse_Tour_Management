import React, { memo, useState } from 'react';
import { formatMoney } from '../../features/utils/formatMoney';
import { getCurrencySymbol } from '../../features/utils/countires';

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
	let seats = deck?.seats || seatMapData[0]?.seatMap?.flat();

	let width = deck?.deckConfiguration?.width || seatMapData[0]?.seatMap?.length;
	let length = deck?.deckConfiguration?.length || seatMapData[0]?.seatMap?.at(0)?.length;


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
    if(!loc) return false;
    
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

  console.log(seatMapData);
  return (
    <div className='flex flex-col justify-center overflow-x-auto gap-2 p-2 flex-wrap'>
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
                className={`w-10 h-10 bg-primary/10 flex flex-col items-center justify-center
                hover:shadow-md shadow-primary  border transition-all
                ${selected[seat?.number] ? ' bg-theme1 ':''}
                ${seat?.number ? ' cursor-pointer hover:border-theme1 hover:scale-150 ':' cursor-not-allowed '}
              `}>
                {seat?.number}
                {/* {width*i+j} */}
                {/* <sub className='text-[8px] text-theme1'> */}
                <small className={`text-[8px]  font-bold 
                  ${selected[seat?.number] ? ' text-secondary ':' text-theme1 '}
                `}>
                  {!seat?.pricing?.total ? 
                    seat?.travelerPricing?.at(0)?.price?.total ? `${formatMoney(seat?.travelerPricing?.at(0)?.price?.total,getCurrencySymbol(seat?.travelerPricing?.at(0)?.price?.currency))}` : ''
                   : formatMoney(seat?.pricing?.total,getCurrencySymbol(seat?.pricing?.total?.split(' ')[0]))}
                  {/* {seat?.characteristicsCodes?.includes('W') ? 'window':''} */}
                </small>
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