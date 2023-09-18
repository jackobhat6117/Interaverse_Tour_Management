import { TaskAlt } from '@mui/icons-material';
import { Radio } from '@mui/material';
import React, { useEffect, useState } from 'react'

export default function RadioInput(props) {
  const { children, checked, ...radioProps } = props;
  const [check, setCheck] = useState(checked || false);

  useEffect(() => {
    setCheck(checked)
  },[checked])

  return (
    <label className={`flex items-center gap-2 cursor-pointer rounded-md p-1 px-3 w-full ${check ? ' bg-[#A7D9D1] text-[#016726] ' : ' bg-primary/10 '}`}>
      <Radio
        type="radio"
        {...radioProps}
        checked={check}
        onChange={(ev) => setCheck(ev.target.checked)}
        checkedIcon={<TaskAlt className='text-[#016726]' />}
        size="small"
      />
      {children}
    </label>
  );
}