import React, { memo, useRef, useState } from 'react'
import Button1 from '../../form/Button1'
import { PopupButton, useCalendlyEventListener } from 'react-calendly'
import { useSelector } from 'react-redux';


function Training({updateProfile,back,next,type}) {
  const schedulerRef = useRef();
  const [complete,setComplete] = useState(false);
  const {user} = useSelector(state => state.user.userData)

  useCalendlyEventListener({
    // onDateAndTimeSelected: (e) => console.log(e),
    onEventScheduled: async (e) => {
      console.log(e)
      const res = await updateProfile({haveScheduledTraining: true})
      if(res)
        next && next()
    }
  })

  return !user?.detail?.haveScheduledTraining || type === 'new' ? (
    <div className='flex flex-col gap-4 slide'>
      <div className='flex flex-col gap-2'>
        <h4 className=''>Schedule a training</h4>
        <p className=''>Select a date you would prefer for us to start your training to better understand how to use our platform.</p>
      </div>
      <div className='flex flex-col flex-wrap gap-4 justify-between self-stretch py-4'>
        {/* <CalendarInput1 label={'Training day'} /> */}
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
      </div>
    </div>
  ) : (
    <div className='flex flex-col gap-10 slide items-center'>
      <h4>Your Training has been scheduled</h4>
      <Button1 className='!w-auto' onClick={next}>Continue</Button1>
    </div>
  )
}

export default memo(Training)