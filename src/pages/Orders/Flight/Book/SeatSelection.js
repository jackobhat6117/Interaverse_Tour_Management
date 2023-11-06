import React, { useState } from 'react'
import Icon from '../../../../components/HOC/Icon'
import SkullLoad from '../../../../components/DIsplay/SkullLoad'
import Button1 from '../../../../components/form/Button1'
import PlaneSeat from '../../../../components/flight/PlaneSeat'

export default function SeatSelection() {
  return (
    <div className='flex flex-col gap-4'>
      <h6>Seat Selection (Optional)</h6>
      <div className='bg-theme1/10 border-l-8 border-theme1 p-4 flex items-center gap-6'>
        <div>
          <Icon icon={'ic:round-airline-seat-recline-normal'} className='w-16 h-16' />
        </div>
        <div className='flex flex-col gap-2'>
          <b>Select your seats</b>
          <div className='flex gap-2 items-center'>
            <Icon icon='ic:round-task-alt' className='p-1' />
            <p>
              Find the most comfortable seats for your group.
            </p>
          </div>
          <div className='flex gap-2 items-center'>
            <Icon icon='ic:round-task-alt' className='p-1' />
            <p>
              Get the additional legroom you need.
            </p>
          </div>
          <div className='flex gap-2 items-center'>
            <Icon icon='ic:round-task-alt' className='p-1' />
            <p>
              Save money — adding seats after booking is usually more expensive.
            </p>
          </div>
        </div>
      </div>
      
      {[...Array(2)].map((obj,i) => (
        <FlightSeatDisplay />
      ))}
    </div>
  )
}


function FlightSeatDisplay() {
  const [open,setOpen] = useState(false);
  const [selectedSeat,setSelectedSeat] = useState();
  console.log(selectedSeat)
  return (
    <div className='flex flex-col gap-3 p-4 bg-primary !bg-opacity-[5%] rounded-md '>
      <div className='flex gap-4 items-center'>
        <div>
          <SkullLoad label='' variant='rectangular' className='w-10 !h-[100px]' />
        </div>
        <div className='flex-1 flex-col gap-3'>
          <div>
            <SkullLoad label='LOS' /> - <SkullLoad label='ISB' />
          </div>
          <p>{selectedSeat ? selectedSeat[0]?.seatNumber : 'No seat selected'}</p>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='btn text-center bg-primary/10 cursor-default text-primary' >NON</div>
          <Button1 variant='outlined' onClick={() => setOpen(!open)}>Select Seat</Button1>
        </div>
      </div>
      <div className={`h-0 transition-all overflow-hidden ${open?'!h-auto':''}`}>
        <PlaneSeat returnData={(val) => setSelectedSeat(val)} />
      </div>
    </div>
  )
}