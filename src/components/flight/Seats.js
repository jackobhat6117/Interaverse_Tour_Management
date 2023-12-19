import React, { useState } from 'react'
import TextInput from '../form/TextInput'
import { MenuItem } from '@mui/material'
import RadioGroup from '../form/RadioGroup'
import baggage1x from '../../assets/images/1xbaggage.svg';
import baggage2x from '../../assets/images/2xbaggage.svg';
import Button1 from '../form/Button1';
import { formatMoney } from '../../features/utils/formatMoney';
import { useSnackbar } from 'notistack';
import { FlightSeatDisplay } from '../../pages/Orders/Flight/Book/SeatSelection';

export default function AddFlightSeats({data,cancel,callback}) {
    const {enqueueSnackbar} = useSnackbar();
    let baggages = [
        {title: <span>1x checked bag, <b>23kg</b></span>,price: 20000,image: baggage1x,value: 1},
        {title: <span>2x checked bag, <b>23kg each</b></span>,price: 40000,image: baggage2x,value: 2},
    ]
    const [loading,setLoading] = useState(false);

    async function handleSubmit() {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve,2000))
        callback && callback()
        enqueueSnackbar('Successfull',{variant: 'success'})

        setLoading(false);
    }
  return (
    <div className='flex flex-col gap-3 max-w-[600px]'>
        <TextInput select label='Select passenger'>
            <MenuItem>Okafor Chinema</MenuItem>
            {data?.passengers?.map((obj,i) => (
                <MenuItem value={obj?.id}>{obj?.firstName} {obj?.lastName}</MenuItem>
            ))}
        </TextInput>
        <FlightSeatDisplay />

        <div className='flex gap-4'>
            {cancel ?
                <button onClick={cancel} className='px-6'>Cancel</button>
            :null}
            <Button1 loading={loading} onClick={handleSubmit}>Confirm</Button1>
        </div>
    </div>
  )
}
