import React from 'react'
import SelectInput from './SelectInput'
import { MenuItem } from '@mui/material'
import CalendarInput1 from './CalendarInput1'

export default function FilterCalendar() {
  return (
    <div className='bg-primary/10 p-2 rounded-md flex-1  flex items-center gap-2'>
      <SelectInput size='small' label={''} defaultValue='Weekly' className='bg-secondary'>
        <MenuItem value='Weekly'>Weekly</MenuItem>
        <MenuItem value='Monthly'>Monthly</MenuItem>
        <MenuItem value='Yearly'>Yearly</MenuItem>
        <MenuItem value='All'>All</MenuItem>
      </SelectInput>
      <CalendarInput1 />
    </div>
  )
}
