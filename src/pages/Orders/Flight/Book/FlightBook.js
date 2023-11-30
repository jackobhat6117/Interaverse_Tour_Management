import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../../../components/DIsplay/Nav/BreadCrumb'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { decrypt } from '../../../../features/utils/crypto';
import { useSelector } from 'react-redux';
import FlightPriceSummary from '../../../../components/flight/FlightPriceSummary';
import FlightSegmentDisplay from '../../../../components/flight/FlightSegmentDisplay';
import getFlightOfferPrice from '../../../../controllers/Flight/getOfferPrice';
import { clone } from '../../../../features/utils/objClone';


export default function FlightBook() {
  const {id} = useParams();
  const qObj = JSON.parse(decrypt(id));
  const {bookingData} = useSelector(state => state.flightBooking);
  const [offer,setOffer] = useState({segments: [...Array(2)]})

  console.log(qObj)

  useEffect(() => {
    getPrice();
  },[])

  async function getPrice() {
    let flightOffers = bookingData.offer?.map(obj => {
      let temp = clone(obj);
      // temp.directions = [temp.directions[0]]
      return temp
    })
    const req = {
      supplier: flightOffers?.at(0)?.supplier,
      flightOffers
    }
    const res = await getFlightOfferPrice(req);
    if(res.return) {

    } else setOffer(null)
    console.log(res)
    setOffer()
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
          {offer ? offer?.segments?.map((obj,i) => (
            <div key={i}>
              <FlightSegmentDisplay data={obj} />
            </div>
          )):(
            <div className='flex flex-col justify-center items-center p-4'>
              <p>Failed getting offers price!</p>
              <button className='text-theme1' onClick={getPrice}>Reload</button>
            </div>
          )}
        </div>
        <div>
          <FlightPriceSummary />
        </div>
      </div>
    </div>
  )
}
