import React, { memo, useState } from 'react'
import { MenuItem } from '@mui/material'
import SelectInput from '../../form/SelectInput'
import TextInput from '../../form/TextInput'
import { profileSurveyData } from '../../../data/user/profileSurvey'
import Button1 from '../../form/Button1'
import { useSelector } from 'react-redux'
import mergeRecursive from '../../../features/utils/mergeRecursive'
import { clone } from '../../../features/utils/objClone'


function LegalEntity({updateProfile,back,next}) {
  const {user} = useSelector(state => state.user.userData);
  const userDetails = mergeRecursive(clone(profileSurveyData),user?.detail || {},{createNew: false})
  const [data,setData] = useState({...profileSurveyData,...userDetails});
  const [loading,setLoading] = useState(false);

  async function handleChange() {
    const {registeredBusinessName,typeOfBusiness,legalInfo: {taxIdentification,companyNumber}} = {...data};
    if(updateProfile) {
      setLoading(true);
      const res = await updateProfile({registeredBusinessName,typeOfBusiness,legalInfo: {taxIdentification,companyNumber}})
      setLoading(false);
      if(res)
        next();
    }
  }

  return !user?.detail?.agencyType === 'starterBusiness' ? (
    <div className='flex flex-col gap-4 slide'>
      <div className='flex flex-col gap-2'>
        <h4 className=''>Enter your business registration informaiton</h4>
        <p className=''>As a regulated travel technology company, we would need  your business registration information.</p>
      </div>
      <div className='flex flex-col flex-wrap gap-4 justify-between self-stretch py-4'>
        <div>
          <TextInput key='regName' label={'Registered business name'}
            value={data.registeredBusinessName || ''}
            onChange={(ev) => setData({...data,registeredBusinessName: ev.target.value})}
          />
        </div>
        <SelectInput label='Type of registered business' 
         value={data.typeOfBusiness || ''}
         onChange={(ev) => setData({...data,typeOfBusiness: ev.target.value})}>
          <MenuItem value='Private Limited'>Private limited</MenuItem>
          <MenuItem value='Sole proprietor'>Sole proprietor</MenuItem>
          <MenuItem value='Non-registered'>Non-registered</MenuItem>
        </SelectInput>
        <TextInput key={'tradeName'} label={'Company Number'} placeholder={'e.g RC1234'}
            value={data?.legalInfo?.companyNumber || ''}
            onChange={(ev) => setData({...data,legalInfo:{...data?.legalInfo,companyNumber: ev.target.value}})}          
          />
        <div>
          <TextInput key={'tradeName'} label={'Tax identification number'} placeholder='e.g 0123456789-1234'
            value={data?.legalInfo?.taxIdentification || ''}
            onChange={(ev) => setData({...data,legalInfo:{...data.legalInfo,taxIdentification: ev.target.value}})}          
          />
        </div>
        <div className='flex justify-between gap-4'>
          <Button1 className='!w-auto' onClick={back} variant='text'>Go back</Button1>
          <Button1 className='!w-auto' onClick={handleChange} loading={loading}>Next</Button1>
        </div>
      </div>
    </div>
  ) : (
    <div className='flex flex-col max-w-[500px] slide items-center self-center gap-10 text-center flex-1 justify-center'>
      <h3>This page is for registered business</h3>
      <Button1>Skip</Button1>
    </div>
  )
}

export default memo(LegalEntity)