import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../../../components/DIsplay/Nav/BreadCrumb'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { decrypt } from '../../../../features/utils/crypto';
import { useDispatch, useSelector } from 'react-redux';
import FlightPriceSummary from '../../../../components/flight/FlightPriceSummary';
import FlightSegmentDisplay from '../../../../components/flight/FlightSegmentDisplay';
import getFlightOfferPrice from '../../../../controllers/Flight/getOfferPrice';
import { clone } from '../../../../features/utils/objClone';
import convertFlightObject from '../../../../features/utils/flight/flightOfferObj';
import { setBookingData } from '../../../../redux/reducers/flight/flightBookingSlice';


export default function FlightBook() {
  const {id} = useParams();
  const qObj = JSON.parse(decrypt(id));
  const {bookingData} = useSelector(state => state.flightBooking);
  const [offer,setOffer] = useState([...Array(2)])
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();

  console.log(qObj)

  useEffect(() => {
    getPrice();
    //eslint-disable-next-line
  },[])

  async function getPrice() {
    setOffer([{segments: [{},{}]}])
    let flightOffers = bookingData.offer?.at(-1)
    // .map(obj => {
    //   let temp = clone(obj);
    //   // temp.directions = [temp.directions[0]]
    //   return temp
    // })
    const req = {
      supplier: flightOffers?.supplier,
      offers: [flightOffers]
    }
    setLoading(true);
    const res = await getFlightOfferPrice(req);
    setLoading(false);
    if(res.return) {
      console.log(res.data.data)
      let data = (res.data.data?.map(obj => convertFlightObject(obj)) || [])
      setOffer(data)
      dispatch(setBookingData({...bookingData,offersPrice: data}))
    } else setOffer(null)
  }
  console.log(' -----> ',offer)

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
          {offer ? offer?.at(0)?.segments?.map((obj,i) => (
            <div key={i}>
              <FlightSegmentDisplay data={obj} />
            </div>
          )): !loading && (
            <div className='flex flex-col justify-center items-center p-4'>
              <p>Failed getting offers price!</p>
              <button className='text-theme1' onClick={getPrice}>Reload</button>
            </div>
          )}
        </div>
        <div>
          <FlightPriceSummary data={offer?.at(0) || bookingData?.offer?.at(-1)} />
        </div>
      </div>
    </div>
  )
}
