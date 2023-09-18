import { TextField } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'


SelectInput.propTypes = {
  label: PropTypes.string,
  placeHolder: PropTypes.string,
}
export default function SelectInput(props) {
  return (
    <div className='w-full'>
      <TextField className='w-full test' label={<div className='font-bold' >
            {props.label || 'Select'}
        </div>}
        // InputLabelProps={{
        //   shrink: true,
        // }}
        {...props}
        select
      >
        {props.children}
      </TextField>
    </div>
  )
}
