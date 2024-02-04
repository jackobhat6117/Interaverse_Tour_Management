import React from 'react'
import { formatMoney } from '../../../../../../../features/utils/formatMoney'

export default function BagView({data: obj,page}) {
    let priceData = {
        before: {
          totalAmount: 1000000,
        },
        after: {
          totalAmount: 1006000
        },
        totalAmount: 1006000,
        fee: 6000,
      }
    
    
  return (
    <div className='flex flex-col gap-4'>
        <PriceSummary data={priceData} />
    </div>
  )
}

function PriceSummary({data}) {
    return (
      <div className='border p-4 flex flex-col gap-2 md:min-w-[400px]'>
        <div className='flex justify-between gap-4'>
          <h6>Price Summary</h6>
          <p className='text-xs'>Sold by Turkish Airline</p>
        </div>
        <hr />
          <div className=' flex flex-col gap-2'>
            <div className='flex gap-4 justify-between font-bold'>
              <b>Add bag Amount</b>
              <div>{formatMoney(data?.before?.totalAmount)}</div>
            </div>
            {/* <div className='flex gap-4 justify-between'>
              <div>Change Fee</div>
              <div>{formatMoney(data?.fee)}</div>
            </div> */}
          </div>
        <hr />
        <div className='flex gap-4 justify-between'>
          <h6>Total pyament:</h6>
          <h6>{formatMoney(data?.totalAmount)}</h6>
        </div>
      </div>
    )
  }