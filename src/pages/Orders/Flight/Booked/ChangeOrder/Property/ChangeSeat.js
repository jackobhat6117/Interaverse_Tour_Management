import React, { useState } from 'react'
import { FlightSeatDisplay } from '../../../Book/SeatSelection'
import SelectInput from '../../../../../../components/form/SelectInput'
import { MenuItem } from '@mui/material'
import ConfirmChangeModal from './ConfirmChangeModal'
import Button1 from '../../../../../../components/form/Button1'
import convertFlightObject from '../../../../../../features/utils/flight/flightOfferObj'
import { clone } from '../../../../../../features/utils/objClone'


export default function ChangeSeat({callback,orgi}) {
  const convertedData = convertFlightObject(clone(orgi?.orderDetail?.offers?.at(0)) || {})
  const data = {
    passengers: orgi?.orderDetail?.travelers,
    flights: convertedData?.directions?.flat()
  }

  console.log('orgi: ',orgi,convertedData,orgi?.orderDetail?.offers)
  const [open,setOpen] = useState(false);

  function handleSubmit() {
    callback && callback();
  }
  return (
    <div className='flex flex-col gap-4'>
        <SelectInput label='Select Passengers'>
          {data.passengers.map((obj,i) => (
            <MenuItem key={i} value={obj.id}>{obj?.name?.firstName} {obj?.name?.lastName}</MenuItem>
          ))}
        </SelectInput>
        {(data.flights || [...Array(2)]).map((obj,i) => (
          <FlightSeatDisplay key={i} routeIndex={i} obj={obj} offers={orgi?.orderDetail?.offers} />
        ))}
        <div className='flex gap-4'>
          <button className='px-6'>Cancel</button>
          <Button1 onClick={() => setOpen(true)}>Confirm</Button1>
        </div>
        <ConfirmChangeModal callback={handleSubmit} open={open} setOpen={setOpen} />

    </div>
  )
}
