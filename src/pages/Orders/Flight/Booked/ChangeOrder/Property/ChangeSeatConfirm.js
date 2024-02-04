import React, { useState } from 'react'
import { FlightSeatDisplay } from '../../../Book/SeatSelection'
import SelectInput from '../../../../../../components/form/SelectInput'
import { MenuItem } from '@mui/material'
import ConfirmChangeModal from './ConfirmChangeModal'
import Button1 from '../../../../../../components/form/Button1'
import ContentInfo from '../../../../../../components/DIsplay/ContentInfo'
import { formatMoney } from '../../../../../../features/utils/formatMoney'


export default function ChangeSeatConfirm({callback}) {
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
    <div className='flex flex-col gap-10'>
      <ContentInfo>
        Selection of seat comes with a fee
      </ContentInfo>
      <div className='flex gap-4 justify-between'>
        <h5>Seat Details</h5>
        <small className='warn'>Changes detected</small>
      </div>
        {data.passengers.map((obj,i) => (
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-1'>
              <p>Passenger Name</p>
              <b>{obj.firstName} {obj.lastName}</b>
            </div>
            {data.flights.map((obj,i) => (
              <FlightSeatDisplay key={i} obj={obj} readOnly />
            ))}
          </div>
        ))}
        <div>The changes you have carried out has a fee of <b>{formatMoney(60000)}</b></div>
        <div className='flex gap-4'>
          <button className='px-6'>Cancel</button>
          <Button1 onClick={() => setOpen(true)}>Confirm</Button1>
        </div>
        <ConfirmChangeModal callback={handleSubmit} open={open} setOpen={setOpen} />

    </div>
  )
}
