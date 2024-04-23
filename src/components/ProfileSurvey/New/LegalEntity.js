import React, { memo, useState } from 'react'
import { MenuItem } from '@mui/material'
import SelectInput from '../../form/SelectInput'
import TextInput from '../../form/TextInput'
import { profileSurveyData } from '../../../data/user/profileSurvey'
import Button1 from '../../form/Button1'
import { useSelector } from 'react-redux'
import mergeRecursive from '../../../features/utils/mergeRecursive'
import { clone } from '../../../features/utils/objClone'
import { useLocation } from 'react-router-dom'


function LegalEntity({updateProfile,back,next,review}) {
  const {user} = useSelector(state => state.user.userData);
  const userDetails = mergeRecursive(clone(profileSurveyData),user?.detail || {},{createNew: false})
  const [data,setData] = useState({...profileSurveyData,...userDetails});
  const [loading,setLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const qedit = searchParams.get('edit')

  const [edit,setEdit] = useState(false);

  async function handleSubmit(ev) {
    ev?.preventDefault();

    let {registeredBusinessName,typeOfBusiness,legalInfo: {taxIdentification,companyNumber}} = {...data};
    if(updateProfile) {
      if(user?.detail?.agencyType === 'starterBusiness') {
        registeredBusinessName = '---'
        typeOfBusiness = '---'
        taxIdentification = '---'
        companyNumber = '---'
      }
      setLoading(true);
      const res = await updateProfile({registeredBusinessName,typeOfBusiness,legalInfo: {taxIdentification,companyNumber}})
      setLoading(false);
      if(res)
        next();
    }
  }

  if(review && !edit)
    return <ReviewDisplay data={user?.detail} review={review} setEdit={setEdit} />

  
  return !(user?.detail?.agencyType === 'starterBusiness') ? (
    <div className='flex flex-col gap-4 slide'>
      {!qedit ? 
        <div className='flex flex-col gap-2 py-4'>
          <h5 className=''>Enter your business registration informaiton</h5>
          <p className=''>As a regulated travel technology company, we would need  your business registration information.</p>
        </div>
      :
        <h5 className='py-4'>Edit business registration information</h5>
      }
      <form onSubmit={handleSubmit} className='flex flex-col flex-wrap gap-4 justify-between self-stretch py-4'>
        <div>
          <TextInput key='regName' label={'Registered business name'} required
            value={data.registeredBusinessName || ''}
            onChange={(ev) => setData({...data,registeredBusinessName: ev.target.value})}
          />
        </div>
        <SelectInput label='Type of registered business' required
         value={data.typeOfBusiness || ''}
         onChange={(ev) => setData({...data,typeOfBusiness: ev.target.value})}>
          <MenuItem value='Private Limited'>Private limited</MenuItem>
          <MenuItem value='Sole proprietor'>Sole proprietor</MenuItem>
          <MenuItem value='Non-registered'>Non-registered</MenuItem>
        </SelectInput>
        <TextInput key={'tradeName'} label={'Company Number'} placeholder={'e.g RC1234'} required
            value={data?.legalInfo?.companyNumber || ''}
            onChange={(ev) => setData({...data,legalInfo:{...data?.legalInfo,companyNumber: ev.target.value}})}          
          />
        <div>
          <TextInput key={'tradeName'} label={'Tax identification number'} placeholder='e.g 0123456789-1234' required
            value={data?.legalInfo?.taxIdentification || ''}
            onChange={(ev) => setData({...data,legalInfo:{...data.legalInfo,taxIdentification: ev.target.value}})}          
          />
        </div>
        <div className='flex justify-between gap-4'>
          <Button1 className='!w-auto' onClick={back} variant='text'>Go back</Button1>
          <Button1 className='!w-auto' type='submit' loading={loading}>{!qedit ? 'Next': 'Update'}</Button1>
        </div>
      </form>
    </div>
  ) : (
    <div className='flex flex-col max-w-[500px] slide items-center py-10 self-center gap-10 text-center flex-1 justify-center'>
      <p>As a regulated company, we will need you to complete this step when you have registered your business.</p>
      <Button1 loading={loading} onClick={handleSubmit}>Continue</Button1>
    </div>
  )
}

function ReviewDisplay({data,review}) {
  const Col = ({name,value}) => (
    <div className='flex flex-col gap-2'>
      <p>{name}</p>
      <b>{value}</b>
    </div>
  )
  return (
    <div className='relative flex flex-col gap-6 '>
      <div className='absolute right-0 top-0 px-2'>
        {review ? review : null}
      </div>
      <Col name='Regsitered Business Name' value={data.registeredBusinessName} />
      <Col name='Type of Regsitered business' value={data.typeOfBusiness} />
      <Col name='Company Number' value={data?.legalInfo?.companyNumber} />
      <Col name='Tax Identification No' value={data?.legalInfo?.taxIdentification} />
    </div>
  )
}

export default memo(LegalEntity)