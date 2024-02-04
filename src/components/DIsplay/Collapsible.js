import React, { useEffect, useState } from 'react'
import Icon from '../HOC/Icon';

export default function Collapsible({value,header,children,callback}) {
  const [open,setOpen] = useState(value || false);
  useEffect(() => {
    setOpen(value)
  },[value])

  function onChange() {
    setOpen(!open)
    callback && callback(!open)
  }
  return (
    <div className='w-full'>
      <div className='flex justify-between w-full items-center gap-4' onClick={onChange}>
        {header}
        <div className=''>
          <Icon icon='mingcute:down-fill' className={`text-theme1 bg-primary/10 rounded-full transition-all h-[25px] w-[25px] p-1 ${open?'rotate-180':''}`} />
        </div>
      </div>
      <div className={`overflow-hidden transition-all duration-700 ease-in-out ${open?'max-h-[500px]':'max-h-0'}`}>
        {children}
      </div>
    </div>
  )
}
