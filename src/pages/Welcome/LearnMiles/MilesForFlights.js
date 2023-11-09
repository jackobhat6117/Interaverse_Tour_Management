import React from 'react'

export default function MilesForFlights(props) {
  return (
    <div {...props}>
      <div className='flex-1 test'>Image</div>
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
