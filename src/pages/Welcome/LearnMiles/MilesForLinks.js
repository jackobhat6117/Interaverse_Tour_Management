import React from 'react'
import milesfortours from '../../../assets/images/miles-for-tours.png'

export default function MilesForLinks(props) {
  return (
    <div {...props}>
      <div className='flex-1 '>
        <img src={milesfortours} alt='' className='max-h-screen' />
      </div>
      <div className='flex-1 flex flex-col gap-3 p-4 justify-center'>
        <h4>Generate Link</h4>
        <p>
          Generate custom links with your brand colors and logo using our API to share with customers.
        </p>
        <h4>Embed into your website</h4>
        <p>
          Seamlessly integrate the links you generate into your website or app for easy flight bookings by customers
        </p>
        <h4>
          Receive Bookings
        </h4>
        <p>
          Monitor flight and ancillary bookings in real-time as they appear in your dashboard. 
          Earn money from booked flights with visible markups.
        </p>
      </div>
    </div>
  )
}
