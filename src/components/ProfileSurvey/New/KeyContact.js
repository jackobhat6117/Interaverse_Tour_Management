import React, { memo, useState } from 'react'
import { MenuItem } from '@mui/material'
import SelectInput from '../../form/SelectInput'
import TextInput from '../../form/TextInput'
import { profileSurveyData } from '../../../data/user/profileSurvey'
import Button1 from '../../form/Button1'
import EmailInput from '../../form/EmailInput'
import PhoneNumberInput from '../../form/PhoneNumberInput'
import { useSelector } from 'react-redux'
import mergeRecursive from '../../../features/utils/mergeRecursive'
import { clone } from '../../../features/utils/objClone'


function KeyContact({updateProfile,back,next,review}) {
  const {user} = useSelector(state => state.user.userData);
  const userDetails = mergeRecursive(clone(profileSurveyData),user?.detail || {},{createNew: false})
  const [data,setData] = useState({...profileSurveyData,...userDetails});
  const [loading,setLoading] = useState(false);
  const [edit,setEdit] = useState(false);

  async function handleChange() {
    if(updateProfile) {
      const {contact} = data;
      setLoading(true);
      const res = await updateProfile({contact})
      setLoading(false);
      if(res)
        next();
    }
  }

  if(review && !edit)
    return <ReviewDisplay data={user?.detail} review={review} setEdit={setEdit} />


  return (
    <div className='flex flex-col gap-4 slide'>
      <div className='flex flex-col gap-2'>
        <h4 className=''>Tell us about your business representative</h4>
        <p className=''>A business representative is either an owner, director or shareholder of your business.</p>
      </div>
      <div className='flex flex-col flex-wrap gap-4 justify-between self-stretch py-4'>
        <div className='flex gap-4 flex-nowrap'>
          <TextInput key='regName' label={'First Name'} placeholder={'e.g Chiemena'}
            value={data?.contact?.firstName || ''}
            onChange={(ev) => setData({...data,contact:{...data.contact,firstName: ev.target.value}})}
          />
          <TextInput key='regName' label={'Last Name'} placeholder={'e.g Okafor'}
            value={data?.contact?.lastName || ''}
            onChange={(ev) => setData({...data,contact:{...data.contact,lastName: ev.target.value}})}
          />
        </div>
        <SelectInput label='Position / job title' 
         value={data?.contact?.position || ''}
         onChange={(ev) => setData({...data,contact:{...data.contact,position: ev.target.value}})}>
          <MenuItem value='Private Limited'>Owner</MenuItem>
          <MenuItem value='Director'>Director</MenuItem>
          <MenuItem value='Share holder'>Share Holder</MenuItem>
        </SelectInput>
        <div>
          <EmailInput label='Contact Email' placehodler='hello@gmail.com' 
            value={data?.contact?.email || ''}
            onChange={(ev) => setData({...data,contact:{...data.contact,email: ev.target.value}})}
          />
        </div>
        <div>
          <PhoneNumberInput label={'Contact Phone number'} placeholder='e.g 08170000000'
            value={data?.contact?.phoneNumber || ''}
            onChange={(value) => setData({...data,contact:{...data.contact,phoneNumber: value}})}
           />
        </div>
        <div className='flex justify-between gap-4'>
          <Button1 className='!w-auto' onClick={back} variant='text'>Go back</Button1>
          <Button1 className='!w-auto' onClick={handleChange} loading={loading} >Next</Button1>
        </div>
      </div>
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
      <Col name='First name' value={data?.contact?.firstName} />
      <Col name='Last name' value={data?.contact?.lastName} />
      <Col name='Position / Job title' value={data?.contact?.position} />
      <Col name='Email' value={data?.contact?.email} />
      <Col name='Phone number' value={data?.contact?.phoneNumber} />
    </div>
  )
}


export default memo(KeyContact)