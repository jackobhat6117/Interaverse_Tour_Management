import React from 'react'
import moment from 'moment';
import getFlightDuration from '../../features/flight/getFlightDuration';
import Icon from '../HOC/Icon';
// import { offerDataTemp } from '../../data/flight/offerData';
import wifi from '../../assets/icons/amenities/Wifi.svg'
import cabin from '../../assets/icons/amenities/ic_round-airline-seat-recline-normal.svg'
import food from '../../assets/icons/amenities/ion_fast-food.svg'
import stopwatch from '../../assets/icons/amenities/ion_stopwatch.svg'
import seat2 from '../../assets/icons/amenities/seat-1.svg'
import seat from '../../assets/icons/amenities/seat.svg'
import { Tooltip } from '@mui/material';

export default function FlightInfoCard({data,label='Depart'}) {
  // let tdata = offerDataTemp.segments[0];
  // const departureDateTime = moment(`${data?.departureDate} ${data?.departureTime}`, "YYYY-MM-DD HH:mm");
  // const arrivalDateTime = moment(`${data?.arrivalDate} ${data?.arrivalTime}`, "YYYY-MM-DD HH:mm");
  const amenities = [
    {icon: seat,value: true},
    {icon: food,value: true},
    {icon: seat2,value: true},
    {icon: cabin,value: true},
    {icon: stopwatch,value: true},
    {icon: wifi,value: true,name: 'WIFI'},
  ]
  return (
    <div className=' rounded-md w-full border-gray-300 bg-secondary'>
      <div className='flex gap-4 justify-between p-5'>
        <b className='flex gap-2'>
          {label} <span>-</span> {moment(data?.departureDate).format('ddd, DD MMM')}
          {/* {label} - {tdata?.booked_flights[0].origin.date} */}
        </b>
        <b>
          {/* {getFlightDuration(departureDateTime,arrivalDateTime)} */}
          {/* {data?.duration} */}
          {/* {tdata?.booked_flights[0].duration} */}
        </b>
      </div>
      {
        data?.flights?.map((flight,i) => (
          <div key={i}>

            <div className=' '>
              <div className='p-2'>
                <div className='flex gap-1 py-2 '>
                  <img alt='airline' src={flight.carrierIcon} className='w-[50px] max-h-[30px] !object-contain' />
                  {flight.carrierName}
                </div>
                <div className='flex px-3'>
                  <div className='flex flex-col text-[#aaa] w-full '>
                    <small className='font-bold flex gap-2 items-center'>
                      <div className='dot mx-[4.7px]'></div>
                      <b className='text-primary min-w-[50px] '>{flight.departureTime}</b>
                      <div className='text-primary'>{flight.departureAirportName} ({flight.departureLocation})</div>
                    </small>
                    <div className='px-2 flex'>
                      <div className='vr'></div>
                    </div>
                    <small className='flex gap-2 items-center'>
                      <Icon icon='uil:plane-fly' className='rotate-[30deg]' />
                      {/* <p className='max-w-[140px] min-w-[50px]'>{getFlightDuration(departureDateTime,arrivalDateTime,'short')}</p> */}
                      <p className='max-w-[140px] min-w-[50px]'>{flight.duration}</p>
                      
                        {
                          flight.arrivalTime < flight.departureTime ? 
                          <b className='bg-[#f48a3885] rounded-md px-2 p-1 text-[#533218]'>Overnight</b>
                          :
                          <b className='bg-[#C8F0BC] rounded-md px-2 p-1 text-[#378e37]'>Daylight</b>
                        }
                    </small>
                    <div className='px-2 flex'>
                      <div className='vr'></div>
                    </div>
                    <small className='font-bold flex gap-2 items-center'>
                      <div className='dot mx-[4.7px]'></div>
                      <b className='text-primary min-w-[50px] '>{flight.arrivalTime}</b>
                      <div className='text-primary'>{flight.arrivalAirportName} ({flight.arrivalLocation})</div>
                    </small>
                  </div>
                </div>
              </div>
              <div className='flex gap-6 p-4 px-6 indent-1 uppercase flex-wrap'>
                <label className={`${false?'error':'triumph'} text-xs bg-opacity-30`}>{false ? 'Non Changable Ticket' : 'Changable Ticket'}</label>
                <label className={`${true?'error':'triumph'} text-xs bg-opacity-30`}>{true ? 'Non refundable Ticket':'Refundable Ticket'}</label>
                <div className='flex gap-4'>
                  {amenities.map((obj,i) => 
                    <Tooltip title={obj.name} key={i}>
                      <img alt='' src={obj.icon} />
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
            {i < data?.flights.length-1 ? (() => {
              const duration = getFlightDuration(moment(`${flight?.departureDate} ${flight?.departureTime}`),moment(`${data?.flights[i+1]?.arrivalDate} ${data?.flights[i+1]?.arrivalTime}`),'short');

              const [hours] = duration.split("H");
              const hour = parseInt(hours);

              const length = hour > 5 ? (hour > 12 ? "very long" : "long") : "short";
              // const length = 'short'; // long, very long 
              
              return (
                <div className='border-y p-3 flex items-center gap-6 '>
                  <span className='min-w-[50px] px-2'>
                    {duration}
                  </span>
                  Changes plane at {flight.arrivalAirportName} ({flight.arrivalLocation}) {flight.duration > 2 ? <b className='text-[#533218] bg-[#f48a3885] rounded-md px-2 p-1'>Long stopover</b>:''}

                  <span className={`${length === 'long' ? 'error bg-opacity-50' : length === 'very long' ? 'error' : 'warn'} uppercase text-xs`}>{length} stopover</span>
                </div>
              )}
            )():null}
            {/* <div className='p-3 flex gap-6 items-center justify-end'>
              <small className='flex gap-1 items-center whitespace-nowrap'>
                <FitnessCenter className='text-sm font-bold rotate-[-45deg]' />
                {flight.weightUnit || data?.weightUnit} {flight.weightType || data?.weightType}
              </small>

              <h6 className='px-4 whitespace-nowrap'>{flight.cabin} {flight.bookingClass || data?.bookingClass}</h6>
            </div> */}


          </div>
        ))
      }
    </div>
  )
}
