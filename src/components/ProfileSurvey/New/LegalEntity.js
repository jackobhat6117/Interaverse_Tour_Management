import React, { memo, useState } from 'react'
import { MenuItem } from '@mui/material'
import SelectInput from '../../form/SelectInput'
import TextInput from '../../form/TextInput'
import { profileSurveyData } from '../../../data/user/profileSurvey'
import Button1 from '../../form/Button1'


function LegalEntity({data,returnData,back,next}) {
  const [obj,setObj] = useState({...profileSurveyData,...data})
  function handleChange(obj) {
    setObj(obj);
    if(returnData)
      returnData(obj)
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <h4 className=''>Enter your business registration informaiton</h4>
        <p className=''>As a regulated travel technology company, we would need  your business registration information.</p>
      </div>
      <div className='flex flex-col flex-wrap gap-4 justify-between self-stretch py-4'>
        <div>
          <TextInput key='regName' label={'Registered business name'}
            value={obj.registeredBusinessName || ''}
            onChange={(ev) => handleChange({...obj,registeredBusinessName: ev.target.value})}
          />
        </div>
        <SelectInput label='Type of registered business' 
         value={obj.typeOfBusiness || ''}
         onChange={(ev) => handleChange({...obj,typeOfBusiness: ev.target.value})}>
          <MenuItem value='Private Limited'>Private limited</MenuItem>
          <MenuItem value='Sole proprietor'>Sole proprietor</MenuItem>
          <MenuItem value='Non-registered'>Non-registered</MenuItem>
        </SelectInput>
        <TextInput key={'tradeName'} label={'Company Number'} placeholder={'e.g RC1234'}
            value={obj.tradingName || ''}
            onChange={(ev) => handleChange({...obj,tradingName: ev.target.value})}          
          />
        <div>
          <TextInput key={'tradeName'} label={'Tax identification number'} placeholder='e.g 0123456789-1234'
            value={obj.tradingName || ''}
            onChange={(ev) => handleChange({...obj,tradingName: ev.target.value})}          
          />
        </div>
        <div className='flex justify-between gap-4'>
          <Button1 className='!w-auto' onClick={back} variant='text'>Go back</Button1>
          <Button1 className='!w-auto' onClick={next}>Next</Button1>
        </div>
      </div>
    </div>
  )
}

export default memo(LegalEntity)