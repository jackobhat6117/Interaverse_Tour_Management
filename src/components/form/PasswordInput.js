import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TextInput from './TextInput';

const validationPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{8,64}$/;

export default function PasswordInput(props) {
  const {label,className,noValidation,value:defValue,onChange,show,...restProps} = props;
  const [showPassword, setShowPassword] = useState(show || false);
  const [error,setError] = useState('');

  const [value,setValue] = useState(defValue || '');

  useEffect(() => {
    setValue(defValue)
  },[defValue])
  function handleChange(ev) {
    let val = ev.target.value;
    if(!noValidation && val !== '' && !validationPattern.test(val))
      setError('Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be 8 characters or longer')
    else setError('')

    setValue(val)
    onChange && onChange(ev)
  }

  return (
    <div className='w-full relative'>
      <TextInput className={'w-full '+className} 
        label={
          <div className='font-bold inline' >
            {label || 'Your password'}
          </div>
        }
        value={value}
        onChange={handleChange}
        placeholder={'e.g. !@Password1122'}
        InputLabelProps={{
          shrink: true,
        }}
        {...restProps}
        type={showPassword ? 'text' : 'password'}
        error={error}
        InputProps={{
          endAdornment:(
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(show => !show)}
              // onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          )
        }}
      />
      {error && (
        <div className='absolute z-10 top-full border my-1 border-red-500 p-4 bg-white text-red-500 text-xs left-0'>
          {error}
        </div>
      )}
    </div>
  )
}
