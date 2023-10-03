import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import TextInput from './TextInput';


export default function PasswordInput(props) {
  const {label,className,...restProps} = props;
  const [showPassword, setShowPassword] = useState(false);


  return (
    <div className='w-full'>
      <TextInput className={'w-full '+className} label={<div className='font-bold inline' >
            {label || 'Your password'}
        </div>}
        placeholder={'e.g. PassW07d!!'}
        InputLabelProps={{
          shrink: true,
        }}
        {...restProps}
        type={showPassword ? 'test' : 'password'}
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
    </div>
  )
}
