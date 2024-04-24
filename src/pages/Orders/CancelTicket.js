import React, { useState } from 'react'
import Button1 from '../../components/form/Button1'
import issueTicket from '../../controllers/booking/issueTicket'
import { useSnackbar } from 'notistack'
import cancelTicket from '../../controllers/booking/cancelTicket';

export default function CancelTicket({data,close,callback}) {
    const [loading,setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    
    async function handleCancel() {
        const reqBody = {
            flightBookingId: data?._id,
        }
        setLoading(true);
        const res = await cancelTicket(reqBody);
        setLoading(false);
        if(res.return) {
            callback && callback()
        } else enqueueSnackbar(res.msg,{variant: 'error'})
    }
    
  return (
    <div className='card p-10 flex flex-col gap-4 justify-center'>
        <h5>Cancel Ticket for booking [{data?.pnr}]</h5>
        <p>Do you want to cancel ticket for this booking?</p>
        <div className='flex w-full gap-2'>
            <Button1 variant={'outlined'} className='!w-auto' onClick={close}>Cancel</Button1>
            <Button1 className='' loading={loading} onClick={handleCancel}>Confirm</Button1>
        </div>
    </div>
  )
}
