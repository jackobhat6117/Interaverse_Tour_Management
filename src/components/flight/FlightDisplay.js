import { AccessTime, FlightOutlined } from '@mui/icons-material'
import moment from 'moment';
import React from 'react'
import getFlightDuration from '../../features/flight/getFlightDuration';


export default function FlightDisplay({flight: data}) {
  let flight = data;
  //test
  const departureDateTime = moment(`${flight?.departureDate} ${flight?.departureTime}`, "YYYY-MM-DD HH:mm");
  const arrivalDateTime = moment(`${flight?.arrivalDate} ${flight?.arrivalTime}`, "YYYY-MM-DD HH:mm");
  const duration = getFlightDuration(departureDateTime,arrivalDateTime);

  return (flight && flight?.flights[0]) && (
    <div className='flex flex-1 '>
      <div className='flex flex-col gap-3 items-center justify-center p-3 w-[140px] text-center'>
        <img alt='airline' src={flight?.flights[0].carrierIcon} />
        <p>{flight?.flights[0].carrierName}</p>
      </div>
      <div className='flex flex-col gap-1 grow p-3'>
        {/* <p className=''>{flight?.flights[0].departureAirportName}</p> */}
        <div className='flex justify-between items-center relative grow'>
          <div className='flex flex-col items-center justify-center gap-3 '>
            <h6>{flight?.departureLocation}</h6>
            <b>{flight?.departureTime}</b>
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
          <div className='flex flex-col items-center justify-center gap-3'>
            <h6>{flight?.arrivalLocation}</h6>
            <b>{flight?.arrivalTime}</b>
          </div>
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
