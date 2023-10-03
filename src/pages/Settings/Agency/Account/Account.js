import React from 'react'
import TextInput from '../../../../components/forms/TextInput'
import EmailInput from '../../../../components/forms/EmailInput'
import Button1 from '../../../../components/forms/Button1'
import PasswordInput from '../../../../components/forms/PasswordInput'
import { Link } from 'react-router-dom'

export default function AccountSettings() {
  return (
    <div className='content-max-w flex flex-col gap-4'>
      <div className='flex flex-col gap-4'>
        <h4>Information</h4>
        <TextInput label={'Full name'} placeholder={'Okafor Chiemena'} />
        <EmailInput tooltip={
          <div>
            To complete your registration, please verify your email with the link we sent to <b>abcdefxyz@gmail.com.</b> 
            Didn't receive an email? <b>Resend confirmation link</b>
          </div>
        } />
        <div className='flex justify-end'>
          <Button1 className='!w-auto'>Save Changes</Button1>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <h4>Password</h4>
        <PasswordInput label='Old Password' />
        <div className='flex gap-4'>
          <PasswordInput className='flex-1' label='New Password' />
          <PasswordInput className='flex-1' label='Confirm Password' />
        </div>
        <div className='flex justify-end'>
          <Button1 className='!w-auto'>Save Password</Button1>
        </div>
      </div>
      <div className='bg-red-300 text-gray-600 flex flex-col gap-3 p-4 rounded-lg'>
        <h5>Delete Account</h5>
        <p className='text-red-500 font-bold'>
          Once you delete your account, you will no longer have access to Miles Apps and API, all pending organization invitations will be revoked as well as organization memberships.
          If you'd like to delete your account, please contact <Link className='text-red-900' to="#">customer support.</Link>
        </p>
      </div>
    </div>
  )
}
