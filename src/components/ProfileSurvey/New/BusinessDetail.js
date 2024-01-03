import React, { memo, useState } from 'react'
import TextInput from '../../form/TextInput'
import { profileSurveyData } from '../../../data/user/profileSurvey'
import RadioGroup from '../../form/RadioGroup'
import Button1 from '../../form/Button1'
import PhoneNumberInput from '../../form/PhoneNumberInput'
import EmailInput from '../../form/EmailInput'
import { useSelector } from 'react-redux'
import mergeRecursive from '../../../features/utils/mergeRecursive'
import { clone } from '../../../features/utils/objClone'
import MapAutoComplete from '../../form/MapAutoComplete'
import { useLocation } from 'react-router-dom'


const steps = [
  <BusinessType />,
  <DetailInfo />
]
const CurComp = (props) => {
  return React.cloneElement(props.component || <></>,props)
}

function BusinessDetail({updateProfile,back,next,review}) {
  // const [obj,setObj] = useState({...profileSurveyData,...data})
  const {user} = useSelector(state => state.user.userData);
  const [step,setStep] = useState(user?.detail?.agencyType ? 1 : 0);
  const [edit,setEdit] = useState(false);

  const stepNext = () => {
    if(step < steps.length-1 )
      setStep(step => step+1)
    else 
      next && next()
      // sendProfile(data);
  }

  const stepBack = (edit) => {
    if(edit)
      back();
    else
      setStep(step => step > 0 ? step-1 : 0)
  }

  // function skip() {
    // setOpen(false);
    // sessionStorage.setItem('profileSurvey','skip')
  // }

  return !review || (review && edit) ? (
    <div className='flex flex-col gap-4 slide'>
      <CurComp key={'editor'} component={steps[step]} next={stepNext} back={stepBack} updateProfile={updateProfile} />
    </div>
  ) : (
    <ReviewDisplay data={user?.detail} setEdit={(val) => setEdit(val)} review={review} />
  )
}


function BusinessType({next,updateProfile}) {
  const {user} = useSelector(state => state.user.userData);
  const userDetails = mergeRecursive(clone(profileSurveyData),user?.detail || {})
  const [data,setData] = useState({...profileSurveyData,...userDetails});
  const [loading,setLoading] = useState(false);

  async function handleSubmit() {
    let {agencyType} = data;
    if(agencyType === user?.detail?.agencyType)
      return next && next();
    
    setLoading(true);
    const res = await updateProfile({agencyType});
    if(res)
      next && next();
    setLoading(false);
  }

  return (
    <div>
      <div className='flex flex-col gap-2'>
        <h4 className=''>{user.firstName} {user.lastName}, Welcome to Miles!</h4>
        <p className=''>What type of business are you selling travel with?</p>
      </div>
      <div className='flex flex-col flex-wrap gap-4 justify-between self-stretch py-4'>
        <RadioGroup className='flex flex-col gap-4 py-4' options={[
          {value: 'starterBusiness',label: 'Starter Business',description: "I'm new to travel and preparing to register my business."},
          {value: 'registeredBusinessWithIATALicense',label: 'Registered business with IATA license',description: "My business has the approval (CAC), documentations and all licences required to operate legally and is IATA certified."},
          {value: 'registeredBusinessWithOutIATALicense',label: 'Registered business with out IATA license',description: "My business has the approval (CAC), documentations and all licences required to operate legally but is  not IATA certified."},
        ]} render={({label,description}) => (
          <div className='px-3'>
            <h5>{label}</h5>
            <p className=''>{description}</p>
          </div>
        )}
          value={data?.agencyType}
          onChange={(val) => setData({...data,agencyType: val})}
        />
      </div>
      <Button1 onClick={handleSubmit} loading={loading}>Continue</Button1>
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
      <Col name='Business Type' value={data?.agencyType} />
      <Col name='Trading Name' value={data?.tradingName} />
      <Col name='Business Address' value={data?.address?.businessLocation} />
      <Col name='Business Email' value={data?.businessEmail} />
      <Col name='Business Phone' value={data?.businessPhone} />
    </div>
  )
}

function DetailInfo({next,back,updateProfile}) {
  const {user} = useSelector(state => state.user.userData);
  const userDetails = mergeRecursive(clone(profileSurveyData),user?.detail || {},{createNew: true})
  const [data,setData] = useState({...profileSurveyData,...userDetails});
  const [loading,setLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const edit = searchParams.get('edit')

  async function handleSubmit() {
    let {tradingName,address,businessEmail,businessPhone} = data;
    
    setLoading(true);
    const res = await updateProfile({tradingName,address,businessEmail,businessPhone});
    if(res)
      next && next();
    setLoading(false);
  }

  function handleLocation(place) {
    setData({
      ...data,
      address: {
        location: [place.lat,place.lng],
        businessLocation: place.formattedAddress,
        lga: place.city,
        addressOne: place.subcity,
        addressTwo: place.route,
      }
    })
  }

  // console.log(user,data)
  return (
    <div className='flex flex-col gap-4'>
      {!edit ? 
        <div className='flex flex-col gap-2 py-4'>
          <h4 className=''>Hey {user.firstName}, let's get you started!</h4>
          <p className=''>Please tell us a little about your travel business to serve you better.</p>
        </div>
      :
        <h4 className='py-4'>Edit business detail</h4>
      }
      <div>
        <TextInput key={'tradeName'} label={'Trading name'} 
          value={data.tradingName || ''}
          onChange={(ev) => setData({...data,tradingName: ev.target.value})}          
        />
      </div>
      <div>
        <MapAutoComplete handleReturn={handleLocation}>
          <TextInput key='regName' label={'Business Address'} 
            placeholder={data?.address?.businessLocation || 'e.g 14b wole ariyo street, Lekki, Lagos'}
            // value={data?.address?.location[0] || ''}
            // onChange={(ev) => setData({...data,address:{location: [Number(ev.target.value),Number(ev.target.value)]}})}
            />
        </MapAutoComplete>
      </div>
      <div>
        <PhoneNumberInput label={'Business Phone number'} placeholder='e.g 8170000000'
          value={data?.businessPhone}
          onChange={(value) => setData({...data,businessPhone: value})}
        />
      </div>
      <div>
        <EmailInput label='Business Email' placehodler='hello@gmail.com'
          value={data?.businessEmail}
          onChange={(ev) => setData({...data,businessEmail: ev.target.value})}
        />
      </div>
        <div className='flex justify-between gap-4'>
          <Button1 className='!w-auto' onClick={() => back(edit)} variant='text'>Go back</Button1>
          <Button1 className='!w-auto' onClick={handleSubmit} loading={loading}>{!edit ? 'Next':'Update'}</Button1>
        </div>
      {/* {!edit ? 
      :null
        // <div className='flex justify-between gap-4'>
        //   <Button1 className='!w-auto'>Go back</Button1>
        //   <Button1 className='!w-auto'>Update</Button1>
        // </div>
      } */}
    </div>
  )
}

export default memo(BusinessDetail)