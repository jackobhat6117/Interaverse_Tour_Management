import React, { useState } from 'react'
import Button1 from '../../components/form/Button1'
import { useSnackbar } from 'notistack'
import queueTicket from '../../controllers/booking/queueTicket';

export default function TicketIssue({data,close,callback}) {
    const [loading,setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    console.log(data?.pnr)
    
    async function handleTicket() {
        const reqBody = {
            // supplier: data?.supplier,
            flightBookingId: data?._id,
            // orderId: data?.orderId,
            // fop: [
            //     {
            //         "method": "Cash"
            //     }
            // ]
        }
        setLoading(true);
        const res = await queueTicket(reqBody);
        setLoading(false);
        if(res.return) {
            enqueueSnackbar('Your ticket request has been received.',{variant: 'success'})
            callback && callback()
        } else enqueueSnackbar(res.msg,{variant: 'error'})
    }
    
  return (
    <div className='card p-10 flex flex-col gap-4 justify-center'>
        <h5>Issue Ticket for booking [{data?.pnr}]</h5>
        <p>Do you want to issue ticket for this booking?</p>
        <div className='flex w-full gap-2'>
            <Button1 variant={'outlined'} className='!w-auto' onClick={close}>Cancel</Button1>
            <Button1 className='' loading={loading} onClick={handleTicket}>Confirm</Button1>
        </div>
    </div>
  )
}
