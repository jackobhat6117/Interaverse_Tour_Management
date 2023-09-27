import { Button, MenuItem } from '@mui/material'
import React from 'react'
import EmailInput from '../../components/forms/EmailInput'
import Button1 from '../../components/forms/Button1'
import SelectInput from '../../components/forms/SelectInput'
import CalendarInput1 from '../../components/forms/CalendarInput1'


export default function BalanceSetting() {
  return (
    <div className='flex flex-col gap-4 !text-primary/60 '>
      <div className='flex justify-between items-center gap-4 flex-wrap'>
        <div>
        <Button1 className='btn-theme-light !shadow-none !lowercase !text-gray-500'>Set-up low balance threshold</Button1>
        </div>
        <div className='bg-primary/10 p-2 rounded-md  flex items-center gap-2'>
          <SelectInput size='small' label={''} defaultValue='Weekly' className='bg-secondary'>
            <MenuItem value='Weekly'>Weekly</MenuItem>
            <MenuItem value='Monthly'>Monthly</MenuItem>
            <MenuItem value='Yearly'>Yearly</MenuItem>
            <MenuItem value='All'>All</MenuItem>
          </SelectInput>
          <CalendarInput1 />
        </div>
      </div>
      <hr />

    </div>
  )
}