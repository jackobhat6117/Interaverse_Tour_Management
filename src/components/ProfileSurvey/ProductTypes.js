import React from 'react'
import Checkbox from '../forms/Checkbox'


export default function ProductTypes() {
  return (
    <div className='flex flex-col gap-4 items-center'>
      <h4 className='text-center'>What products are you interested in selling?</h4>
      <p className=''>Sharing this information will enhance your experience without any restrictions on feature access.</p>
      <div className='flex flex-wrap gap-4 justify-between self-stretch py-4'>
        <Checkbox>Flights</Checkbox>
        <Checkbox>Stays</Checkbox>
        <Checkbox>Tours</Checkbox>
        <Checkbox>Protection</Checkbox>
      </div>
    </div>
  )
}
