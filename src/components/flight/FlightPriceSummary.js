import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { formatMoney, getNumber } from "../../features/utils/formatMoney";
import Button1 from "../form/Button1";
import rebookFlight from "../../controllers/booking/rebookFlight";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { setBookingData } from "../../redux/reducers/flight/flightBookingSlice";
import convertFlightObject from "../../features/utils/flight/flightOfferObj";
import { useState } from "react";
import Modal1 from "../DIsplay/Modal/Modal1";

export default function FlightPriceSummary({data,onBook,footer,rePrice}) {
  const {id} = useParams();
  const {bookingData} = useSelector(state => state.flightBooking);
  const [open,setOpen] = useState(false);
  const offer = bookingData?.offersPrice?.at(-1) || bookingData?.offers?.at(-1);
  const segments = offer?.segments || [];
  const [priceChanged,setPriceChanged] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const flightBookingId = searchParams.get('flightBookingId');
  const action = searchParams.get('action')

  const [loading,setLoading] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar()
  

  let urlQuery = '';

  if(action === 'rebook')
    urlQuery = `action=rebook&flightBookingId=${flightBookingId}`

  urlQuery = urlQuery ? '?'+urlQuery : '';

  let tripType = data?.segments?.length > 1 ? '' : 'One way'
  if(data?.segments?.length > 1) {
    if(data?.segments?.at(0)?.departureLocation === data?.segments?.at(-1)?.arrivalLocation)
      tripType = 'Round trip'
  }

  let total = getNumber(data?.totalAmount) || 0;
  console.log(total,data?.seatsPrice)

  async function rebook(acceptPriceChange=false) {
    const {pricingInformation} = offer; // allowed

      
    const payload = {
      flightBookingId,
      offer: offer?.orgi || offer,
      acceptPriceChange
    }
    setLoading(true);
    const res = await rebookFlight(payload)
    setLoading(false);
    if(res.return) {
      enqueueSnackbar('Booking Successful.',{variant: 'success'})
      navigate('/order')
    }
    else if(res?.code === 69 || res?.msg === 'Price Changed') {
      let data = (res.data?.map(obj => convertFlightObject(obj)) || [])
      dispatch(setBookingData({...bookingData,offersPrice: data,time: new Date().getTime()}))
      setPriceChanged({
        price: data?.at(0)?.totalAmount,
        change: data?.at(0)?.totalAmount - (getNumber(pricingInformation?.price?.totalPrice))
      })
    } 
    else {
      setPriceChanged(false);
      setOpen(false)
      enqueueSnackbar('Booking Failed! This offer might not be bookable please go back and pick a different one.', { variant: "error" });
    }
  }
  
  async function handleCheckout() {
    if(action === 'rebook')
      setOpen(true)
    else
      navigate(`/order/new/flight/book/details/${id}${urlQuery ? urlQuery : ''}`)
  }

  return (
    <div className='border p-4 flex flex-col gap-6 min-w-[200px] md:min-w-[400px]'>
      <h5>Price Summary</h5>
      <div>{tripType} flight</div>
      {Object.entries(data?.passengers || {})?.map(([key,obj],i) => 
        {
          const bagResult = data?.bagsPrice?.filter((obj) => obj?.passenger === i)?.reduce((acc,cur) => (
            {
              quantity: acc.quantity + (cur?.quantity || 0),
              price: acc?.price + (cur?.price || 0)
            }
          ),{quantity: 0, price: 0})
          const seatPrice = data?.seatsPrice?.filter((obj) => obj?.passenger === i)?.reduce((acc,cur) => (
            {
              quantity: acc.quantity + 1,
              price: (parseFloat(cur?.travelerPricing?.at(0)?.price?.total || cur?.pricing?.total?.replaceAll(',','')?.split(' ')?.at(-1)) || 0) + acc?.price
            }
          ),{quantity: 0,price: 0})
          // myfix: seat price is considered to be naira
          total += (getNumber(bagResult?.price) || 0) + (seatPrice?.price || 0)
          console.log(total)
          let travelerTotal = (getNumber(obj?.totalAmount) || 0) + getNumber(bagResult?.price || 0) + (seatPrice?.price || 0);
          return (
            <div className='text-theme1 flex flex-col ' key={i}>
              <div className='flex gap-4 justify-between font-bold'>
                <div>Traveler {i+1}: {key}</div>
                <div>{formatMoney(travelerTotal)}</div>
              </div>
              <div className='flex gap-4 justify-between'>
                <div>Flight:</div>
                <div>{formatMoney(obj.totalAmountWithoutTax)}</div>
              </div>
              <div className='flex gap-4 justify-between'>
                <div>Tax:</div>
                <div>{formatMoney(obj.taxes)}</div>
              </div>
              {bagResult?.quantity ? 
                <div className="flex gap-4 justify-between">
                  <div>Bags ({bagResult?.quantity}x)</div>
                  <div>{formatMoney(bagResult?.price)}</div>
                </div>
              :null}
              {seatPrice?.quantity ? 
                <div className="flex gap-4 justify-between">
                  <div>Seats ({seatPrice?.quantity}x)</div>
                  <div>{formatMoney(seatPrice?.price)}</div>
                </div>
              :null}
            </div>
          )
        }
      )}
      <div className='flex gap-4 justify-between'>
        <h5>Trip Total:</h5>
        <h5>{formatMoney(total)}</h5>
      </div>
      {!onBook ? 
        <Button1 disabled={!data?.totalAmount} className={'btn-theme rounded-md flex justify-center '+(!data?.totalAmount ? '!cursor-not-allowed':'')} 
          onClick={handleCheckout}>Proceed to checkout</Button1>
      :null}
      {footer}

      <Modal1 open={open} setOpen={setOpen}>
        <div className="flex flex-col max-w-[560px]">
          <div className="flex flex-col items-center gap-4 p-10">
            <h4>Confirm Rebooking</h4>
            <p>
              By clicking on the confirm button below, I acknowledge that I have reviewed and accept the privacy policy, terms of use and fare rules for this flight:{" "}
              {segments.map(obj => obj.departureLocation + ' to ' + obj?.arrivalLocation)?.join('. ')}
            </p>
          </div>
          {loading ? (
            <h6 className="bg-theme1/10 flex items-center justify-center p-8 ">
              Please wait
            </h6>
          ) : (
            <div className="bg-theme1/10 flex justify-center gap-6 p-8 px-10">
              <Button1 variant="text" onClick={() => setOpen(false)}>
                Cancel
              </Button1>
              <Button1 type='submit' className="sm:!p-3 sm:!px-4" onClick={() => rebook()}>
                Confirm
              </Button1>
            </div>
          )}
        </div>
      </Modal1>

      <Modal1 open={priceChanged} setOpen={() => {setPriceChanged(false);rePrice && rePrice()}}>
        <div className="self-center max-w-[500px] ">
          <div className='card p-8 pt-4 m-2 rounded-md flex flex-col'>
            {/* <h4 className='py-2'>You have been gone for too long.</h4> */}
            <h5 className='py-2 self-center'>Price Change</h5>
            {/* <p> The flight offer may have changed. Click the button to get the latest price.</p> */}
            <div className="text-primary/60">There has been a price change by :  
              <b className={`inline-block p-1 ${priceChanged?.change < 0 ? 'text-green-500':'text-red-400'}`}>{priceChanged?.change < 0 ? '-':'+'} {formatMoney(Math.abs(priceChanged?.change))}</b>
            </div>
            <p>
              The updated price is <b className="font-bold text-primary">{formatMoney(priceChanged?.price)}.</b>
            </p>
            <p>
              Do you want to continue or pick a different offer
            </p>
            <br />
            <div className='flex  flex-wrap justify-between gap-4'>
              <Button1 className='!w-auto self-end' variant='outlined' onClick={() => navigate('/order/new/flight')}><span className='hidden sm:inline-block pr-1'>New</span> Offer</Button1>
              {/* <Button1 className='btn1 !w-auto self-end' onClick={() => (getPrice && getPrice()) || window.location.reload()}>Refresh</Button1> */}
              <Button1 loading={loading} className='btn1 !w-auto self-end' onClick={() => rebook(true)}>Continue</Button1>
            </div>
          </div>
        </div>
      </Modal1>

    </div>
  )
}
