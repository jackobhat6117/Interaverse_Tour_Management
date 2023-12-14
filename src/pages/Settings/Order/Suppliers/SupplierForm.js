import React, { useEffect, useState } from 'react'
import Icon from '../../../../components/HOC/Icon'
import { TextField } from '@mui/material'


const initObj = {
    name: '',
    xyzKey: '',
    abcKey: '',
}
export default function SupplierForm({name,data:gotData,footer}) {
    const [data,setData] = useState(gotData || initObj)
    let selectedSupplierIcon = 'carbon:scis-transparent-supply'

    useEffect(() => {
        gotData && setData(gotData)
    },[gotData])
  return (
    <div className='flex flex-col gap-6'>
        <div className='flex justify-between gap-4'>
            <h5>{data ? 'Edit your details' : `Add supplier for ${name}`}</h5>
            <div className='flex gap-2'>
                <Icon icon={selectedSupplierIcon} />
                {/* <img src='selectedSupplierIcon' alt='' /> */}
                <select>
                    <option>Amadeus</option>
                </select>
            </div>
        </div>
        <p>
            {data? `You are about to edit a supplier for ${name}.`:
                'You information is private and cannot be accessed by thrid-party competitors'
            }
        </p>
        <TextField label='Name' placeholder='eg. My Amadeus'
            value={data.name}
            onChange={(ev) => setData({...data,name: ev.target.value})}
        />
        <TextField label='xyz Key' placeholder='eg. 549O232990C22'
            value={data.xyzKey}
            onChange={(ev) => setData({...data,xyzKey: ev.target.value})}
        />
        <TextField label='abc Key' placeholder='eg. 897a9878988CC'
            value={data.abcKey}
            onChange={(ev) => setData({...data,abcKey: ev.target.value})}
        />
        {footer && footer(data)}
    </div>
  )
}
