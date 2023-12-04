import React, { useState } from 'react'
import BreadCrumb from '../../../../components/DIsplay/Nav/BreadCrumb'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { decrypt } from '../../../../features/utils/crypto';
import { useDispatch, useSelector } from 'react-redux';
import FlightPriceSummary from '../../../../components/flight/FlightPriceSummary';
import FlightSegmentDisplay from '../../../../components/flight/FlightSegmentDisplay';
import RadioGroup from '../../../../components/form/RadioGroup';
import Icon from '../../../../components/HOC/Icon';
import EmailInput from '../../../../components/form/EmailInput';
import PhoneNumberInput from '../../../../components/form/PhoneNumberInput';
import PrimaryPassenger from '../../../../components/flight/PrimaryPassenger';
import Button1 from '../../../../components/form/Button1';
import Modal1 from '../../../../components/DIsplay/Modal/Modal1';
import { travelersInfo } from '../../../../data/flight/travelersInfo';
import bookFlightOffer from '../../../../controllers/Flight/bookFlightOffer';
import { setBookingData } from '../../../../redux/reducers/flight/flightBookingSlice';
import { useSnackbar } from 'notistack';
import { countries } from 'country-data';
import { clone } from '../../../../features/utils/objClone';
import moment from 'moment';


export default function FlightBookDetails() {
  const {id} = useParams();
  const qObj = JSON.parse(decrypt(id));
  const {bookingData} = useSelector(state => state.flightBooking);
  const offer = bookingData?.offer && bookingData?.offer?.at(-1)

  const navigate = useNavigate();
  
  function handleSearchRoute(i) {
    navigate('/order/new/flight/offers?q='+id+'&path='+i)
  }
  console.log(" -> ",offer)
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
        <Link to={`/order/new/flight/book/${id}`}>Review</Link>
        <b>Details</b>
      </BreadCrumb>
      <div className='flex gap-10 flex-wrap-reverse md:flex-nowrap'>
        <div className='flex flex-col gap-6 md:w-[80%]'>
          <PayTime />
          <div className='bg-theme1/10 flex items-center gap-2 p-2'>
            <Icon icon={'ic:sharp-lock'} className='w-8 h-8' />
            We take privacy issues seriously. You can be sure that your personal data is securely protected.
          </div>
          <PassengerDetails offer={offer} />
        </div>
        <div className='flex flex-col gap-4'>
          {offer?.segments.map((obj,i) => (
            <div key={i}>
              <FlightSegmentDisplay data={obj} />
            </div>
          ))}
          <FlightPriceSummary onBook data={offer} />
        </div>
      </div>
    </div>
  )
}

function PassengerDetails({offer}) {
  const {id} = useParams();
  const {bookingData} = useSelector(state => state.flightBooking);
  const segments = bookingData?.offer?.segments || [];
  const departure = segments[0]?.departureLocation;
  let arrival = segments[segments.length-1]?.arrivalLocation || segments[0]?.arrivalLocation;

  const [open,setOpen] = useState(false);
  const [bookingDone,setBookingDone] = useState(false);
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();

  const [data,setData] = useState(clone(travelersInfo));
  console.log(' data --> ',data)


  async function book() {
    // await new Promise(resolve => setTimeout(resolve,3000))
    let req = {
      supplier: offer?.supplier,
      offers: [offer],
      travelersInfo: [clone(data)]
    }
    // console.log(' --> ',data)
    let pn = data?.phone?.split('-')
    let countryObj = (Object.values(countries)?.find(obj => obj?.countryCallingCodes?.includes('+'+pn?.at(0))))
    let phone = {
      countryCode: pn?.at(0),
      number: pn?.at(1),
      location: countryObj.alpha2,
    }
    req.travelersInfo.at(0).birthData = moment(data?.birthDate).format('YYYY-MM-DD')
    req.travelersInfo.at(0).document.issuanceCountry = data?.document?.nationality
    req.travelersInfo.at(0).document.validityCountry = data?.document?.nationality
    req.travelersInfo.at(0).document.birthPlace = data?.document?.nationality
    req.travelersInfo.at(0).document.issuanceLocation = data?.document?.nationality
    req.travelersInfo.at(0).document.issuanceDate = moment().format('YYYY-MM-DD')
    req.travelersInfo.at(0).document.expiryDate = moment(data?.document?.expiryDate).format('YYYY-MM-DD')
    req.travelersInfo.at(0)['phone'] = [phone];

    // console.log(req)
    
    setLoading(true);
    const res = await bookFlightOffer(req);
    setLoading(false);
    if(res.return) {
      setBookingDone(true);
      dispatch(setBookingData({...bookingData,orderData: res?.data}))
    } else enqueueSnackbar(res.msg,{variant: 'error'})
    setOpen(false);
  }
  return (
    <div className='flex flex-col gap-6 pb-10'>
      <h5>Contact Details</h5>
      <div className='flex gap-4'>
        <div className='flex-1'>
          <EmailInput label='Enter your email'
            value={data.email}
            onChange={(ev) => setData({...data,email: ev.target.value})}          
          />
        </div>
        <div className='flex-1'>
          <PhoneNumberInput label='Enter your phone number'
            value={data.phone}
            onChange={(val) => setData({...data,phone: val})}
          />
        </div>
      </div>
      <PrimaryPassenger handleReturn={(obj) => setData({...data,...obj})} label={<div className='flex flex-1 items-center justify-between gap-4'><h5>Primary Passenger</h5><p>Adult (over 12 years)</p></div>} />
      <div className='flex justify-end self-end'>
        <Button1 variant='text' className='!font-bold'>+ Add another passenger</Button1>
      </div>
      <div className='flex justify-between gap-4'>
        <div className='flex-1'>
          <Button1 className='!w-auto !bg-primary !text-secondary'>Go back</Button1>
        </div>
        <div className='flex-1'>
          <Button1 className='' onClick={() => setOpen(true)}>Confirm booking</Button1>
        </div>
      </div>
      <Modal1 open={open} setOpen={setOpen}>
        <div className='flex flex-col'>
          <div className='flex flex-col items-center gap-4 p-10'>
            <h4>Confirm flight booking</h4>
            <p>By clicking confirm you have booked this flight for <b>{departure}</b> to <b>{arrival}</b></p>
          </div>
          {loading?(
            <h6 className='bg-theme1/10 flex items-center justify-center p-8 '>
              Please wait
            </h6>
          ):
            <div className='bg-theme1/10 flex justify-center gap-6 p-8 px-10'>
              <Button1 variant='text' onClick={() => setOpen(false)}>Go back</Button1>
              <Button1 className='sm:!p-3 sm:!px-4' onClick={book}>Confirm</Button1>
            </div>
          }
        </div>
      </Modal1>
      <Modal1 open={bookingDone} setOpen={setBookingDone}>
        <div className='flex flex-col items-center p-8 gap-6'>
          <h5>Booking was successful</h5>
          <p className='max-w-[400px] text-center'>your booking was successful. You can now add ancillaries or proceed to make payment.</p>
          <div className='flex gap-2 w-full'>
            <Link to={`/order/new/flight/book/ancillaries/${id}`} className='flex-1 text-center justify-center btn !bg-primary text-secondary'>Add Ancillaries</Link>
            <Link to={`/order/new/flight/book/payment/${id}`} className='flex-1 text-center justify-center btn-theme rounded-md'>Make Payment</Link>
          </div>
        </div>
      </Modal1>
    </div>
  )
}

function PayTime() {
  const options = [
    {value: 'paynow',label: 'Pay now','description': 'Pay now and confirm seat and baggage selection.'},
    {value: 'hold',label: 'Book on hold','description': 'Hold price and pay at a later date.'},
  ]
  return (
    <div className='flex flex-col gap-4'>
      <h5>Paying now or later?</h5>
      <p>
        Decide whether you want to pay for your trip now in its entirety, or whether you'd like to put a hold on the order,
        and pay at a later date.
        Be aware that you cannot currently select seats or baggage when holding an order.
      </p>

      <RadioGroup value='paynow' className='flex gap-4' options={options} render={(obj) => (
        <div className='flex flex-col gap-1'>
          <b>{obj.label}</b>
          <p>{obj.description}</p>
        </div>
      )} />  

    </div>
  )
}
