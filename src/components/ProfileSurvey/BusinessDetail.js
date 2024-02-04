import React, { memo, useState } from 'react'
import { MenuItem } from '@mui/material'
import SelectInput from '../form/SelectInput'
import TextInput from '../form/TextInput'
import { profileSurveyData } from '../../data/user/profileSurvey'


function BusinessDetail({data,returnData}) {
  const [obj,setObj] = useState({...profileSurveyData,...data})
  function handleChange(obj) {
    setObj(obj);
    if(returnData)
      returnData(obj)
  }

  return (
    <div className='flex flex-col gap-4 items-center'>
      <h4 className='text-center'>Tell us about your business</h4>
      <p className=''>Sharing this information will enhance your experience without any restrictions on feature access.</p>
      <div className='flex flex-col flex-wrap gap-4 justify-between self-stretch py-4'>
        <SelectInput label='Type of registered business' 
         value={obj.typeOfBusiness || ''}
         onChange={(ev) => handleChange({...obj,typeOfBusiness: ev.target.value})}>
          <MenuItem value='Private Limited'>Private limited</MenuItem>
          <MenuItem value='Sole proprietor'>Sole proprietor</MenuItem>
          <MenuItem value='Non-registered'>Non-registered</MenuItem>
        </SelectInput>
        <div>
          <TextInput key='regName' label={'Registered business name'}
            value={obj.registeredBusinessName || ''}
            onChange={(ev) => handleChange({...obj,registeredBusinessName: ev.target.value})}
          />
          <div className='tooltip'>The name you provide must exactly match the name associated with your tax ID</div>
        </div>
        <div>
          <TextInput key={'tradeName'} label={'Trading name'} 
            value={obj.tradingName || ''}
            onChange={(ev) => handleChange({...obj,tradingName: ev.target.value})}          
          />
          <div className='tooltip'>If different from your registered name</div>
        </div>
      </div>
    </div>
  )
}

export default memo(BusinessDetail)