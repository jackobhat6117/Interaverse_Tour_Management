import { Button } from '@mui/material'
import React from 'react'
import EmailInput from '../../components/forms/EmailInput'
import Button1 from '../../components/forms/Button1'


export default function ContactEmails() {
  return (
    <div className='flex flex-col gap-4 !text-primary/60 max-w-[600px]'>
      <div className='flex gap-4'>
        <div className='!btn'>Support</div>
        <Button className='btn-theme-light'>Schedule Changes</Button>
      </div>
      <p>All our communication will be sent by default to your email ukfl@gmail.com</p>
      <p>However, when opening a support ticket, you can choose to follow up with an alternative email address, which can be set-up by admins for your organisation.</p>
      <div className='flex gap-3'>
        <EmailInput label={'Your email'} className='flex-1 w-full' />
        <Button1 className='!w-auto'>Add</Button1>
      </div>
      <div className='flex flex-col gap-3 py-3'>
        <div className='flex justify-between gap-3'>
          teamxyz@gamil.com
          <Button className='!text-red-500 !font-bold'>Remove</Button>
        </div>
        <div className='flex justify-between gap-3'>
          teamxyz@gamil.com
          <Button className='!text-red-500 !font-bold'>Remove</Button>
        </div>
      </div>
    </div>
  )
}