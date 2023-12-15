import { formatMoney } from "../../features/utils/formatMoney";
import Checkbox from "../form/Checkbox";


export default function FlightPriceCommission({data}) {
  // let tripType = data?.segments?.length > 1 ? '' : 'One way'
  // if(data?.segments?.length > 1) {
  //   if(data?.segments?.at(0)?.departureLocation === data?.segments?.at(-1)?.arrivalLocation)
  //     tripType = 'Round trip'
  // }
  return (
    <div className='border p-4 flex flex-col gap-4 md:min-w-[400px]'>
      <div className="border-b pb-3 flex justify-between items-center gap-4">
        <h6>Price Summary</h6>
        <p>Amount</p>
      </div>
      {/* <div>{tripType} flight</div> */}
      <div className='flex flex-col '>
        <div className='flex gap-4 justify-between font-bold'>
          <h6>Order total:</h6>
          <b>{formatMoney(10000)}</b>
        </div>
        <div className='flex gap-4 justify-between'>
          <span>Flight:</span>
          <span>{formatMoney(8000)}</span>
        </div>
        <div className='flex gap-4 justify-between'>
          <span>Tax:</span>
          <span>{formatMoney(1000)}</span>
        </div>
        <div className='flex gap-4 justify-between'>
          <span>Commision:</span>
          <span>+{formatMoney(500)}</span>
        </div>
        <div className='flex gap-4 justify-between'>
          <span>Ticketing Fee:</span>
          <span>-{formatMoney(300)}</span>
        </div>
      </div>
      <hr />
      <div className="flex gap-6 justify-between ">
        <div className="flex flex-wrap gap-2 items-center">
          <h6>Claim commission </h6>
          <small>(Deduct commission from payable)</small>
        </div>
        <Checkbox />
      </div>
      <hr />
      {/* {Object.entries(data?.passengers || {})?.map(([key,obj],i) => 
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
      )} */}
      <div className='flex gap-4 justify-between'>
        <h5>Payable due:</h5>
        <h5>{formatMoney(data?.totalAmount)}</h5>
      </div>
    </div>
  )
}
