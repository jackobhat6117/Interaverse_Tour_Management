import React from 'react'
import FlightInfo from '../../../FlightInfo'
import { formatMoney } from '../../../../../../../features/utils/formatMoney'


export default function FlightView({page}) {
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
  return page === 'confirmation' && (
    <div className='flex flex-col gap-4'>
        <FlightInfo />
        <PriceSummary data={priceData} />
    </div>
  )
}


function PriceSummary({data}) {
  return (
    <div className='border p-4 flex flex-col gap-6 md:min-w-[400px]'>
      <div className='flex justify-between gap-4'>
        <h5>Price Summary</h5>
        <p className='text-xs'>Sold by Turkish Airline</p>
      </div>
      <hr />
        <div className=' flex flex-col gap-2'>
          <div className='flex gap-4 justify-between font-bold'>
            <b>Before Change Amount</b>
            <div>{formatMoney(data?.before?.totalAmount)}</div>
          </div>
          <div className='flex gap-4 justify-between'>
            <div>After Change Amount</div>
            <div>{formatMoney(data?.after?.totalAmount)}</div>
          </div>
          <p className='py-2'>
            The changes you have carried out has a fee of <h6 className='inline-block'>{formatMoney(data.fee)}</h6>
          </p>
        </div>
      <hr />
      <div className='flex gap-4 justify-between'>
        <h5>Total pyament:</h5>
        <h5>{formatMoney(data?.totalAmount)}</h5>
      </div>
    </div>
  )
}