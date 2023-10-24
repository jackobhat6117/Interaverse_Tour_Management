import React from 'react'
import Modal1 from '../../components/DIsplay/Modal/Modal1';
import { PassengerInputs } from './PassengersInput';
import Button1 from '../../components/forms/Button1';

export default function AddSeats({open,setOpen}) {
  return (
    <div>
      <Modal1 open={open} setOpen={setOpen}>
        <div className='p-5 flex flex-col gap-4 max-w-[650px]'>
          <h5>Add Seat</h5>
          <div className='flex gap-4 justify-between'>
            <b>Primary Passenger</b>
            <p>Adult (over 12 years)</p>
          </div>
          <PassengerInputs label='Select Traveler' />

          <div className='flex justify-end'>
            <div>
              <Button1 variant={'outlined'}>Add another seat for passenger</Button1>
            </div>
          </div>
          <div className='flex gap-4'>
            <Button1 className='flex-1 !btn-theme-light' onClick={() => setOpen(false)}>Cancel</Button1>
            <Button1 className=''>Confirm</Button1>
          </div>
        </div>
      </Modal1>
    </div>
  )
}
