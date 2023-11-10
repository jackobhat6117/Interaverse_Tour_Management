import React from 'react'

export default function BlogDisplay({obj}) {
  return (
    <div className='card p-4 rounded-md border shadow flex flex-col gap-4'>
      <div className='bg-seondary rounded-md w-[300px] h-[300px]'>

      </div>
      <span>{obj.time} mins read</span>
      <h5>{obj.title}</h5>
      <p>{obj.description}</p>
      <div className='flex gap-4 items-center'>
        <div className='w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center'></div>
        {obj?.user?.name}
        <div className='w-3 h-3 rounded-full bg-primary/5'></div>
        {obj.date}
      </div>
    </div>
  )
}
