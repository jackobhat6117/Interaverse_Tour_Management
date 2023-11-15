import React, { useState } from 'react'
import milesfortours from '../../../assets/images/miles-for-tours.png'
import linkIcon from '../../../assets/icons/linkage 1.png'
import websiteIcon from '../../../assets/icons/Website.png'
import ticketIcon from '../../../assets/icons/Flight Ticket.png'
import ScreenViewObserver from '../../../components/animation/ScreenViewObserver'


export default function MilesForLinks(props) {
  const [initAnimate,setInitAnimate] = useState(false);
  
  const handleAnimation = () => setInitAnimate(true);

  const handleCancelAnimation = ()  => setInitAnimate(false);

  return (
    <ScreenViewObserver {...props} offScreenViewCallBack={handleCancelAnimation} onScreenViewCallBack={handleAnimation}>
      <div className='flex-1 overflow-hidden'>
        <img src={milesfortours} alt='' className={`max-h-screen ${initAnimate?' slide slide-slow ':'invisible'}`} />
      </div>
      <div className='flex-1 overflow-hidden'>
        <div className={`flex-1 flex flex-col gap-3 p-4 justify-center `}>
          <div className={`py-4 ${initAnimate?' slide-out duration-200 ':'invisible'}`}>
            <img alt='' src={linkIcon} className='w-10' />
            <h4>Generate Link</h4>
            <p>
              Generate custom links with your brand colors and logo using our API to share with customers.
            </p>
          </div>

          <div className={`py-4 ${initAnimate?' slide-out duration-600 ':'invisible'}`}>
            <img alt='' src={websiteIcon} className='w-10' />
            <h4>Embed into your website</h4>
            <p>
              Seamlessly integrate the links you generate into your website or app for easy flight bookings by customers
            </p>
          </div>

          <div className={`py-4 ${initAnimate?' slide-out duration-1000 ':'invisible'}`}>
            <img alt='' src={ticketIcon} className='w-10' />
            <h4>
              Receive Bookings
            </h4>
            <p>
              Monitor flight and ancillary bookings in real-time as they appear in your dashboard. 
              Earn money from booked flights with visible markups.
            </p>
          </div>
        </div>
      </div>
    </ScreenViewObserver>
  )
}
