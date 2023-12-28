import React from 'react'
import Icon from '../HOC/Icon'

export default function ContentInfo({children}) {
  return (
    <div className='flex gap-4 p-4 py-2 bg-theme2/20 items-center rounded-md'>
        <Icon icon='ic:info' className='w-11 h-11' />
        <div className='text-sm'>
            {children}
        </div>
    </div>
  )
}
