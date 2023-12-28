import React from 'react'
import EmailInput from '../../../../../../components/form/EmailInput'
import PhoneNumberInput from '../../../../../../components/form/PhoneNumberInput'
import Button1 from '../../../../../../components/form/Button1'

export default function ChangeContact({callback}) {
  return (
    <div className='flex flex-col gap-6'>
        <h5>Contact Person Details</h5>
        <EmailInput label='Email Address' />
        <PhoneNumberInput label='Phone Number' />

        <div className='flex gap-4'>
            <button className='px-6'>Cancel</button>
            <Button1 onClick={callback}>Confirm</Button1>
        </div>
    </div>
  )
}
