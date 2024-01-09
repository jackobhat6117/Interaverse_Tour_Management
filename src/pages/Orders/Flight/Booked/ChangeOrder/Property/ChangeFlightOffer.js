import React, { useEffect, useState } from 'react'
import FlightOfferDisplay from '../../../../../../components/flight/FlightOfferDisplay'
import offerResponseSample from '../../../../../../data/flight/offerResponseSample'
import Button1 from '../../../../../../components/form/Button1';
import LoadingBar from '../../../../../../components/animation/LoadingBar';
import Paginate from '../../../../../../components/DIsplay/Paginate';
import getFlightOffers from '../../../../../../controllers/Flight/getFlightOffers';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingData } from '../../../../../../redux/reducers/flight/flightBookingSlice';

export default function ChangeFlightOffer({back,callback,prevResult: reqBody}) {
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false);
  const {bookingData} = useSelector(state => state.flightBooking);
  const dispatch = useDispatch();


  useEffect(() => {
    load();
  },[])

  async function load() {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve,2000))
    const res = await getFlightOffers(reqBody)
    if(res.return) {
      console.log(res.data);
      // setData(res.data)
    }
    setLoading(false);
    // setData(offerResponseSample.data);
  }

  function handleSelect() {
    dispatch(setBookingData({...bookingData,orderChange: data}));
    // local storage 
    callback();
  }

  const Tag = (props) => (
    <span className='light-bg text-primary/60 whitespace-nowrap p-2 rounded-md'>{props.children}</span>
  )
  
  return (
    <div className='flex flex-col gap-4'>
      <h5>Showing results for</h5>
      <div className='flex gap-4 items-center'>
        <div className='flex gap-4 max-w-full py-1 overflow-x-auto overflow-hidden'>
          <Tag>LOS - LON</Tag>
          <Tag>Economy</Tag>
          <Tag>Round Trip</Tag>
          <Tag>2 Passengers</Tag>
          <Tag>Wed, 26th Oct</Tag>
        </div>
        <div>
          <Button1 onClick={back}>Edit</Button1>
        </div>
      </div>
      {loading ? 
        <LoadingBar />
      :null}
      <Paginate data={data} className={'flex flex-col gap-4'} limit={20} render={(obj,i) => 
        <FlightOfferDisplay data={obj} key={i} offer={[data[0]]} select={handleSelect}/>
      } />
    </div>
  )
}
