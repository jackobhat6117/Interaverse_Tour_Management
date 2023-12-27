import React, { useState } from 'react'
import BreadCrumb from '../../../../components/DIsplay/Nav/BreadCrumb'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { decrypt } from '../../../../features/utils/crypto';
import SeatSelection from './SeatSelection';
import FlightPriceSummary from '../../../../components/flight/FlightPriceSummary';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingData } from '../../../../redux/reducers/flight/flightBookingSlice';
import Button1 from '../../../../components/form/Button1';
import bookFlightOffer from '../../../../controllers/Flight/bookFlightOffer';
import { useSnackbar } from 'notistack';
import { clone } from '../../../../features/utils/objClone';
import getFlightOfferPrice from '../../../../controllers/Flight/getOfferPrice';
import convertFlightObject from '../../../../features/utils/flight/flightOfferObj';


export default function FlightAncillaries() {
  const {id} = useParams();
  const qObj = JSON.parse(decrypt(id));
  const {bookingData} = useSelector(state => state.flightBooking);
  const offer = bookingData?.offer && bookingData?.offer?.at(-1)
  const [loading,setLoading] = useState(false);

  const {enqueueSnackbar} = useSnackbar();

  const dispatch = useDispatch();


  const navigate = useNavigate();
  
  function handleSearchRoute(i) {
    navigate('/order/new/flight/offers?q='+id+'&path='+i)
  }


  async function book() {
    let modOffer = clone(offer);
    modOffer?.directions?.map(direction => direction?.map(flight => {
      try {
        flight.additionalServices = {
          chargeableSeatNumber: flight?.selectedSeat?.at(0)?.seatNumber
        }
      } catch(ex) {console.log(ex)}
      return true;
    }))
    const priceReq = {
      supplier: offer?.supplier,
      offers: [modOffer]
    }

    setLoading(true);
    try {
      const resPrice = await getFlightOfferPrice(priceReq);
      if(resPrice.return) {
        let data = (resPrice.data.data?.map(obj => convertFlightObject(obj)) || [])
        const pricedOffer = (data)
        dispatch(setBookingData({...bookingData,offersPrice: data}))

        let passengerCount = Object.values(offer?.passengers)?.reduce((c,p) => parseInt(c.total) + parseInt(p.total))

        
        let req = {
          supplier: offer?.supplier,
          offers: pricedOffer,
          travelersInfo: bookingData?.travelersInfo
          // travelersInfo: clone(offer?.passengers)?.slice(0,passengerCount || 1)
        }
        
        // dispatch(setBookingData({...bookingData,travelersInfo: req.travelersInfo}))

        setLoading(true);
        const res = await bookFlightOffer(req);
        if(res.return) {
          // setBookingDone(true);
          dispatch(setBookingData({...bookingData,orderData: res?.data}))
          navigate(`/order/new/flight/book/payment/${id}`)
        } else enqueueSnackbar(res.msg,{variant: 'error'})
      } else enqueueSnackbar(resPrice.msg,{variant: 'error'})
    } catch(ex) {console.log(ex)}
    setLoading(false);
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
        <b>Seats</b>
      </BreadCrumb>

      <div className='flex gap-6 flex-wrap-reverse md:flex-nowrap items-start'>
        <div className='flex-1'>
          <SeatSelection offer={offer} />
        </div>

        <FlightPriceSummary onBook footer={
          <Button1 loading={loading} className='btn-theme rounded-md flex justify-center' onClick={() => book()}>Proceed to checkout</Button1>
        } data={offer} />
      </div>
    </div>
  )
}