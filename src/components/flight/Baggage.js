import React, { useState } from 'react'
import TextInput from '../form/TextInput'
import { MenuItem } from '@mui/material'
import RadioGroup from '../form/RadioGroup'
import baggage1x from '../../assets/images/1xbaggage.svg';
import baggage2x from '../../assets/images/2xbaggage.svg';
import Button1 from '../form/Button1';
import { formatMoney } from '../../features/utils/formatMoney';
import { useSnackbar } from 'notistack';
import SelectInput from '../form/SelectInput';

export default function AddFlightBaggage({data,cancel,callback}) {
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
        <SelectInput label='Select Passengers'>
          {data?.passengers?.map((obj,i) => (
            <MenuItem key={i} value={obj.id}>{obj?.name?.firstName} {obj?.name?.lastName}</MenuItem>
          ))}
        </SelectInput>

        <div className='flex gap-4 justify-between'>
            <b>Primary Passenger</b>
            <p>Adult (over 12 years)</p>
        </div>

        <div className='flex flex-col gap-2'>
            Checked baggage
            <RadioGroup className='flex gap-3 ' radioClass='!items-start' options={baggages} render={(obj) => (
                <div className='flex flex-col gap-3'>
                    {obj?.title}
                    <div className='flex gap-4 justify-between items-center'>
                        <img alt='' src={obj?.image} className='w-[100px]' />
                        <h5>{formatMoney(obj?.price)}</h5>
                    </div>
                </div>
            )} />
            <div className='tooltip'>
                Includes larger baggage items that you must deposit at the airline check-in counter before going through security at the airport.
            </div>
        </div>

        <div className='flex gap-4'>
            {cancel ?
                <button onClick={cancel} className='px-6'>Cancel</button>
            :null}
            <Button1 loading={loading} onClick={handleSubmit}>Confirm</Button1>
        </div>
    </div>
  )
}
