import React from 'react'

export default function Checkbox(props) {
  const {children,labelClassName,...checkboxProps} = props;
  return (
    <label className={'flex gap-2 cursor-pointer bg-primary/5 rounded-md relative px-1 items-center '+labelClassName}>
      <input type='checkbox' {...checkboxProps} className='w-4 min-h-4 !h-full p-1 px-3' />
      {children}
    </label>
  )
}
