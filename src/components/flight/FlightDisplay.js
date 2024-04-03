import { AccessTime, FlightOutlined } from '@mui/icons-material'
import moment from 'moment';
import React from 'react'
import getFlightDuration from '../../features/flight/getFlightDuration';
import Icon from '../HOC/Icon';


export default function FlightDisplay({flight: data}) {
  let flight = data;
  //test
  const departureDateTime = moment(`${flight?.departureDate} ${flight?.departureTime}`, "YYYY-MM-DD HH:mm");
  const arrivalDateTime = moment(`${flight?.arrivalDate} ${flight?.arrivalTime}`, "YYYY-MM-DD HH:mm");
  const duration = getFlightDuration(departureDateTime,arrivalDateTime,'short');

  return (flight && flight?.flights[0]) && (
    <div className='flex flex-1 '>
      <div className='flex flex-col items-center justify-center p-3 w-[140px] text-center'>
        <img alt='airline' src={flight?.flights[0].carrierIcon} className=''/>
        <p className=''>{flight?.flights[0].carrierName}</p>
      </div>
      <div className='flex flex-col gap-1 grow p-3 py-8'>
        {/* <p className=''>{flight?.flights[0].departureAirportName}</p> */}
        <div className='flex justify-between items-center relative gap-2'>
          <div className='flex flex-col justify-center gap-1 h-full  items-between '>
            <div className='flex gap-2'>
              <b>{flight?.departureTime}</b>
              <h6>{flight?.departureLocation}</h6>
            </div>
            <div className='overflow-hidden flex-1  max-w-[150px]'>{flight?.departureAirport}, {flight?.departureCity}</div>
          </div>
          <div className='flex flex-col items-center justify-center '>
            <small className='whitespace-nowrap py-1 flex items-center gap-1'>
              <AccessTime className='!w-4 !h-4' />
              {/* {flight?.duration} */}
              {duration}
            </small>
            {/* <div className='border border-[#777] min-w-[80px] relative'>
              <div className='absolute left-[20%] -top-1 bg-black rounded-full w-2 h-2'></div>
              <div className='absolute right-[20%] -top-1 bg-black rounded-full w-2 h-2'></div>
            </div> */}
            <small className=' text-theme1 whitespace-nowrap py-1'>
              <FlightOutlined className='rotate-45 w-4 h-4' /> 
              {flight?.numberOfStops || 0} stopover{flight?.numberOfStops > 1 ? 's':''}
            </small>
          </div>
          <div className='flex flex-col justify-center gap-1 h-full items-between '>
            <div className='flex gap-2'>
              <b>{flight?.arrivalTime}</b>
              <h6>{flight?.arrivalLocation}</h6>
            </div>
            <div className='overflow-hidden flex-1  max-w-[150px]'>{flight?.arrivalAirport}, {flight?.arrivalCity}</div>
          </div>
        </div>
        <div className='p-1 flex gap-2'>
          <label className='flex gap-1 items-center text-xs'>
            <Icon icon={'icon-park-solid:airplane-window-one'} className='p-1 -scale-x-100' />
            {flight?.flights[0]?.cabin} | <b>{flight?.flights[0]?.bookingClass}</b>
          </label>
          <label className='flex gap-1 items-center text-xs'>
            <Icon icon={'ph:bag-simple-fill'} className='p-1 -scale-x-100' />
            {flight?.flights[0]?.baggage}
          </label>
        </div> 
        {/* <p className='text-end self-end'>{flight?.flights[0].arrivalAirportName}</p> */}

        {/* <small className='flex gap-1 items-center'>
          <FitnessCenter className='text-sm font-bold rotate-[-45deg]' />
          {flight?.weightUnit} {flight?.weightType}
        </small> */}
      </div>
    </div>
  )
}