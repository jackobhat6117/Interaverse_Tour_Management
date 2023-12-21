import { def } from "../../../../config"
import { formatMoney } from "../../../../features/utils/formatMoney"

export default function PriceSummary() {
    let data = {
      passengers: {
        adult: {
          totalAmount: 0,
          totalAmountWithoutTax: 0,
          taxes: 0
        }
      },
      totalAmount: 0
    }
    return (
      <div className='border p-4 flex flex-col gap-6 md:min-w-[400px]'>
        <div className='flex justify-between gap-4'>
          <h5>Price Summary</h5>
          <p className='text-xs'>Sold by Turkish Airline</p>
        </div>
        <hr />
        {Object.entries(data?.passengers || {})?.map(([key,obj],i) => 
          <div className=' flex flex-col '>
            <div className='flex gap-4 justify-between font-bold'>
              <div>Traveler {i+1}: {key}</div>
              <div>{formatMoney(obj.totalAmount)}</div>
            </div>
            <div className='flex gap-4 justify-between'>
              <div>Flight:</div>
              <div>{formatMoney(obj.totalAmountWithoutTax)}</div>
            </div>
            <div className='flex gap-4 justify-between'>
              <div>Checked Luggage:</div>
              <div>{formatMoney(obj.totalAmountWithoutTax)}</div>
            </div>
            <div className='flex gap-4 justify-between'>
              <div>Seat Selection:</div>
              <div>{formatMoney(obj.totalAmountWithoutTax)}</div>
            </div>
            <div className='flex gap-4 justify-between'>
              <div>Taxes and fees:</div>
              <div>{formatMoney(obj.taxes)}</div>
            </div>
          </div>
        )}
        <hr />
        <div className='flex gap-4 justify-between'>
          <h5>Trip Total ({def.currencyCode}):</h5>
          <h5>{formatMoney(data?.totalAmount)}</h5>
        </div>
      </div>
  
    )
  }
  