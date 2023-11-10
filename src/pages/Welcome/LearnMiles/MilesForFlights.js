import React from 'react'
import milesforflights from '../../../assets/images/miles-for-flight.png'

export default function MilesForFlights(props) {
  return (
    <div {...props}>
      <div className='flex-1 '>
        <img src={milesforflights} alt='' className='max-h-screen' />
      </div>
      <div className='flex-1 flex flex-col gap-3 p-4 justify-center'>
        <h4>Miles For Flights</h4>
        <p>
          Effortlessly search for flight content across major distribution channels including NDC, GDS, and LCC. 
          Take advantage of our additional services like extra bags and preferred seating to upgrade your travel.
        </p>
      </div>
    </div>
  )
}
