import React from 'react'
import Button1 from '../../../../../../components/form/Button1'
import ContactView from './ViewChange/Contact'

export default function ChangeContactConfirm({callback}) {
  return (
    <div className='flex flex-col gap-10'>
        <ContactView />

        <div className='flex gap-4'>
            <button className='px-6'>Cancel</button>
            <Button1 onClick={callback}>Confirm</Button1>
        </div>
    </div>
  )
}
