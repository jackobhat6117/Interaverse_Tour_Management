import React, { memo, useRef, useState } from 'react'
import Button1 from '../../form/Button1'
import { PopupButton, useCalendlyEventListener } from 'react-calendly'


function Training({back,next}) {
  const schedulerRef = useRef();
  const [complete,setComplete] = useState(false);

  useCalendlyEventListener({
    // onDateAndTimeSelected: (e) => next && next(),
    onEventScheduled: (e) => next && next()
  })

  return (
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
  )
}

export default memo(Training)