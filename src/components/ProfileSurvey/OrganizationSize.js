import React, { useState } from 'react'
import SelectInput from '../forms/SelectInput'
import { MenuItem } from '@mui/material'


export default function OrganizationSize({data,returnData}) {
  const [selected,setSelected] = useState(data?.sizeOfOrganization || '')

  function handleChange(val) {
    setSelected(val);
    if(returnData)
      returnData({...data,sizeOfOrganization: val});
  }
  return (
    <div className='flex flex-col gap-4 items-center'>
      <h4 className='text-center'>What is the size of your organization?</h4>
      <p className=''>Sharing this information will enhance your experience without any restrictions on feature access.</p>
      <div className='flex flex-wrap gap-4 justify-between self-stretch py-4'>
        <SelectInput onChange={(ev) => handleChange(ev.target.value)} value={selected}>
          <MenuItem value='Small'>Small</MenuItem>
          <MenuItem value='Medium'>Medium</MenuItem>
          <MenuItem value='Large'>Large</MenuItem>
        </SelectInput>
      </div>
    </div>
  )
}
