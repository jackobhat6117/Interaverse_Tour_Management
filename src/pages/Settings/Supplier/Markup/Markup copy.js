import React from 'react'
import { useLocation } from 'react-router-dom'
import FlightMarkup from './FlightMarkup'
import StaysMarkup from './StaysMarkup';
import ToursMarkup from './ToursMarkup';


export default function MarkupSetting() {
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search)
  const type = searchParam.get('type') || 'Flights'

  return (
    <div className='flex flex-col gap-4 content-max-w'>
      {type === 'Flights'?
        <FlightMarkup />
      :type === 'Stays'?
        <StaysMarkup />
      :type === 'Tours'?
        <ToursMarkup />
      :null}
    </div>
  )
}

