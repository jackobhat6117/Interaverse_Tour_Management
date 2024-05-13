import React from 'react'
import Modal1 from '../../components/DIsplay/Modal/Modal1';
import { PassengerInputs } from './PassengersInput';
import { RadioGroup } from '@mui/material';
import RadioInput from '../../components/form/RadioInput';
import { Icon } from '@iconify/react';
import { getCurrencySymbol } from '../../features/utils/countires';
import Button1 from '../../components/form/Button1';

export default function AddBags({open,setOpen}) {
  return (
    <div>
      <Modal1 open={open} setOpen={setOpen}>
        <div className='p-5 flex flex-col gap-4 max-w-[650px]'>
          <h5>Add Bag</h5>
          <div className='flex gap-4 justify-between'>
            <b>Primary Passenger</b>
            <p>Adult (over 12 years)</p>
          </div>
          <PassengerInputs />
          <h5>Checked baggage</h5>
          <RadioGroup name='baggage' >
            <div className='flex gap-4 flex-wrap md:flex-nowrap'>
              <RadioInput>
                <div className='flex flex-col gap-2 py-1 h-full justify-between w-full'>
                  <div>
                    1x checked bag, <b>23kg</b>
                  </div>
                  <div className='flex gap-2 justify-between items-center'>
                    <Icon icon={'fluent-emoji:luggage'} fontSize={100} />
                    <h6>{getCurrencySymbol('NGN')}30,000</h6>
                  </div>
                </div>
              </RadioInput>
              <RadioInput>
                <div className='flex flex-col gap-2 py-1 h-full justify-between w-full'>
                  <div>
                    2x checked bag, <b>23kg each</b>
                  </div>
                  <div className='flex gap-2 justify-between items-center'>
                    <div className='relative flex '>
                      <Icon icon={'twemoji:luggage'} fontSize={100} className='!' />
                      <Icon icon={'openmoji:luggage'} fontSize={100} className='top-0 left-0 -translate-x-14 translate-y-4'/>
                    </div>
                    <h6>{getCurrencySymbol('NGN')}40,000</h6>
                  </div>
                </div>
              </RadioInput>
            </div>
            <div className='tooltip my-4'>
              Includes larger baggage items that you must deposit at the airline check-in counter before going through security at the airport.
            </div>
          </RadioGroup>
          <div className='flex justify-end'>
            <div>
              <Button1 variant={'outlined'}>Add another bag for passenger</Button1>
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
