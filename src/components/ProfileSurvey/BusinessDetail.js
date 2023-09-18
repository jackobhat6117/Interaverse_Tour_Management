import React from 'react'
import { MenuItem } from '@mui/material'
import SelectInput from '../forms/SelectInput'
import TextInput from '../forms/TextInput'


export default function BusinessDetail() {
  return (
    <div className='flex flex-col gap-4 items-center'>
      <h4 className='text-center'>Tell us about your business</h4>
      <p className=''>Sharing this information will enhance your experience without any restrictions on feature access.</p>
      <div className='flex flex-col flex-wrap gap-4 justify-between self-stretch py-4'>
        <SelectInput label='Type of registered business'>
          <MenuItem>Corporation</MenuItem>
        </SelectInput>
        <div>
          <TextInput label={'Registered business name'} />
          <div className='tooltip'>The name you provide must exactly match the name associated with your tax ID</div>
        </div>
        <div>
          <TextInput label={'Trading name'} />
          <div className='tooltip'>If different from your registered name</div>
        </div>
      </div>
    </div>
  )
}
