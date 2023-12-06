import React from 'react'
import BreadCrumb from '../../../../components/DIsplay/Nav/BreadCrumb'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { decrypt } from '../../../../features/utils/crypto';
import SeatSelection from './SeatSelection';
import FlightPriceSummary from '../../../../components/flight/FlightPriceSummary';
import { useSelector } from 'react-redux';
import PaymentMethod from '../../../../components/flight/PaymentMethod';


export default function FlightPayment() {
  const {id} = useParams();
  const qObj = JSON.parse(decrypt(id));
  const {bookingData} = useSelector(state => state.flightBooking);
  const offer = bookingData?.offer && bookingData?.offer?.at(-1)

  const paymentData = {
    flightBookingId: bookingData?.orderData?.booking?._id,
    amount: bookingData?.orderData?.params?.offers?.at(0)?.totalAmount,
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
        {qObj?.destinations?.slice(0,1)?.map((obj,i) => {
          return (
            <div onClick={() => handleSearchRoute(i)} className='cursor-pointer'>
              {obj.departureLocation} to {obj.arrivalLocation}
            </div>
          )
        })}
        <Link to={`/order/new/flight/book/details/${id}`}>Detail</Link>
        <Link to={`/order/new/flight/book/ancillaries/${id}`}>Seats</Link>
        <b>Payment</b>
      </BreadCrumb>

      <div className='flex flex-col gap-6 flex-wrap-reverse md:flex-nowrap items-center justify-center my-10'>
        <FlightPriceSummary onBook 
            data={offer} 
          // footer={
          //   <Link className='btn-theme rounded-md flex justify-center' to={`/order/new/flight/book/payment/${id}`}>Proceed to checkout</Link>
          // } 
        />
        <PaymentMethod data={paymentData} />
      </div>
    </div>
  )
}