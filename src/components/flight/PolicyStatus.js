import React from 'react'
import Icon from '../HOC/Icon'

export default function PolicyStatus({title,text,value}) {
  return (
    <div className='bg-theme2/10 p-6 flex flex-col gap-4'>
        <h5>{title}</h5>
        <div className='flex gap-2'>
            {value ? 
            <Icon icon='ic:round-check-circle' className='text-green-500' />
            :
            <Icon icon='ic:cancel' className='text-red-500' />
            }

            <small>{text}</small>
        </div>
    </div>
  )
}
