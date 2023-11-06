import { Link, useParams } from "react-router-dom";

export default function FlightPriceSummary({onBook}) {
  const {id} = useParams();

  return (
    <div className='border p-4 flex flex-col gap-6 md:min-w-[400px]'>
      <h5>Price Summary</h5>
      <div>Round trip flight</div>
      <div className='text-theme1 flex flex-col '>
        <div className='flex gap-4 justify-between font-bold'>
          <div>Traveler One: Adult</div>
          <div>300,500</div>
        </div>
        <div className='flex gap-4 justify-between'>
          <div>Flight:</div>
          <div>200,500</div>
        </div>
        <div className='flex gap-4 justify-between'>
          <div>Tax:</div>
          <div>100,000</div>
        </div>
      </div>
      <div className='flex gap-4 justify-between'>
        <h5>Price Summary:</h5>
        <h5>601,000</h5>
      </div>
      {!onBook ? 
        <Link className='btn-theme rounded-md flex justify-center' to={`/order/new/flight/book/details/${id}`}>Proceed to checkout</Link>
      :null}
    </div>
  )
}
