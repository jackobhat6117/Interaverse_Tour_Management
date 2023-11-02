import { ArrowDropDownOutlined } from '@mui/icons-material';
import React, { useState } from 'react'

export default function Collapse({show,children,label,dropdown='def',returnData}) {
  const [childShow,setchildShow] = useState(show);

  function handleCollapse(ev) {    
    setchildShow(!childShow)
    if(returnData)
      returnData(!childShow)
  }
  return (
    <div >
      <div onClick={handleCollapse} className='flex justify-between cursor-pointer'>
        {label}
        {dropdown === 'def' && (
          !childShow ? <ArrowDropDownOutlined /> : <ArrowDropDownOutlined className='rotate-180' />
        )}
      </div>
      <div className={'flex flex-col gap-4 p-2 py-4 overflow-hidden '+(childShow ? '' : 'hidden')}>
        {children}
      </div>
    </div>
  )
}
