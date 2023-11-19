import { Button } from '@mui/material'
import React from 'react'


function Button1(props) {
  const {label,children,loading,disabled,...buttonProps} = props;
  return (
    <Button variant='contained' type='button' {...buttonProps} sx={{textTransform: 'none'}} disabled={disabled || loading} 
      className={'w-full !shadow-none !font-bold !rounded-lg !min-w-[80px] !px-2 !py-[7px] '+props.className+' '+(props.size === 'small' ? ' !px-3 !rounded-sm !py-0 sm:!py-0 ':'')}
    >
      {loading ? 'Please Wait...' :
        label || children
      }
    </Button>
  )
}


export default Button1;