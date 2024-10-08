import React from 'react'
import FlightMarkup from './FlightMarkup'
import { useLocation } from 'react-router-dom';
import StaysMarkup from '../../Order/Markup/StaysMarkup';
import ToursMarkup from '../../Order/Markup/ToursMarkup';

const Markup = () => {
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


export default Markup
