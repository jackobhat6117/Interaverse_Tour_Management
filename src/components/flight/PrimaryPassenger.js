import React from 'react'
import Collapse from '../mini/Collapse'
import TextInput from '../form/TextInput'
import CountriesInput from '../form/CountriesInput'
import SelectInput from '../form/SelectInput'
import { MenuItem } from '@mui/material'
import CalendarInput1 from '../form/CalendarInput1'

export default function PrimaryPassenger({label}) {
  return (
    <div>
      <Collapse label={label || 'Primary Passenger'} show>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-4 flex-wrap md:flex-nowrap'>
            <TextInput label={'Given name'} placeholder={'e.g John Doe'}/>
            <TextInput label={'Surname'} placeholder={'e.g Ike'}/>
          </div>
          <div className='flex gap-4 flex-wrap md:flex-nowrap'>
            <div className='flex-1'>
              <CountriesInput label={'Nationality'} />
            </div>
            <div className='flex-1'>
              <SelectInput label='Gender'>
                <MenuItem>Male</MenuItem>
                <MenuItem>Female</MenuItem>
              </SelectInput>
            </div>
            <div className='flex-1'>
              <CalendarInput1 label={'Date of Birth'} />
            </div>
          </div>
          <div className='flex gap-4 flex-wrap md:flex-nowrap'>
            <div className='flex-1'>
              <TextInput label='Passport or ID number' />
            </div>
            <div className='flex-1'>
              <CalendarInput1 label='Passport or ID Expiration Date' />
            </div>
          </div>

          <h5>Additional details</h5>
          <div className='flex gap-4'>
            <div className='flex-1'>
              <TextInput label='Frequent flyer number' placeholder='Enter here'/>
            </div>
            <div className='flex-1'>
              <SelectInput label='Special assistance' placeholder='Select'>
                <MenuItem></MenuItem>
              </SelectInput>
            </div>
          </div>

          <h5>Remarks</h5>
          <TextInput multiline rows={4} label='' placeholder={'Add remarks to booking'} />
        </div>
      </Collapse>
    </div>
  )
}
