import React from 'react'
import BreadCrumb from '../../../../components/DIsplay/Nav/BreadCrumb'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { decrypt } from '../../../../features/utils/crypto';
import SeatSelection from './SeatSelection';
import FlightPriceSummary from '../../../../components/flight/FlightPriceSummary';


export default function FlightAncillaries() {
  const {id} = useParams();
  const qObj = JSON.parse(decrypt(id));

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
        <b>Details</b>
      </BreadCrumb>

      <div className='flex gap-6 flex-wrap-reverse md:flex-nowrap'>
        <div className='flex-1'>
          <SeatSelection />
        </div>

        <FlightPriceSummary />
      </div>
    </div>
  )
}