import React, { useState } from 'react'
import milesforstays from '../../../assets/images/miles-for-stays.png'
import hotelIcon from '../../../assets/icons/hotel.png'
import ScreenViewObserver from '../../../components/animation/ScreenViewObserver'


export default function MilesForStays(props) {
  const [initAnimate,setInitAnimate] = useState(false);
  
  const handleAnimation = () => setInitAnimate(true);

  const handleCancelAnimation = ()  => setInitAnimate(false);

  return (
    <ScreenViewObserver {...props} offScreenViewCallBack={handleCancelAnimation} onScreenViewCallBack={handleAnimation}>
      <div className='flex-1 '>
        <img src={milesforstays} alt='' className={`max-h-screen ${initAnimate?' slide-out slide-slow ':'invisible'}`} />
      </div>
      <div className={`flex-1 flex flex-col gap-3 p-4 justify-center ${initAnimate?' slide-out slide-slow ':'invisible'}`}>
        <img alt='' src={hotelIcon} className='w-16' />
        <h4>Miles For Stays</h4>
        <p>
          With a single integration, agents can access a diverse range of properties from luxury hotels to boutique B&Bs, 
          eliminating the need to form multiple direct partnerships.
        </p>
      </div>
    </ScreenViewObserver>
  )
}
