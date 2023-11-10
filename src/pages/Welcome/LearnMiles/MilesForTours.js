import React from 'react'
import milesfortours from '../../../assets/images/miles-for-tours.png'

export default function MilesForTours(props) {
  return (
    <div {...props}>
      <div className='flex-1 '>
        <img src={milesfortours} alt='' className='max-h-screen' />
      </div>
      <div className='flex-1 flex flex-col gap-3 p-4 justify-center'>
        <h4>Miles For Tours</h4>
        <p>
          Gives you access to a broad spectrum of tour options, enhancing their portfolio and meeting varied customer preferences.
        </p>
        <p>
          Removes lag time, allowing you to secure tour spots instantly, 
          improving client satisfaction with timely confirmations and eliminating the uncertainty of wait times or booking delays.
        </p>
      </div>
    </div>
  )
}
