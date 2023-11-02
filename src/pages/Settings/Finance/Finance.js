import React from 'react'
import { Link } from 'react-router-dom'
import TextInput from '../../../components/form/TextInput'
import { FormControlLabel, MenuItem } from '@mui/material'
import Button1 from '../../../components/form/Button1'
import IOSSwitch from '../../../components/form/IOSSwitch'

export default function Finance() {
  const data = [1]
  return (
    <div className={`flex flex-col gap-4 ${!data.length ? 'bg-emptypage' : ''} h-full flex-1`}>
      <div className='flex gap-2 flex-wrap'>
        <Link to='?page=payout' className='btn'>Payout</Link>
        <Link to='?page=payout' className='btn-theme-light'>Payout Methods</Link>
      </div>
      <hr />
      {data.length ? (
        <div className='flex flex-col gap-4 content-max-w'>
          <h4>Bank Information</h4>
          <TextInput select label={'Select bank'} >
            <MenuItem>Select bank</MenuItem>
          </TextInput>
          <TextInput label={'Enter account number'} placeholder={'e.g 0047159973'}
            tooltip={'Touchcore Technology Limited'}
          />
          <span className='self-start'>
            <Button1>Save bank details</Button1>
          </span>
          <hr />
          <div>
            <h4>Payout settings</h4>
            <p>Set how you want to recieve your payouts</p>
          </div>
          <div className='self-start flex flex-col gap-4'>
            <div className='flex justify-between items-start gap-6'>
              <p>Automatically process payout to my account</p>
              <span>
              <FormControlLabel
                control={<IOSSwitch defaultChecked />}
                />
                </span>
            </div>
            <div className='flex justify-between items-start gap-6'>
              <p>Set payout time</p>
              <span>
                <TextInput select size='small' label={''}>
                  <MenuItem>Daily</MenuItem>
                  <MenuItem>Weekly</MenuItem>
                  <MenuItem>Monthly</MenuItem>
                </TextInput>
              </span>
            </div>
          </div>
        </div>
      ):
      <div className='flex flex-col gap-6'>
        <h4>Payouts</h4>
        You don't have any pending payout.
        <hr />
        <h1>
          $0
        </h1>
        <hr />
        <h4>Payout history</h4>
        You don't have any past payouts.
      </div>
      }
    </div>
  )
}
