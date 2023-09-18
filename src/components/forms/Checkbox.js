import React from 'react'

export default function Checkbox(props) {
  const {children,...checkboxProps} = props;
  return (
    <label className='flex gap-2 cursor-pointer bg-primary/5 rounded-md p-1 px-3'>
      <input type='checkbox' {...checkboxProps} />
      {children}
    </label>
  )
}
