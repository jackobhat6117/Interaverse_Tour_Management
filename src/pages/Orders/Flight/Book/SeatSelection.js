import React, { useEffect, useState } from 'react'
import Icon from '../../../../components/HOC/Icon'
import SkullLoad from '../../../../components/DIsplay/SkullLoad'
import Button1 from '../../../../components/form/Button1'
import PlaneSeat from '../../../../components/flight/PlaneSeat'
import getFlightSeats from '../../../../controllers/Flight/getFlightSeats'
import { clone } from '../../../../features/utils/objClone'
import { useDispatch, useSelector } from 'react-redux'
import { setBookingData } from '../../../../redux/reducers/flight/flightBookingSlice'
import Modal1 from '../../../../components/DIsplay/Modal/Modal1'

export default function SeatSelection({offer,callback,hide}) {
  // const flights = (offer || {})?.directions?.flat()
  const flights = (offer || {})?.directions?.flatMap((arr,i) => arr.map((f,j) => ({...f,i,j})))

  return (
    <div className='flex flex-col gap-4 w-full'>
      <h6>Seat Selection (Optional)</h6>
      
      {!hide?.includes('info') ? 
        <SeatInfo />
      :null}
      {(flights || [...Array(2)]).map((obj,i) => (
        <FlightSeatDisplay callback={(seats) => callback(seats,{i:obj.i,j:obj.j})} obj={obj} key={i} routeIndex={i} />
      ))}
      {/* <FlightSeatDisplay offers={offer} data={obj} key={i} /> */}
    </div>
  )
}


function SeatInfo() {
  return (
    <div className='bg-theme1/10 border-l-8 border-theme1 p-4 flex items-center gap-6'>
      <div>
        <Icon icon={'ic:round-airline-seat-recline-normal'} className='w-16 h-16' />
      </div>
      <div className='flex flex-col gap-2'>
        <b>Select your seats</b>
        <div className='flex gap-2 items-center'>
          <Icon icon='ic:round-task-alt' className='p-1' />
          <p>
            Find the most comfortable seats for your group.
          </p>
        </div>
        <div className='flex gap-2 items-center'>
          <Icon icon='ic:round-task-alt' className='p-1' />
          <p>
            Get the additional legroom you need.
          </p>
        </div>
        <div className='flex gap-2 items-center'>
          <Icon icon='ic:round-task-alt' className='p-1' />
          <p>
            Save money — adding seats after booking is usually more expensive.
          </p>
        </div>
      </div>
    </div>
  )
}


export function FlightSeatDisplay({obj,offers:gotOffers,routeIndex,readOnly,callback}) {
  const [open,setOpen] = useState(false);
  const [loading,setLoading] = useState(false);

  const {bookingData} = useSelector(state => state.flightBooking);
  let offers = clone(gotOffers || bookingData?.offersPrice || bookingData?.offer) || []
  let offer = Array.isArray(offers) ? offers?.at(-1) : offers;
  offer = offer?.orgi || offer;
  const dispatch = useDispatch();

  const [data,setData] = useState([]);
  const [selectedSeat,setSelectedSeat] = useState();

  // let flights = offer?.directions?.flat()

  async function handleSelect(open) {
    setOpen(open);
    if(!open) return false;

    // const flight = flights?.find((_,i) => i === routeIndex)
    // const flight = flights?.find((ob,i) => JSON.stringify(ob) === JSON.stringify(obj))

    let modOffer = clone(offer);
    // if(modOffer) {
    //   // modOffer.directions = [[flight]]
    //   modOffer.segments = null;
    //   modOffer.fareRules = null;
    // }

    const reqData = {
      offers: [modOffer],
      supplier: offer?.supplier
    }

    const arrivalLocation = modOffer?.directions?.flat()?.at(routeIndex)?.arrival?.location;
    const departureLocation = modOffer?.directions?.flat()?.at(routeIndex)?.departure?.location;
    setLoading(true);
    const res = await getFlightSeats(reqData);
    setLoading(false);
    if(res.return) {
      setData([res.data?.find(obj => obj.arrivalLocation === arrivalLocation && obj.departureLocation === departureLocation)] || []);
      // setSelectedSeat()
    } else setData([]);

  }

  function handleSelectedSeat(obj) {
    setSelectedSeat(obj);
    if(callback)
      return callback(obj);

    try {
      let count = 0;
      offer?.directions?.map((direction,i) => 
        direction?.map((flight,j) => {
          if(count === routeIndex)
            flight.selectedSeat = obj;
          return count++
        })
      )
      // flights[routeIndex] = {...flights[routeIndex],selectedSeat: obj}
      // offers[offers.length-1].directions = flights
      // // bookingData.offer = ?.at(-1).directions = flights;
      dispatch(setBookingData({...bookingData,offer: [offer]}))
    } catch(ex) {console.log(ex)}
  }

  return (
    <div className='flex flex-col gap-3 p-4 bg-primary !bg-opacity-[5%] rounded-md '>
      <div className='flex gap-4 items-center'>
        <div>
          <SkullLoad label='' value={obj?.airline?.image?.url} render={(val) => <img alt='' src={val} className='w-[100px] h-[100px]' />} variant='rectangular' className='w-10 !h-[100px]' />
        </div>
        <div className='flex-1 flex-col gap-3'>
          <div>
            <SkullLoad label='LOS' value={obj?.departure?.location} /> - <SkullLoad label='ISB' value={obj?.arrival?.location} />
          </div>
          <p>{selectedSeat ? selectedSeat[0]?.seatNumber : 'No seat selected'}</p>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='btn text-center bg-primary/10 cursor-default text-primary' >{selectedSeat?.at(0)?.seatNumber ? selectedSeat[0]?.seatNumber : 'NON'}</div>
          <Button1 variant='outlined' onClick={() => handleSelect(!open)}>{!open? (selectedSeat && selectedSeat[0]?.seatNumber ? 'Change Seat' : 'Select Seat' ) :'Hide Seats'}</Button1>
        </div>
      </div>
      {!readOnly ? 
        <Modal1 open={open} setOpen={setOpen} 
          // className={`h-0 transition-all overflow-hidden ${open?'!h-auto':''}`}
        >
          <div className='flex flex-col gap-4 p-4'>
            <div className='flex gap-4 items-center'>
              <div>
                <SkullLoad label='' value={obj?.airline?.image?.url} render={(val) => <img alt='' src={val} className='w-[100px] h-[100px]' />} variant='rectangular' className='w-10 !h-[100px]' />
              </div>
              <div className='flex-1 flex-col gap-3'>
                <div>
                  <SkullLoad label='LOS' value={obj?.departure?.location} /> - <SkullLoad label='ISB' value={obj?.arrival?.location} />
                </div>
                <p>{selectedSeat ? selectedSeat[0]?.seatNumber : 'No seat selected'}</p>
              </div>
              <div className='flex flex-col gap-4'>
                <div className='btn text-center bg-primary/10 cursor-default text-primary' >{selectedSeat ? selectedSeat[0]?.seatNumber : 'NON'}</div>
                <Button1 variant='outlined' onClick={() => handleSelect(!open)}>{!open?'Select Seat':'Hide Seats'}</Button1>
              </div>
            </div>
            <PlaneSeat seatMapData={data} loading={loading} returnData={(val) => handleSelectedSeat(val)} />

            <div className='flex gap-4'>
              <button className='px-4' onClick={(ev) => {ev?.preventDefault(); ev.stopPropagation(); setOpen(false)}}>Cancel</button>
              <Button1 onClick={(ev) => {ev?.preventDefault(); ev.stopPropagation(); setOpen(false)}}>Confirm</Button1>
            </div>
          </div>
        </Modal1>
      :null}
    </div>
  )
}