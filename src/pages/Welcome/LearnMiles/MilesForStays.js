import React from 'react'
import milesforstays from '../../../assets/images/miles-for-stays.png'

export default function MilesForStays(props) {
  return (
    <div {...props}>
      <div className='flex-1 '>
        <img src={milesforstays} alt='' className='max-h-screen' />
      </div>
      <div className='flex-1 flex flex-col gap-3 p-4 justify-center'>
        <h4>Miles For Stays</h4>
        <p>
          With a single integration, agents can access a diverse range of properties from luxury hotels to boutique B&Bs, 
          eliminating the need to form multiple direct partnerships.
        </p>
      </div>
    </div>
  )
}
