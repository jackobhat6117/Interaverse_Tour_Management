import { Skeleton } from '@mui/material'
import React from 'react'

export default function SkullLoad(props) {
  const {label,value,render,...restProps} = props;
  if(value) {
    if(render)
      return render(value);
    return value
  }
  
  return (
    <div className='inline-block'>
      <Skeleton width={100+((label?.length || 1)*4)} height={30} {...restProps} />
    </div>
  )
}
