import React, { useState } from 'react'
import milesforflights from '../../../assets/images/miles-for-flight.png'
import flightIcon from '../../../assets/icons/flight 1.png'
import ScreenViewObserver from '../../../components/animation/ScreenViewObserver'


function MilesForFlights(props) {
  const [initAnimate,setInitAnimate] = useState(false);
  
  function handleAnimation() {
    setInitAnimate(true)
  }

  function handleCancelAnimation() {
    setInitAnimate(false);
  }
  
  return (
    <ScreenViewObserver {...props} offScreenViewCallBack={handleCancelAnimation} onScreenViewCallBack={handleAnimation}>
      <div className='flex-1 overflow-hidden flex flex-col'>
        <img src={milesforflights} alt='' className={`max-h-screen animate-1000 ${initAnimate?' slide slide-slow ':'invisible'}`} />
      </div>
      <div className={`flex-1 flex flex-col gap-3 p-4 justify-center ${initAnimate?' slide-out slide-slow ':'invisible'}`}>
        <img alt='' src={flightIcon} className='w-16' />
        <h4>Miles For Flights</h4>
        <p>
          Effortlessly search for flight content across major distribution channels including NDC, GDS, and LCC. 
          Take advantage of our additional services like extra bags and preferred seating to upgrade your travel.
        </p>
      </div>
    </ScreenViewObserver>
  )
}

export default React.memo(MilesForFlights)