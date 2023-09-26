import { TextField } from '@mui/material'
import React, { useState } from 'react'

export default function EmailInput(props) {
  const [error,setError] = useState(false);

  function handleChange(ev) {
    if(!isValidEmail(ev.target.value)) {
      setError(true);
    } else setError(false);

    if(props?.onChange)
      props.onChange(ev)
  }
  const isValidEmail = (value) => {
    // Regular expression pattern for email validation
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailPattern.test(value);
  };
  return (
    <div className='w-full'>
      <TextField type='email' className='w-full ' 
        error={error}
        // pattern
        // helperText={'Invalid Email Pattern'}
        label={<div className='font-bold inline' >
            Your email Address
        </div>}
        placeholder={'e.g. xyzabc@gmail.com'}
        InputLabelProps={{
          shrink: true,
        }}
        {...props}
        onChange={handleChange}
      />
    </div>
  )
}
