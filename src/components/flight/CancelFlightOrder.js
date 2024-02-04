import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import Button1 from '../form/Button1';
import { formatMoney } from '../../features/utils/formatMoney';

export default function CancelFlightOrder({cancel,callback}) {
    let obj = {
        orderId: 'D2AAFL',
        refund: 1000000,
        type: 'Balance',
    }
    const [loading,setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();


    async function handleSubmit() {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve,2000))
        callback && callback()
        enqueueSnackbar('Successfull',{variant: 'success'})

        setLoading(false);
    }

  return (
    <div className='flex flex-col gap-4 max-w-[400px]'>
        <h5 className='self-center'>Cancel Order {obj.orderId}</h5>
        <div className='flex justify-between gap-4'>
            <b>Refund Amount:</b>
            <b>{formatMoney(obj.refund)}</b>
        </div>
        <div className='flex justify-between gap-4'>
            <span>Refund Type:</span>
            <span>{obj.type}</span>
        </div>

        <p>
            By cancelling this order, your customer will no longer be registered on this flight. This action cannot be undone.
        </p>

        <div className='flex gap-4'>
            {cancel ?
                <button onClick={cancel} className='px-6'>Cancel</button>
            :null}
            <Button1 loading={loading} onClick={handleSubmit} className='!bg-red-500 !text-white'>Confirm</Button1>
        </div>

    </div>
  )
}
