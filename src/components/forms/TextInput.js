import { TextField } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'


TextInput.propTypes = {
  label: PropTypes.string,
  placeHolder: PropTypes.string,
}
export default function TextInput(props) {
  return (
    <div className='w-full'>
      <TextField className='w-full ' label={<div className='font-bold' >
            {props.label}
        </div>}
        InputLabelProps={{
          shrink: true,
        }}
        {...props}
      />
    </div>
  )
}
