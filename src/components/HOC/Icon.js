import { Icon as IconfiyIcon } from '@iconify/react'
import React from 'react'

export default function Icon(props) {
  const {className,...restProps} = props;
  return (
    <IconfiyIcon {...restProps} className={`flex w-6 h-6 text-lg ${className}`} />
  )
}
