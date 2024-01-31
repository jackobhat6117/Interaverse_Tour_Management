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


export const amenities = [
  {icon: seat,description: 'EXTRA LARGE SEAT',value: false, name: 'Extra large seat'},
  {icon: food,description: 'MEALS AND DRINKS',value: false, name: ''},
  {icon: seat2,description: '',value: false, name: ''},
  {icon: cabin,description: '',value: false, name: ''},
  {icon: stopwatch,description: '',value: false, name: ''},
  {icon: wifi,description: '',value: false, name: 'WIFI'},
]

export function FlightAmenities({flight}) {
  return (
    amenities.map((obj,i) => 
      flight?.amenities?.find(amen => (amen.description === obj.description)) || obj.value ?
      <Tooltip title={obj.name || obj.description} key={i}>
        <img alt='' src={obj.icon} />
      </Tooltip>
      :null
    )
  )
}
export default function FlightInfoCard({data,label='Depart'}) {
  // let tdata = offerDataTemp.segments[0];
  // const departureDateTime = moment(`${data?.departureDate} ${data?.departureTime}`, "YYYY-MM-DD HH:mm");
  // const arrivalDateTime = moment(`${data?.arrivalDate} ${data?.arrivalTime}`, "YYYY-MM-DD HH:mm");

  // console.log(data?.flights?.map(flight => flight?.amenities)?.flat())
  console.log(data)
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
        data?.flights?.map((flight,i) => {
          const refundable = flight?.amenities?.find(amen => amen.description === 'REFUNDS')
          const changable = flight?.amenities?.find(amen => amen.description === "CHANGEABLE TICKET")
          return (
          <div key={i}>

            <div className=' '>
              <div className='p-2'>
                <div className='flex gap-1 py-2 items-center text-sm'>
                  <img alt='airline' src={flight.carrierIcon} className='w-[50px] max-h-[30px] !object-contain' />
                  {flight.carrierName}
                  <div className='flex flex-wrap gap-4 pl-5 items-center'>
                    <span>
                      {flight.cabin}, <b>{flight.bookingClass}</b> 
                    </span>
                    <span>{flight.aircraftType}</span>
                    <label className='flex gap-1 items-center text-xs'>
                      <Icon icon={'ph:bag-simple-fill'} className='p-1 -scale-x-100' />
                      {flight?.baggage}
                    </label>
                  </div>
                </div>
                <div className='flex px-3'>
                  <div className='flex flex-col text-[#aaa] w-full '>
                    <small className='font-bold flex gap-2 items-center'>
                      <div className='dot mx-[4.7px]'></div>
                      <b className='text-primary min-w-[50px] '>{flight.departureTime}</b>
                      <div className='text-primary'>{flight.departureAirport} ({flight.departureLocation})</div>
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
                      <div className='text-primary'>{flight.arrivalAirport} ({flight.arrivalLocation})</div>
                    </small>
                  </div>
                </div>
              </div>
              <div className='flex gap-6 p-4 px-6 indent-1 uppercase flex-wrap'>
                <label className={`${!changable?'error':'triumph'} text-xs bg-opacity-30`}>{!changable ? 'Non Changable Ticket' : 'Changable Ticket'}</label>
                <label className={`${!refundable?'error':'triumph'} text-xs bg-opacity-30`}>{!refundable ? 'Non refundable Ticket':'Refundable Ticket'}</label>
                <div className='flex gap-4'>
                  <FlightAmenities flight={flight} />
                </div>
              </div>
            </div>
            {i < data?.flights.length-1 ? (() => {
              const duration = getFlightDuration(moment(`${flight?.arrivalDate} ${flight?.arrivalTime}`),moment(`${data?.flights[i+1]?.departureDate} ${data?.flights[i+1]?.departureTime}`),'short');

              const [hours] = duration.split("H");
              const hour = parseInt(hours);

              let length = hour > 5 ? (hour > 12 ? "very long" : "long") : "short";
              const day = duration.split('day');
              if(day.length > 1)
                length = 'very long'
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
          )
        })
      }
    </div>
  )
}
