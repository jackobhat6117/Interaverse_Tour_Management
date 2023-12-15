import React from 'react'
import BreadCrumb from '../../../../components/DIsplay/Nav/BreadCrumb'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { decrypt } from '../../../../features/utils/crypto';
import SeatSelection from './SeatSelection';
import FlightPriceSummary from '../../../../components/flight/FlightPriceSummary';
import { useSelector } from 'react-redux';
import PaymentMethod from '../../../../components/flight/PaymentMethod';
import Icon from '../../../../components/HOC/Icon';
import { formatMoney } from '../../../../features/utils/formatMoney';
import FlightPriceCommission from '../../../../components/flight/FlightPriceCommission';


export default function FlightPayment() {
  const {id} = useParams();
  const qObj = JSON.parse(decrypt(id));
  const {bookingData} = useSelector(state => state.flightBooking);
  const offer = bookingData?.offer && bookingData?.offer?.at(-1)

  const paymentData = {
    flightBookingId: bookingData?.orderData?.booking?.flightBooking?.at(0),
    amount: bookingData?.orderData?.params?.offers?.at(0)?.totalAmount,
  }

  const data = {
    ...bookingData?.orderData?.booking,
    paymentData,
    link: `/orders/flight/${bookingData?.orderData?.booking?._id}`,
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
        <Link to={`/order/new/flight/book/details/${id}`}>Passenger details</Link>
        <Link to={`/order/new/flight/book/ancillaries/${id}`}>Ancillaries</Link>
        <label>Payment</label>
      </BreadCrumb>

      <div className='flex flex-col gap-6 flex-wrap-reverse md:flex-nowrap items-center justify-center my-10 self-center'>
        <div className='flex gap-3 flex-col'>
          <div className='bg-theme1/10 px-6 p-4 w-full flex flex-col justify-center gap-4 items-center'>
            <h5>Airline Commision</h5>
            <div className='flex gap-2'>
              <Icon icon='ep:success-filled' className='text-green-500' />
              <p>You qualify for a <b className='font-bold'>{formatMoney(80000)}</b> commission on this order</p>
            </div>
          </div>
          <FlightPriceCommission 
              data={offer} 
            // footer={
            //   <Link className='btn-theme rounded-md flex justify-center' to={`/order/new/flight/book/payment/${id}`}>Proceed to checkout</Link>
            // } 
          />
        </div>
        <PaymentMethod className={'w-full'} data={data} />
      </div>
    </div>
  )
}