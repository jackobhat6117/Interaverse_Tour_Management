import React from 'react'
import FlightInfo from '../../../FlightInfo'
import PriceSummary from '../../../PriceSummary'

export default function FlightView({page}) {
  return page === 'confirmation' && (
    <div className='flex flex-col gap-4'>
        <FlightInfo />
        <PriceSummary /> 
    </div>
  )
}
