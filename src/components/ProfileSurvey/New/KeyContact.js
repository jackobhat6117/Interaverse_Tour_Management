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
import { useLocation } from 'react-router-dom'
import { useSnackbar } from 'notistack'


function KeyContact({updateProfile,back,next,review,user: defUser}) {
  const {user} = useSelector(state => state.user.userData);
  const userDetails = mergeRecursive(clone(profileSurveyData),user?.detail || {},{createNew: false})
  const [data,setData] = useState({...profileSurveyData,...userDetails});
  const [loading,setLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const qedit = searchParams.get('edit')
  const [edit,setEdit] = useState(false);

  const {enqueueSnackbar} = useSnackbar();

  async function handleSubmit(ev) {
    ev?.preventDefault();

    try {
      const pn = data?.contact?.phoneNumber?.split('-');
      if(pn[1]?.length < 9)
        return enqueueSnackbar('Invalid phone number!',{variant: 'warning'})
    } catch(ex) {}
    
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
    return <ReviewDisplay data={defUser?.detail || user?.detail} review={review} setEdit={setEdit} />


  return (
    <div className='flex flex-col gap-4 slide'>
      {!qedit ? 
        <div className='flex flex-col gap-2 py-4'>
          <h4 className=''>Tell us about your business representative</h4>
          <p className=''>A business representative is either an owner, director or shareholder of your business.</p>
        </div>
      : 
        <h4 className='py-4'>Edit representative details</h4>
      }
      <form onSubmit={handleSubmit} className='flex flex-col flex-wrap gap-4 justify-between self-stretch py-4'>
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
          <EmailInput label='Contact Email' placehodler='hello@gmail.com' required
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
          <Button1 className='!w-auto' type='submit' loading={loading} >{!qedit ? 'Next':'Update'}</Button1>
        </div>
      </form>
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