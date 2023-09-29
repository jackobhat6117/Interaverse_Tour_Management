import React, { cloneElement, useCallback, useState } from 'react'
import ProductTypes from './ProductTypes';
import { Box, Dialog } from '@mui/material';
import Button1 from '../forms/Button1';
import OrganizationSize from './OrganizationSize';
import BusinessDetail from './BusinessDetail';
import MilesGoal from './MilesGoal';
import { profileSurveyData } from '../../data/user/profileSurvey';
import updateProfile from '../../controllers/user/updateProfile';
import { useSnackbar } from 'notistack';


const steps = [
  <ProductTypes />,
  <OrganizationSize />,
  <BusinessDetail/>,
  <MilesGoal />,
]
const CurComp = (props) => {
  return cloneElement(props.component || <></>,props)
}

export default function ProfileSurvey() {
  const [step,setStep] = useState(0);
  let skiped = sessionStorage?.getItem('profileSurvey');
  const [open,setOpen] = useState(skiped === 'skip' ? false : true);
  const [data,setData] = useState(profileSurveyData);
  const {enqueueSnackbar} = useSnackbar();
  const [loading,setLoading] = useState(false);


  async function sendProfile() {
    let modData = {...data};
    modData['interestedIn'] = data?.interestedIn?.join(',');
    console.log('modData: ',data,modData)
    setLoading(true);
    const res = await updateProfile(modData)
    setLoading(false);
    if(res.return) {
      enqueueSnackbar('Profile Updated',{variant: 'success'});
      setOpen(false);
    } else enqueueSnackbar(res.msg,{variant: 'error'})
  }

  const stepNext = () => {
    if(step < steps.length-1 )
      setStep(step => step+1)
    else sendProfile(data);
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
    <div>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth={'sm'} className='backdrop-blur-sm relative'>
        <Box className='pd-md relative'>
          <CurComp data={data} key={'editor'} returnData={handleChange} component={steps[step]} />
          <div className='flex justify-between items-start self-stretch gap-4 py-4'>
            <div className='flex gap-6 flex-wrap-reverse items-start flex-1 justify-start'>
              <Button1 className='whitespace-nowrap !w-auto ' variant={'text'} onClick={stepBack}>Go back</Button1>
              <Button1 variant={'outlined'} className='!w-auto' onClick={skip}>Skip</Button1>
            </div>
            <div>
              <Button1 loading={loading} onClick={stepNext} >{step === steps.length-1 ? 'Finish' : 'Next'}</Button1>
            </div>
          </div>
        </Box>
      </Dialog>
    </div>
  )
}
