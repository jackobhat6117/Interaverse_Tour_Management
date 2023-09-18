import React, { useState } from 'react'
import RadioInput from '../forms/RadioInput'
import { RadioGroup } from '@mui/material'


export default function MilesGoal() {
  const [goal,setGoal] = useState('');
  return (
    <div className='flex flex-col gap-4 items-center'>
      <h4 className='text-center'>What's your goal with Miles?</h4>
      <p className=''>Sharing this information will enhance your experience without any restrictions on feature access.</p>
      <RadioGroup name='milesGoal' value={goal} onChange={(ev) => setGoal(ev.target.value)} className='flex flex-col gap-4 justify-between self-stretch py-4'>
        <RadioInput checked={goal === '1'} value='1'>Creating and managing flight bookings with a dashboard</RadioInput>
        <RadioInput checked={goal === '2'} value='2'>Building a travel product with use of the API</RadioInput>
        <RadioInput checked={goal === '3'} value='3'>Investigating API providers to find the one for me</RadioInput>
        <RadioInput checked={goal === '4'} value='4'>Managing business and operations</RadioInput>
        <RadioInput checked={goal === '5'} value='5'>Others (please specify)</RadioInput>
      </RadioGroup>
    </div>
  )
}
