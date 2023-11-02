import React from 'react'
import Modal1 from '../../components/DIsplay/Modal/Modal1';
import Button1 from '../../components/form/Button1';
import { getCurrencySymbol } from '../../features/utils/countires';

export default function CancelOrder({open,setOpen}) {
  return (
    <div>
      <Modal1 open={open} setOpen={setOpen}>
        <div className='p-10 flex flex-col gap-4 max-w-[400px]'>
          <h5 className='self-center'>Cancel Order [OrderID]</h5>
          <div className='flex gap-4 justify-between'>
            <b>Refund Amount</b>
            <b>{getCurrencySymbol('NGN')}123,000</b>
          </div>
          <div className='flex gap-4 justify-between'>
            <p>Refund Type</p>
            <p>Balance</p>
          </div>
          
          <p className='py-4'>
            By cancelling this order, your customer will no longer be registered on this flight. This action cannot be undone.
          </p>

          <div className='flex gap-4'>
            <Button1 className='flex-1 !btn-theme-light' onClick={() => setOpen(false)}>Cancel</Button1>
            <Button1 className='!bg-red-500 '>Confirm</Button1>
          </div>
        </div>
      </Modal1>
    </div>
  )
}
