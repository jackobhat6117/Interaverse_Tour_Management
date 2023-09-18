import React from 'react'
import SelectInput from '../forms/SelectInput'
import { MenuItem } from '@mui/material'


export default function OrganizationSize() {
  return (
    <div className='flex flex-col gap-4 items-center'>
      <h4 className='text-center'>What is the size of your organization?</h4>
      <p className=''>Sharing this information will enhance your experience without any restrictions on feature access.</p>
      <div className='flex flex-wrap gap-4 justify-between self-stretch py-4'>
        <SelectInput>
          <MenuItem>Big</MenuItem>
        </SelectInput>
      </div>
    </div>
  )
}
