import React, { useState } from 'react'
import Modal1 from '../../components/DIsplay/Modal/Modal1';
import Button1 from '../../components/form/Button1';
import cancelBooking from '../../controllers/booking/cancelBooking';
import { useSnackbar } from 'notistack';

export default function CancelOrder({open,setOpen,callback}) {
  const [loading,setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  async function handleSubmit() {
    setLoading(true);
    const res = await cancelBooking(open);
    setLoading(false);
    if(res.return) {
      enqueueSnackbar('Booking Canceled',{variant: 'success'})
      callback && callback()
    } else enqueueSnackbar(res.msg,{variant: 'error'})
  }
  return (
    <div>
      <Modal1 open={open} setOpen={setOpen}>
        <div className='p-10 flex flex-col gap-4 max-w-[400px]'>
          <h5 className='self-center'>Cancel Order [{open}]</h5>
          {/* <div className='flex gap-4 justify-between'>
            <b>Refund Amount</b>
            <b>{getCurrencySymbol('NGN')}123,000</b>
          </div>
          <div className='flex gap-4 justify-between'>
            <p>Refund Type</p>
            <p>Balance</p>
          </div> */}
          
          <p className='py-4'>
            By cancelling this order, your customer will no longer be registered on this flight. This action cannot be undone.
          </p>

          <div className='flex gap-4'>
            <Button1 className='flex-1 !btn-theme-light' onClick={() => setOpen(false)}>Cancel</Button1>
            <Button1 className='!bg-red-500 ' loading={loading} onClick={() => handleSubmit()}>Confirm</Button1>
          </div>
        </div>
      </Modal1>
    </div>
  )
}
