import React, { useEffect } from 'react'
import BreadCrumb from '../../../../components/DIsplay/Nav/BreadCrumb'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { decrypt } from '../../../../features/utils/crypto';
import { useSelector } from 'react-redux';
import FlightPriceSummary from '../../../../components/flight/FlightPriceSummary';
import FlightSegmentDisplay from '../../../../components/flight/FlightSegmentDisplay';
import getFlightOfferPrice from '../../../../controllers/Flight/getOfferPrice';


export default function FlightBook() {
  const {id} = useParams();
  const qObj = JSON.parse(decrypt(id));
  const {bookingData} = useSelector(state => state.flightBooking);
  const offer = bookingData?.offer

  useEffect(() => {
    getPrice();
  },[])

  async function getPrice() {
    const res = await getFlightOfferPrice(offer);
    console.log(res)
  }

  const navigate = useNavigate();
  
  function handleSearchRoute(i) {
    navigate('/order/new/flight/offers?q='+id+'&path='+i)
  }

  return (
    <div className='pd-md py-4 flex flex-col gap-4'>
      <BreadCrumb>
        <Link to={'/order'}>Orders</Link>
        <Link to='/order/new/flight'>New order</Link>
        {qObj?.destinations?.map((obj,i) => {
          return (
            <div onClick={() => handleSearchRoute(i)} className='cursor-pointer'>
              {obj.departureLocation} to {obj.arrivalLocation}
            </div>
          )
        })}
        <b>Review</b>
      </BreadCrumb>
      <div className='flex gap-4'>
        <div className='flex flex-col gap-2 flex-1'>
          {offer?.segments.map((obj,i) => (
            <div key={i}>
              <FlightSegmentDisplay data={obj} />
            </div>
          ))}
        </div>
        <div>
          <FlightPriceSummary />
        </div>
      </div>
    </div>
  )
}
