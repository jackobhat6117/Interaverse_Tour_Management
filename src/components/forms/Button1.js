import { Button } from '@mui/material'
import React from 'react'


function Button1(props) {
  const {label,loading} = props;
  return (
    <Button {...props} disabled={loading} variant='contained' className='w-full !p-2 !rounded-lg !font-bold'>
      {loading ? 'Please Wait...' :
        label
      }
    </Button>
  )
}


export default Button1;