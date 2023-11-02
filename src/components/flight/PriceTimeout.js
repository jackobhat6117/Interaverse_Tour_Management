import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { priceTimeout } from '../../config';
import Modal1 from '../DIsplay/Modal/Modal1';
import Button1 from '../form/Button1';

// export const PriceTimeout = (
//   <div className="self-center ">
//     <div className='bg-secondary p-10 m-2 rounded-md'>
//       <h2>Price might have changed.</h2>
//       <br />
//       <p>You have been gone for too long. please kindly reload the page</p>
//     </div>
//   </div>
// )


export default function PriceTimeout({returnData,gotTime}) {
  const [open,setOpen] = useState(false);
  const {bookingData} = useSelector((state) => state.flightBooking);

  useEffect(() => {
    let t = null;

    const time = gotTime === undefined ? bookingData.time : gotTime;

    if(time) {

      // console.log(time);
      let now = new Date().getTime();
      let timePass = (now - parseInt(time));
  
      // console.log(priceTimeout)
      // console.log(timePass)
      // console.log(priceTimeout - timePass)

      t = setTimeout(() => {
        setOpen(true);
        if(returnData)
          returnData(true);
      },priceTimeout - timePass)
    }

    return () => clearTimeout(t);

  },[bookingData,returnData,gotTime])

  function handleOpen(val) {
    setOpen(val);
    window.location.reload();
  }
  return (
    <Modal1 open={open} setOpen={handleOpen}>
      <div className="self-center ">
        <div className='bg-secondary p-10 m-2 rounded-md'>
          <h4 className='py-2'>You have been gone for too long.</h4>
          <p> The flight offer may have changed. Click the button to get the latest price.</p>
          <br />
          <div className='flex justify-end'>
            <Button1 className='btn1 !w-auto self-end' onClick={() => window.location.reload()}>Refresh</Button1>
          </div>
        </div>
      </div>
    </Modal1>
  )
}
