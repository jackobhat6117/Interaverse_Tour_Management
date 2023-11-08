import React, { useEffect, useState } from 'react'
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
import Training from './Training';
import { Link, useLocation } from 'react-router-dom';
import checkProfileComplete from '../../../features/profile/checkProfileComplete';


export const profileSteps = [
  {label: 'Business Detail',elem: <BusinessDetail />},
  {label: 'Legal Entity',elem: <LegalEntity />},
  {label: 'Key Contact',elem: <KeyContact />},
  {label: 'Training',elem: <Training />}
];
const steps = (profileSteps);
const CurComp = (props) => {
  return React.cloneElement(props.component || <></>,props)
}
export default function ProfileSurvey() {
  const {user} = useSelector(state => state.user.userData);
  const [data,setData] = useState({...profileSurveyData,...(user?.detail || {})});
  const {enqueueSnackbar} = useSnackbar();
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const stepq = query.get('step')
  const completedSteps = checkProfileComplete(user);
  const completed = completedSteps.every(obj => obj.complete);

  const [step,setStep] = useState(() => {
    let cur = 0;
    let stop = false;

    completedSteps.map(obj => {
      if(!stop)
        obj.complete ? cur++ : stop = true;

      return true;
    })

    cur = stepq ? Math.max(0,Number(stepq)-1) : cur;
    // if(user?.detail?.interestedIn.length)
    //   cur = 1;
    // if(user?.detail?.sizeOfOrganization)
    //   cur = 2;
    // if(user?.detail?.registeredBusinessName && user?.detail?.typeOfBusiness)
    //   cur = 3;
    
    return cur
  });

  async function sendProfile(data) {
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
        // setStep(step => step+1)
      } else {
        enqueueSnackbar('Profile Completed',{variant: 'success'});
        // dispatch(setUser(res?.data?.data))
      }
      res?.data?.data &&
      dispatch(setUser(res?.data?.data))
      return true;
    } else enqueueSnackbar(res.msg,{variant: 'error'})

    return false;
  }

  const stepNext = () => {
    // if(step < steps.length-1 )
      setStep(step => step+1)
    // else 
    //   sendProfile(data);
  }

  const stepBack = () => {
    setStep(step => step > 0 ? step-1 : 0)
  }

  // function skip() {
  //   setOpen(false);
  //   sessionStorage.setItem('profileSurvey','skip')
  // }

  // const handleChange = useCallback((updatedData) => {
  //   setData((prevData) => ({...prevData,...updatedData}));
  // },[])

  return !completed && step < steps.length ? (
    <div className='flex min-h-screen max-w-full overflow-hidden'>
      <div className='hidden md:flex flex-col justify-between w-[30%] max-w-[300px] bg-[#B3DBFF]'>
        <div className='flex gap-2 items-center p-4 md:p-10 max-w-full justify-center flex-wrap lg:flex-nowrap'>
          <img src={logo} alt='Logo' />
          <img src={textlogo} alt='Logo' className=''/>
        </div>
        <div className='relative h-[400px] '>
          <Astraunant className=' w-full h-auto bottom-0 translate-x-8 absolute ' />
        </div>
      </div>
      <div className='flex items-center justify-center flex-1 p-4 max-w-full'>
        <div className='flex flex-col gap-5 w-[600px] min-h-[85%] max-w-full'>
          <div>
            <ProfileStepperNav activeStep={step} steps={steps} setStep={setStep} />
          </div>

          <div className='flex-1 flex flex-col justify-center'>
            <CurComp data={data} setData={setData} key={'editor'} user={user} 
              component={steps[step]?.elem} 
              updateProfile={sendProfile}
              back={stepBack} next={stepNext} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  ) : step >= steps.length ? (
    <Congradulations />
  ) : null
}

function Congradulations() {
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false),4000);
  },[])
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex gap-2 items-center p-10'>
        <img src={logo} alt='Logo' />
        <img src={textlogo} alt='Logo' />
      </div>

      {loading ? 
        <div className='flex flex-col flex-1 justify-center items-center '>
          <img src={'/gifs/loading-bar.gif'} alt='Preloader' className='h-[150px]' />
        </div>
      :
        <div className='flex flex-1 flex-col items-center justify-center text-center w-full gap-10'>
          <h2>Congradulations</h2>
          <div className='flex flex-col items-center gap-4'>
            <h4 className='max-w-[500px]'>Your business has been registered with us</h4>
            <div className='max-w-[700px]'>
              <p>
                Our team will process your account activation and setup your selling platform. 
              </p>
              <p>
                Once your platform is ready, we will notify you via email.
              </p>
              <p>
                Training will begin on the 21st November 2023, Please if you need any information or assistance before then, do well to contact us on 09030002629. Thank you.
              </p>
            </div>
          </div>
          <Link to='/' className='btn-theme rounded-md w-full justify-center max-w-[500px]'>Continue</Link>
        </div>
      }
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
    <div className='p-4 bg-primary/[5%] rounded-md max-w-full overflow-x-auto'>
      <Stepper activeStep={activeStep} connector={<CustomConnector />}>
        {steps.map((obj,i) => {
          return (
            <Step key={i} onClick={() => setStep(i)}>
              <div className='flex flex-col gap-1 items-center justify-between cursor-pointer'>
                <div className={`flex justify-center  items-center p-2 w-7 h-7 rounded-full text-secondary ${activeStep === i ? 'bg-theme1':'bg-primary/20'}`}>{i+1}</div>
                <b className={`cursor-pointer text-center flex-1 ${activeStep === i ? 'text-theme1':'text-primary/50'}`}>
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