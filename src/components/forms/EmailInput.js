import { TextField } from '@mui/material'
import React from 'react'

export default function EmailInput(props) {
  return (
    <div>
      <TextField className='w-full ' label={<div className='font-bold inline' >
            Your email Address
        </div>}
        placeholder={'e.g. xyzabc@gmail.com'}
        InputLabelProps={{
          shrink: true,
        }}
        {...props}
      />
    </div>
  )
}
