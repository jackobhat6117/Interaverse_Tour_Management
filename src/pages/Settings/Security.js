import React from 'react'
import SelectInput from '../../components/forms/SelectInput'
import { MenuItem } from '@mui/material'


export default function SecuritySettings() {
  return (
    <div className='flex flex-col gap-4 !text-primary/60 max-w-[600px]'>
      <h4>Logout User</h4>
      <p>Set users to be automatically logged out after a given time period.</p>
      <div className='flex gap-4 justify-between  max-w-[450px]'>
        <b className=' py-2 '>Automatically log user out</b>
        <div>
          <SelectInput className='w-auto' label=''>
          <MenuItem>After 30 minutes</MenuItem>
          <MenuItem>After 60 minutes</MenuItem>
          <MenuItem>After 90 minutes</MenuItem>
          <MenuItem>After 120 minutes</MenuItem>
        </SelectInput>
        </div>
      </div>
      <h4>Password Expiry</h4>
      <p>Make users change their password after a given time period.</p>
      <div className='flex gap-4 justify-between  max-w-[450px]'>
        <b className=' py-2 '>Require users to change their password</b>
        <div>
          <SelectInput className='w-auto' label=''>
          <MenuItem>Never</MenuItem>
          <MenuItem>Every 14 days</MenuItem>
          <MenuItem>Every 30 days</MenuItem>
          <MenuItem>Every 60 days</MenuItem>
        </SelectInput>
        </div>
      </div>
    </div>
  )
}