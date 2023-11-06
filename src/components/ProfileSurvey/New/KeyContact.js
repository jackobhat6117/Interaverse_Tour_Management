import React, { memo, useState } from 'react'
import { MenuItem } from '@mui/material'
import SelectInput from '../../form/SelectInput'
import TextInput from '../../form/TextInput'
import { profileSurveyData } from '../../../data/user/profileSurvey'
import Button1 from '../../form/Button1'
import EmailInput from '../../form/EmailInput'
import PhoneNumberInput from '../../form/PhoneNumberInput'


function KeyContact({data,returnData,loading,back,next}) {
  const [obj,setObj] = useState({...profileSurveyData,...data})
  function handleChange(obj) {
    setObj(obj);
    if(returnData)
      returnData(obj)
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <h4 className=''>Tell us about your business representative</h4>
        <p className=''>A business representative is either an owner, director or shareholder of your business.</p>
      </div>
      <div className='flex flex-col flex-wrap gap-4 justify-between self-stretch py-4'>
        <div className='flex gap-4 flex-wrap md:flex-nowrap'>
          <TextInput key='regName' label={'First Name'} placeholder={'e.g Chiemena'}
            value={obj.registeredBusinessName || ''}
            onChange={(ev) => handleChange({...obj,registeredBusinessName: ev.target.value})}
          />
          <TextInput key='regName' label={'Last Name'} placeholder={'e.g Okafor'}
            value={obj.registeredBusinessName || ''}
            onChange={(ev) => handleChange({...obj,registeredBusinessName: ev.target.value})}
          />
        </div>
        <SelectInput label='Position / job title' 
         value={obj.typeOfBusiness || ''}
         onChange={(ev) => handleChange({...obj,typeOfBusiness: ev.target.value})}>
          <MenuItem value='Private Limited'>Owner</MenuItem>
          <MenuItem value='Director'>Director</MenuItem>
          <MenuItem value='Share holder'>Share Holder</MenuItem>
        </SelectInput>
        <div>
          <EmailInput label='Business Email' placehodler='hello@gmail.com' />
        </div>
        <div>
          <PhoneNumberInput label={'Business Phone number'} placeholder='e.g 08170000000' />
        </div>
        <div className='flex justify-between gap-4'>
          <Button1 className='!w-auto' onClick={back} variant='text'>Go back</Button1>
          <Button1 className='!w-auto' onClick={next} loading={loading} >Finish</Button1>
        </div>
      </div>
    </div>
  )
}

export default memo(KeyContact)