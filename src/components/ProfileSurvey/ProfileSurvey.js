import React, { cloneElement, useState } from 'react'
import ProductTypes from './ProductTypes';
import { Dialog } from '@mui/material';
import Button1 from '../forms/Button1';
import OrganizationSize from './OrganizationSize';
import BusinessDetail from './BusinessDetail';
import MilesGoal from './MilesGoal';

export default function ProfileSurvey() {
  const [step,setStep] = useState(0);
  const [open,setOpen] = useState(true);
  const steps = [
    <ProductTypes />,
    <OrganizationSize />,
    <BusinessDetail />,
    <MilesGoal />,
  ]

  const CurComp = (props) => {
    return cloneElement(props.component || <></>,props)
  }

  const stepNext = () => {
    if(step < steps.length-1 )
      setStep(step => step+1)
    else setOpen(false);
  }

  const stepBack = () => {
    setStep(step => step > 0 ? step-1 : 0)
  }

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth={'sm'} className='backdrop-blur-sm'>
        <div className='pd-md'>
          <CurComp component={steps[step]} next={stepNext} back={stepBack} />
          <div className='flex justify-between items-start self-stretch gap-4 py-4'>
            <div>
              <Button1 onClick={stepNext} >Next</Button1>
            </div>
            <div className='flex gap-6 flex-wrap-reverse items-start flex-1 justify-end'>
              <Button1 className='whitespace-nowrap !w-auto ' variant={'text'} onClick={stepBack}>Go back</Button1>
              <Button1 variant={'outlined'} className='!w-auto' onClick={stepNext}>Skip</Button1>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
