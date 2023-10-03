import { Button } from '@mui/material'
import React from 'react'


function Button1(props) {
  const {label,children,loading,...buttonProps} = props;
  return (
    <Button variant='contained' type='button' {...buttonProps} sx={{textTransform: 'none'}} disabled={loading} 
      className={'w-full p-2 sm:!p-3 !px-2 !rounded-lg !font-bold !min-w-[80px] '+props.className}
    >
      {loading ? 'Please Wait...' :
        label || children
      }
    </Button>
  )
}


export default Button1;