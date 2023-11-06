import React, { useCallback, useState } from 'react'
import textlogo from '../../../assets/icons/textlogo.png'
import logo from '../../../assets/icons/logo.png'
import {ReactComponent as Astraunant} from '../../../assets/images/astronaut-launch-with-rocket.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { profileSurveyData } from '../../../data/user/profileSurvey';
import updateProfile from '../../../controllers/user/updateProfile';
import { setUser } from '../../../redux/reducers/userSlice';
import BusinessDetail from './BusinessDetail';
import LegalEntity from './LegalEntity';
import KeyContact from './KeyContact';
import { Step, Stepper } from '@mui/material';
import Icon from '../../HOC/Icon';


const steps = [
  {label: 'Business Detail',elem: <BusinessDetail />},
  {label: 'Legal Entity',elem: <LegalEntity />},
  {label: 'Key Contact',elem: <KeyContact />}
];
const CurComp = (props) => {
  return React.cloneElement(props.component || <></>,props)
}
export default function ProfileSurvey() {
  let skiped = sessionStorage?.getItem('profileSurvey');
  const [open,setOpen] = useState(skiped === 'skip' ? false : true);
  const {user} = useSelector(state => state.user.userData);
  const [data,setData] = useState({...profileSurveyData,...(user?.detail || {})});
  const {enqueueSnackbar} = useSnackbar();
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  const [step,setStep] = useState(() => {
    let cur = 0;
    // if(user?.detail?.interestedIn.length)
    //   cur = 1;
    // if(user?.detail?.sizeOfOrganization)
    //   cur = 2;
    // if(user?.detail?.registeredBusinessName && user?.detail?.typeOfBusiness)
    //   cur = 3;
    
    return cur
  });

  async function sendProfile() {
    let modData = {...data};
    // modData['interestedIn'] = data?.interestedIn?.join(',');
    // console.log('modData: ',data,{...profileSurveyData,...(user.detail || {})})
    // if(JSON.stringify(data) === JSON.stringify({...profileSurveyData,...(user.detail || {})}))
    //   return setStep(step => step < steps.length-1 ? step+1 : step && setOpen(false))

    setLoading(true);
    const res = await updateProfile(modData)
    setLoading(false);
    if(res.return) {
      if(step < steps.length-1) {
        setStep(step => step+1)
      } else {
        enqueueSnackbar('Profile Completed',{variant: 'success'});
        // dispatch(setUser(res?.data?.data))
        setOpen(false);
      }
      res?.data?.data &&
      dispatch(setUser(res?.data?.data))

    } else enqueueSnackbar(res.msg,{variant: 'error'})
  }

  const stepNext = () => {
    if(step < steps.length-1 )
      setStep(step => step+1)
    else 
      sendProfile(data);
  }

  const stepBack = () => {
    setStep(step => step > 0 ? step-1 : 0)
  }

  function skip() {
    setOpen(false);
    sessionStorage.setItem('profileSurvey','skip')
  }

  const handleChange = useCallback((updatedData) => {
    setData((prevData) => ({...prevData,...updatedData}));
  },[])

  return (
    <div className='flex min-h-screen'>
      <div className='flex flex-col justify-between  bg-[#B3DBFF]'>
        <div className='flex gap-2 items-center p-10'>
          <img src={logo} alt='Logo' />
          <img src={textlogo} alt='Logo' />
        </div>
        <Astraunant className='max-h-[400px] w-auto translate-x-11' />
      </div>
      <div className='flex items-center justify-center w-full'>
        <div className='flex flex-col gap-5 w-[600px]'>
          <div>
            <ProfileStepperNav activeStep={step} steps={steps} setStep={setStep} />
          </div>

          <CurComp data={data} key={'editor'} user={user} returnData={handleChange} component={steps[step]?.elem} back={stepBack} next={stepNext} loading={loading} />
        </div>
      </div>
    </div>
  )
}

function ProfileStepperNav({activeStep,steps,setStep}) {
  const CustomConnector = () => (
    <div className='flex justify-center items-center text-primary/20 flex-1'>
      <hr className='w-3' />
      <Icon icon={'ri:plane-line'} className='w-4 h-4 rotate-90' />
    </div>
  )
  return (
    <div className='p-4 bg-primary/[5%] rounded-md'>
      <Stepper activeStep={activeStep} connector={<CustomConnector />}>
        {steps.map((obj,i) => {
          return (
            <Step key={i} onClick={() => setStep(i)}>
              <div className='flex flex-col gap-1 items-center cursor-pointer'>
                <div className={`flex justify-center items-center p-2 w-7 h-7 rounded-full text-secondary ${activeStep === i ? 'bg-theme1':'bg-primary/20'}`}>{i+1}</div>
                <b className={`cursor-pointer ${activeStep === i ? 'text-theme1':'text-primary/50'}`}>
                  {obj.label}
                </b>
              </div>
            </Step>
          )
        })}
      </Stepper>
    </div>
  )
}