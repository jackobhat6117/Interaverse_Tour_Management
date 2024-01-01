import { TextField } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'


SelectInput.propTypes = {
  label: PropTypes.string,
  placeHolder: PropTypes.string,
}
export default function SelectInput(props) {  

  let Element = props.elem || TextField;
  return (
    <div className='w-full'>
      <Element size='small' label={<div className='font-bold' >
            {props.label || 'Select'}
        </div>}
        // InputLabelProps={{
        //   shrink: true,
        // }}
        {...props}
        className={'w-full !min-w-[100px] rounded-md '+props.className}
        select
      >
        {props.children}
      </Element>
    </div>
  )
}
