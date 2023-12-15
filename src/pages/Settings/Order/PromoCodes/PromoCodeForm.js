import React from 'react'
import TextInput from '../../../../components/form/TextInput'
import { MenuItem } from '@mui/material'
import Button1 from '../../../../components/form/Button1'

export default function PromoCodeForm({data,cancel}) {
  return (
    <div className='flex flex-col gap-4'>
        <h5>
            {data?'Update Promo Code':'Create New Promo Code'}
        </h5>
        <TextInput label={'Code name'} placeholder={'eg. Flight promo code'} />
        <TextInput label={'Code'} placeholder={'eg. 0421223'} />
        <TextInput select label='Deal'>
            <MenuItem></MenuItem>
        </TextInput>
        <div className='flex '>
            {cancel ? 
                <button className='btn-theme-light' onClick={cancel}>Cancel</button>
            :null}
            <Button1>Save Code</Button1>
        </div>
    </div>
  )
}
