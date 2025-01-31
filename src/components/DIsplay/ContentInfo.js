import React from 'react'
import Icon from '../HOC/Icon'

export default function ContentInfo({children,icon}) {
  return (
    <div className='flex gap-4 p-4 py-2 bg-theme2/20 items-center rounded-md'>
      {icon ? <div>{icon}</div> :
        <div><Icon icon='ic:info' className='w-11 h-11' /></div>
      }
      <div className='text-sm'>
          {children}
      </div>
    </div>
  )
}
