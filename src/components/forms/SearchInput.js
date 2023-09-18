import { TextField } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'
import { Search } from '@mui/icons-material'


SearchInput.propTypes = {
  label: PropTypes.string,
  placeHolder: PropTypes.string,
}
export default function SearchInput(props) {
  return (
    <div className='w-full'>
      <TextField className='w-full bg-secondary rounded-md ' size='small' label={<div className='font-bold' >
            {props.label || 'Search'}
        </div>}
        InputProps={{
          endAdornment: <Search />
        }}
        // InputLabelProps={{
        //   shrink: true,
        // }}
        {...props}
      />
    </div>
  )
}
