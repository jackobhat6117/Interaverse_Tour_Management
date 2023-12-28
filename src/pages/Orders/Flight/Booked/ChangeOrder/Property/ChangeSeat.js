import React, { useState } from 'react'
import { FlightSeatDisplay } from '../../../Book/SeatSelection'
import SelectInput from '../../../../../../components/form/SelectInput'
import { MenuItem } from '@mui/material'
import ConfirmChangeModal from './ConfirmChangeModal'
import Button1 from '../../../../../../components/form/Button1'


export default function ChangeSeat({callback}) {
  const data = {
    passengers: [
      {id: 1,firstName: 'John',lastName: 'Doe'},
      {id: 2,firstName: 'John',lastName: 'Doe'},
    ],
    flights: [
      1,2
    ]
  }

  const [open,setOpen] = useState(false);

  function handleSubmit() {
    callback && callback();
  }
  return (
    <div className='flex flex-col gap-4'>
        <SelectInput label='Select Passengers'>
          {data.passengers.map((obj,i) => (
            <MenuItem key={i} value={obj.id}>{obj.name}</MenuItem>
          ))}
        </SelectInput>
        {data.flights.map((obj,i) => (
          <FlightSeatDisplay key={i} obj={obj} />
        ))}
        <div className='flex gap-4'>
          <button className='px-6'>Cancel</button>
          <Button1 onClick={() => setOpen(true)}>Confirm</Button1>
        </div>
        <ConfirmChangeModal callback={handleSubmit} open={open} setOpen={setOpen} />

    </div>
  )
}
