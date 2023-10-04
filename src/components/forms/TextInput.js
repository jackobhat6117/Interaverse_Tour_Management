import { TextField } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'


TextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
}
export default function TextInput(props) {
  return (
    <div className='w-full'>
      <TextField className='w-full !min-w-[100px] ' label={<div className='font-bold' >
          {props.label}
        </div>}
        InputLabelProps={{
          shrink: props.noShrink ? false : true,
        }}
        {...props}
      />
      {props.tooltip ? 
        <div className='tooltip'>{props.tooltip}</div>
      :null}
    </div>
  )
}
