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
import Icon from '../../../../components/HOC/Icon';
import Modal1 from '../../../../components/DIsplay/Modal/Modal1';
import { formatMoney } from '../../../../features/utils/formatMoney';
import Button1 from '../../../../components/form/Button1';


export default function FlightBook() {
  const {id} = useParams();
  const qObj = JSON.parse(decrypt(id));
  const {bookingData} = useSelector(state => state.flightBooking);
  const [offer,setOffer] = useState([{segments: [{},{}]}])
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();

  const [priceDiff,setPriceDiff] = useState()

  console.log(qObj)


  useEffect(() => {
    getPrice();
    //eslint-disable-next-line
  },[])

  async function getPrice() {
    setOffer([{segments: [{},{}]}])
    const length = (qObj?.originDestinations?.length)
    let flightOffers = clone(bookingData.offer?.at((length)-1)?.og || bookingData?.offer?.at(length - 1))
    bookingData.offer?.slice(0,length)?.map((obj,i) => {
      try {
        flightOffers.directions[i] = obj.directions[i];
        // flightOffers.segments[i] = obj.segments[i];
      } catch(ex) {console.log(ex)}
      return true;
    })
    // flightOffers.segments = null;
    // flightOffers.fareRules = null;

    // .map(obj => {
    //   let temp = clone(obj);
    //   // temp.directions = [temp.directions[0]]
    //   return temp
    // })
    const req = {
      supplier: flightOffers?.supplier,
      offers: [flightOffers]
    }
    if(qObj.adjustment)
      req['adjustment'] = qObj.adjustment;
    
    setLoading(true);
    const res = await getFlightOfferPrice(req);
    setLoading(false);
    if(res.return) {
      let data = (res.data.data?.map(obj => convertFlightObject(obj)) || [])
      setOffer(data)
      dispatch(setBookingData({...bookingData,offersPrice: data,time: new Date().getTime()}))
      setPriceDiff({
        price: data?.at(0)?.totalAmount,
        change: data?.at(0)?.totalAmount - bookingData?.beforePrice?.totalAmount || 0
      })
    } else setOffer(null)
  }

  const navigate = useNavigate();
  
  function handleSearchRoute(i) {
    navigate('/order/new/flight/offers?q='+id+'&path='+i)
  }

  return (
    <div className='pd-md py-4 flex flex-col gap-4'>
      <div className='whitespace-nowrap pb-2 max-w-full overflow-x-auto'>
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
      </div>
      <div className='flex flex-wrap-reverse gap-4 max-w-full '>
        <div className='flex flex-col gap-2 flex-1'>
          {offer ? offer?.at(0)?.segments?.map((obj,i) => (
            <div key={i}>
              <FlightSegmentDisplay changeRoute={() => handleSearchRoute(i)} data={obj} />
            </div>
          )): !loading && (
            <div className='flex flex-col justify-center items-center p-4'>
              <p>This offer is not bookable!</p>
              <button className='text-theme1' onClick={() => handleSearchRoute(0)}>Please select another flight</button>
              {/* <button className='text-theme1' onClick={getPrice}>Reload</button> */}
            </div>
          )}

          <div className='flex flex-col gap-3 border rounded-md p-4'>
            <div className='flex gap-3 items-center'>
              <div>
                <Icon icon='material-symbols:event-seat' className='w-5 h-5' />
              </div>
              <div className='flex flex-col justify-between'>
                <h5>Seats</h5>
                <div>Seat choice for a fee</div>
              </div>
            </div>
            <div className='ml-5'>You can select your choice seat for a fee while booking this flight</div>
          </div>

          <div className='flex flex-col gap-3 border rounded-md p-4'>
            <div className='flex gap-3 items-center'>
              <div>
                <Icon icon='bi:luggage-fill' className='w-5 h-5' />
              </div>
              <div className='flex flex-col justify-between gap-2'>
                <h5>Bags</h5>
                <ul className='flex flex-col gap-2'>
                  {[
                    {label:"Carry-on bag included"},
                    {label:"1st checked bag included"},
                  ].map((list,i) => (
                    <li key={i} className='flex gap-1'><Icon icon='mdi:tick' className='text-green-700 p-1 w-3 h-3' /> {list.label}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='ml-5'>Additional bags for this flight can be added while booking this flight</div>
          </div>
        </div>
        <div className='flex-1 '>
          <FlightPriceSummary data={offer?.at(0)} />
        </div>
      </div>
      <Modal1 open={priceDiff && priceDiff?.change} setOpen={setPriceDiff}>
        {/* <div className='card p-6 flex flex-col items-center gap-4 w-[600px] max-w-full'>
          <h4>Price Change</h4>
          <div>
            <p>
              The price of the selected flight has changed by <b className='font-bold text-primary'>{priceDiff < 0 ? '-':'+'}{formatMoney(Math.abs(priceDiff))}</b>.
            </p>
            <p>Do you want to continue with this flight offer or change?</p>
          </div>
          <div className='flex gap-5 w-full'>
            <Button1 className='!bg-primary !text-secondary' onClick={() => handleSearchRoute(0)}>No, Change</Button1>
            <Button1 className='primary' onClick={() => setPriceDiff()}>Yes, Continue</Button1>
          </div>
        </div> */}
        <div className='card p-8 pt-4 m-2 rounded-md flex flex-col'>
            {/* <h4 className='py-2'>You have been gone for too long.</h4> */}
            <h5 className='py-2 self-center'>Price Change</h5>
            {/* <p> The flight offer may have changed. Click the button to get the latest price.</p> */}
            <div className="text-primary/60">There has been a price change by :  
              <b className={`inline-block p-1 ${priceDiff?.change < 0 ? 'text-green-500':'text-red-400'}`}>{priceDiff?.change < 0 ? '-':'+'} {formatMoney(Math.abs(priceDiff?.change))}</b>
            </div>
            <p>
              The updated price is <b className="font-bold text-primary">{formatMoney(priceDiff?.price)}.</b>
            </p>
            <p>
              Do you want to continue or pick a different offer
            </p>
            <br />
            <div className='flex gap-5 w-full'>
              <Button1 className='!bg-primary !text-secondary' onClick={() => handleSearchRoute(0)}>No, Change</Button1>
              <Button1 className='primary' onClick={() => setPriceDiff()}>Yes, Continue</Button1>
            </div>
          </div>

      </Modal1>
    </div>
  )
}
