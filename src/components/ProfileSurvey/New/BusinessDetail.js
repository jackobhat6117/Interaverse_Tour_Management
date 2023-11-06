import React, { memo, useState } from 'react'
import { MenuItem } from '@mui/material'
import SelectInput from '../../form/SelectInput'
import TextInput from '../../form/TextInput'
import { profileSurveyData } from '../../../data/user/profileSurvey'
import RadioGroup from '../../form/RadioGroup'
import Button1 from '../../form/Button1'
import PhoneNumberInput from '../../form/PhoneNumberInput'
import EmailInput from '../../form/EmailInput'


const steps = [
  <BusinessType />,
  <DetailInfo />
]
const CurComp = (props) => {
  return React.cloneElement(props.component || <></>,props)
}

function BusinessDetail({data,returnData,user,next}) {
  const [obj,setObj] = useState({...profileSurveyData,...data})
  const [step,setStep] = useState(0);


  function handleChange(obj) {
    setObj(obj);
    if(returnData)
      returnData(obj)
  }

  const stepNext = () => {
    if(step < steps.length-1 )
      setStep(step => step+1)
    else 
      next && next()
      // sendProfile(data);
  }

  const stepBack = () => {
    setStep(step => step > 0 ? step-1 : 0)
  }

  function skip() {
    // setOpen(false);
    // sessionStorage.setItem('profileSurvey','skip')
  }

  return (
    <div className='flex flex-col gap-4'>
      <CurComp key={'editor'} component={steps[step]} next={stepNext} back={stepBack} user={user} />
    </div>
  )
}

function BusinessType({user,next}) {
  return (
    <div>
      <div className='flex flex-col gap-2'>
        <h4 className=''>{user.firstName} {user.lastName}, Welcome to Miles!</h4>
        <p className=''>What type of business are you selling travel with?</p>
      </div>
      <div className='flex flex-col flex-wrap gap-4 justify-between self-stretch py-4'>
        <RadioGroup className='flex flex-col gap-4 py-4' options={[
          {value: 'Non-registered',label: 'Starter Business',description: "I'm new to travel and preparing to register my business."},
          {value: 'Private Limited',label: 'Registered business with IATA license',description: "My business has the approval (CAC), documentations and all licences required to operate legally and is IATA certified."},
          {value: 'Sole proprietor',label: 'Registered business with out IATA license',description: "My business has the approval (CAC), documentations and all licences required to operate legally but is  not IATA certified."},
        ]} render={({label,description}) => (
          <div className='px-3'>
            <h5>{label}</h5>
            <p className=''>{description}</p>
          </div>
        )} />
      </div>
      <Button1 onClick={next}>Continue</Button1>
    </div>
  )
}

function DetailInfo({next,back,user}) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2 pb-2'>
        <h4 className=''>{user.firstName} {user.lastName}, Welcome to Miles!</h4>
        <p className=''>Please tell us a little about your travel business to serve you better.</p>
      </div>
      <div>
        <TextInput key={'tradeName'} label={'Trading name'} 
          // value={obj.tradingName || ''}
          // onChange={(ev) => handleChange({...obj,tradingName: ev.target.value})}          
        />
      </div>
      <div>
        <TextInput key='regName' label={'Business Address'} placehodler='e.g 14b wole ariyo street, Lekki, Lagos'
          // value={obj.registeredBusinessName || ''}
          // onChange={(ev) => handleChange({...obj,registeredBusinessName: ev.target.value})}
        />
      </div>
      <div>
        <PhoneNumberInput label={'Business Phone number'} placeholder='e.g 08170000000' />
      </div>
      <div>
        <EmailInput label='Business Email' placehodler='hello@gmail.com' />
      </div>
      <div className='flex justify-between gap-4'>
        <Button1 className='!w-auto' onClick={back} variant='text'>Go back</Button1>
        <Button1 className='!w-auto' onClick={next}>Next</Button1>
      </div>
    </div>
  )
}

export default memo(BusinessDetail)