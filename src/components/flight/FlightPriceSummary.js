import { Link, useParams } from "react-router-dom";
import { formatMoney } from "../../features/utils/formatMoney";

export default function FlightPriceSummary({data,onBook,footer}) {
  const {id} = useParams();

  let tripType = data?.segments?.length > 1 ? '' : 'One way'
  if(data?.segments?.length > 1) {
    if(data?.segments?.at(0)?.departureLocation === data?.segments?.at(-1)?.arrivalLocation)
      tripType = 'Round trip'
  }
  return (
    <div className='border p-4 flex flex-col gap-6 md:min-w-[400px]'>
      <h5>Price Summary</h5>
      <div>{tripType} flight</div>
      {Object.entries(data?.passengers || {})?.map(([key,obj],i) => 
        <div className='text-theme1 flex flex-col '>
          <div className='flex gap-4 justify-between font-bold'>
            <div>Traveler {i+1}: {key}</div>
            <div>{formatMoney(obj.totalAmount)}</div>
          </div>
          <div className='flex gap-4 justify-between'>
            <div>Flight:</div>
            <div>{formatMoney(obj.totalAmountWithoutTax)}</div>
          </div>
          <div className='flex gap-4 justify-between'>
            <div>Tax:</div>
            <div>{formatMoney(obj.taxes)}</div>
          </div>
        </div>
      )}
      <div className='flex gap-4 justify-between'>
        <h5>Trip Total:</h5>
        <h5>{formatMoney(data?.totalAmount)}</h5>
      </div>
      {!onBook ? 
        <Link className='btn-theme rounded-md flex justify-center' to={`/order/new/flight/book/details/${id}`}>Proceed to checkout</Link>
      :null}
      {footer}
    </div>
  )
}
