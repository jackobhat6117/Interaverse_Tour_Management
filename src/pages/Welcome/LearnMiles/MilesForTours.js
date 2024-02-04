import React, { useState } from 'react'
import milesfortours from '../../../assets/images/miles-for-tours.png'
import tourIcon from '../../../assets/icons/virtual-tour.png'
import ScreenViewObserver from '../../../components/animation/ScreenViewObserver';


export default function MilesForTours(props) {
  const [initAnimate,setInitAnimate] = useState(false);
  
  const handleAnimation = () => setInitAnimate(true);

  const handleCancelAnimation = ()  => setInitAnimate(false);
  return (
    <ScreenViewObserver {...props} offScreenViewCallBack={handleCancelAnimation} onScreenViewCallBack={handleAnimation}>
      <div className='flex-1 overflow-hidden'>
        <img src={milesfortours} alt='' className={`max-h-screen ${initAnimate?' slide slide-slow ':'invisible'}`} />
      </div>
      <div className={`flex-1 flex flex-col overflow-hidden gap-3 p-4 justify-center ${initAnimate?' slide slide-slow ':'invisible'}`}>
        <img alt='' src={tourIcon} className='w-16' />
        <h4>Miles For Tours</h4>
        <p>
          Gives you access to a broad spectrum of tour options, enhancing their portfolio and meeting varied customer preferences.
        </p>
        <p>
          Removes lag time, allowing you to secure tour spots instantly, 
          improving client satisfaction with timely confirmations and eliminating the uncertainty of wait times or booking delays.
        </p>
      </div>
    </ScreenViewObserver>
  )
}
