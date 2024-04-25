import { Link, useParams } from "react-router-dom";
import { formatMoney, getNumber } from "../../features/utils/formatMoney";
import Button1 from "../form/Button1";

export default function FlightPriceSummary({data,onBook,footer}) {
  const {id} = useParams();

  let tripType = data?.segments?.length > 1 ? '' : 'One way'
  if(data?.segments?.length > 1) {
    if(data?.segments?.at(0)?.departureLocation === data?.segments?.at(-1)?.arrivalLocation)
      tripType = 'Round trip'
  }

  let total = getNumber(data?.totalAmount) || 0;
  console.log(total,data?.seatsPrice)

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
        <Button1 disabled={!data?.totalAmount} className={'btn-theme rounded-md flex justify-center '+(!data?.totalAmount ? '!cursor-not-allowed':'')} to={`/order/new/flight/book/details/${id}`}>Proceed to checkout</Button1>
      :null}
      {footer}
    </div>
  )
}
