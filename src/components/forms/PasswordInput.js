import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material'
import React, { useState } from 'react'


export default function PasswordInput(props) {
  const {label} = props;
  const [showPassword, setShowPassword] = useState(false);


  return (
    <div>
      <TextField className='w-full ' label={<div className='font-bold inline' >
            {label || 'Your password'}
        </div>}
        placeholder={'e.g. PassW07d!!'}
        InputLabelProps={{
          shrink: true,
        }}
        {...props}
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
