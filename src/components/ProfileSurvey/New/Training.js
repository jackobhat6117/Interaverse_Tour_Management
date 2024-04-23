import React, { memo, useRef, useState } from 'react'
import Button1 from '../../form/Button1'
import { PopupButton, useCalendlyEventListener } from 'react-calendly'
import { useSelector } from 'react-redux';
import RadioGroup from '../../form/RadioGroup';
import scheduleMeeting from '../../../assets/images/schedule-meeting.png';
import Icon from '../../HOC/Icon';
import Logo from '../../Logo/Logo';
import { Link, useNavigate } from 'react-router-dom';
import BreadCrumb from '../../DIsplay/Nav/BreadCrumb';


function Training({updateProfile,back,next,type}) {
  const schedulerRef = useRef();
  const [complete,setComplete] = useState(false);
  const {user} = useSelector(state => state.user.userData)
  const navigate = useNavigate();
  const [step,setStep] = useState(0);
  const steps = [
    <Intro />,
    <Schedule />
  ]

  useCalendlyEventListener({
    // onDateAndTimeSelected: (e) => console.log(e),
    onEventScheduled: async (e) => {
      const res = await updateProfile({haveScheduledTraining: true})
      if(res)
        next && next()
    }
  })

  function handleNext() {
    if(step < (steps.length - 1)) {
      navigate('/')
      window.open('https://calendly.com/intraverse-africa/training','_blank')
      setStep(step+1)
    }
  }
  function handleBack() {
    step > 0 && setStep(step-1)
  }

  // !user?.detail?.haveScheduledTraining || type === 'new' ? (
  return ( 
    <div className='flex flex-col slide '>
      <div className='flex flex-wrap gap-4 pd-md py-4 justify-center sm:justify-between w-full shadow-md'>
        <Logo />
        <div className='hidden sm:block'>
          <Button1 to='/' className='flex gap-2 items-center'><Icon icon='mdi:home' className='w-4 h-4' /> Home</Button1>
        </div>
      </div>
      <div className='flex flex-col pd-md gap-6 py-6'>
        <div className='self-center sm:self-start'>
          <BreadCrumb className={'text-xs text-center !test'}>
            <Link to='/getting-started'>Getting Started</Link>
            <div>Training</div>
          </BreadCrumb>
        </div>
        <Stepper step={step} steps={steps.length} />
        {React.cloneElement(steps[step],{next: handleNext,back: handleBack})}
      </div>
      <br />
      <br />
      {/* <div className='flex flex-col gap-2'>
        <h4 className=''>Schedule a training</h4>
        <p className=''>Select a date you would prefer for us to start your training to better understand how to use our platform.</p>
      </div>
      <div className='flex flex-col flex-wrap gap-4 justify-between self-stretch py-4'>
        <label className='flex gap-2 cursor-pointer text-theme1'>
          <input type='checkbox' value='complete' onChange={(ev) => setComplete(ev.target.checked)} />
          I have scheduled a training
        </label>
        {!complete?(
          <div ref={schedulerRef} className='relative'>
            <PopupButton url='https://calendly.com/intraverse-africa/miles-training' 
              rootElement={document.getElementById('root')}
              text='Click here to schedule'
              className='btn-theme rounded-md'
              />
          </div>
        ):null}
        <div className='flex flex-col py-6 gap-4'>
          {complete ? 
            <Button1 className='!w-auto' onClick={next}>Continue</Button1>
          :
            <Button1 className='!w-auto' onClick={next} variant='outlined'>Skip for later</Button1>
          }
        </div>
      </div> */}
    </div>
  )
  //  : (
  //   <div className='flex flex-col gap-10 slide items-center'>
  //     <h4>Your Training has been scheduled</h4>
  //     <Button1 className='!w-auto' onClick={next}>Continue</Button1>
  //   </div>
  // )
}

function Intro({back,next}) {
  const [selectedOption,setSelectedOption] = useState();

  return (
    <div className='flex flex-col gap-5 text-xs sm:text-start '>
      <h4 className='text-primary text-center sm:text-start'>Want some help getting started?</h4>
      <p className='text-center sm:text-start'>We’ll get you up and running with a free 45-minute onboarding call.</p>
      <div className='sm:bg-theme1/10 sm:p-5 flex flex-wrap-reverse sm:flex-nowrap gap-5 justify-center sm:justify-between'>
        <div className='sm:p-5 flex flex-col gap-5 sm:w-auto'>
          <b className=''>During your call, an Intraverse expert will :</b>
          <ul className='flex flex-col gap-4 text-start list-disc list-inside whitespace-nowrap'>
            <li>Answer your questions about Intraverse</li>
            <li>Show you how to set up your account</li>
            <li>Share tips and tricks to help you</li>
          </ul>
        </div>
        <div className='w-full flex justify-center'>
          <img src={scheduleMeeting} alt='' className='object-cover' />
        </div>
      </div>
      
      <b className='text-center sm:text-start mt-4'>Ready to book your onboarding call</b>
      <div className='flex flex-wrap gap-4 justify-center sm:justify-between text-start'>
        <div className='flex flex-col gap-4'>
          <RadioGroup className='flex flex-col gap-2' options={[
              {label: 'Yes - free live training sounds great',value: 'yes'},
              {label: <div>
                <div>No not right now</div>
                {selectedOption === 'no' ? 
                  <div>No problem - you can book your onboarding call any time by calling us.</div>
                :null}
              </div>,value: 'no'},
              // {label: 'Yes - free live training sounds great',value: 'yes'},
            ]}
            value={selectedOption}
            onChange={(val) => setSelectedOption(val)}
          />
        </div>
        <div className='min-w-[25%] flex w-full sm:w-auto items-center justify-center'>
          {selectedOption === 'yes' ? 
            <Button1 onClick={next}>Scehdule Training</Button1>
          : selectedOption === 'no' ? 
            <Button1 to={'/getting-started'}>Skip for now</Button1>
          : selectedOption === 'page' ? 
            <Button1 to={'/trainingPage'}>Continue</Button1>
          :null}
        </div>
      </div>
    </div>
  )
}

function Schedule() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4 justify-between'>
        <div>
          <h4 className='text-primary'>Schedule a training</h4>
          <div>Pick a date for your training</div>
        </div>
        {/* <div>
          <Button1 to='/' className='flex gap-1 !pr-5'><Icon icon='fluent:home-24-regular' className='p-1' /> Home</Button1>
        </div> */}
      </div>

      <iframe
        title="Calendly Embed"
        src='https://calendly.com/intraverse-africa/training'
        // src="https://calendly.com/intraverse-africa/miles-training"
        // style={{ width: '100%', height: '600px', border: '0' }}
        className='w-full h-[800px] '
        sandbox="allow-scripts allow-same-origin"
        scrolling="auto"
      ></iframe>
    </div>
  )
}

function Stepper({steps,step}) {
  return (
    <div className='border border-theme1 rounded-md overflow-hidden flex '>
      {[...Array(steps)]?.map((_,i) => 
        <div key={i} className={`${step >= i ? 'bg-theme1' : ''} p-1 flex-1`}></div>
      )}
    </div>
  )
}

export default memo(Training)