import React, { useState } from 'react'
import ContentInfo from '../../../../../../components/DIsplay/ContentInfo'
import SelectInput from '../../../../../../components/form/SelectInput'
import Button1 from '../../../../../../components/form/Button1';
import { MenuItem } from '@mui/material';
import RadioGroup from '../../../../../../components/form/RadioGroup';


export default function ChangeSplitPNR({callback}) {
  const data = {
    passengers: [
      {firstName: 'John',lastName: 'Doe',id: 1},
      {firstName: 'John',lastName: 'Doe',id: 2},
    ]
  }
  
  return (
    <div className='flex flex-col gap-4'>
      <h5>Split PNR</h5>
      <ContentInfo>
        Select the Passenger Name Record you want to split from this booking.
      </ContentInfo>
      <SelectInput select label='Select passenger'>
        {data?.passengers?.map((obj,i) => (
            <MenuItem value={obj?.id}>{obj?.firstName} {obj?.lastName}</MenuItem>
        ))}
      </SelectInput>

      <RadioGroup className='flex flex-col gap-4' options={data?.passengers?.map(obj => ({...obj,value: obj.id}))} render={(obj) => (
        <div>
          <p>{obj.firstName} {obj.lastName}</p>
          <div>
            Economy Class
          </div>
        </div>
      )} />

      <div className='flex gap-4'>
        <button className='px-6'>Cancel</button>
        <Button1 onClick={() => callback && callback()}>Confirm</Button1>
      </div>

    </div>
  )
}
