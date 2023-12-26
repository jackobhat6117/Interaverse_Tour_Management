import React from 'react'

export default function PassengerView({data: obj,page}) {
    let data = {
        firstName: 'John',
        lastName: 'Doe',
        ...(obj || {})
    }
    
    const Detail = ({data,label}) => (
        <div className='flex flex-col gap-2'>
            <div className='bg-primary/5 rounded-md p-2 px-4'>{label}</div>
            {Object.entries(data).map(([key,value],i) => (
                <div key={i} className='flex justify-between gap-3'>
                    <p>{key}</p>
                    <div>{value}</div>
                </div>
            ))}
        </div>
    )
  return (
    <div className='flex flex-col gap-4'>
        {page !== 'confirmation' ? 
            <div className='flex gap-4 justify-between items-center'>
                <h5>Changed Passenger Details</h5>
                <small className='bg-orange-200 text-orange-600 p-1 rounded-md px-4'>Changes Detected</small>
            </div>
        :null}
        <div className='flex gap-4 justify-between'>
            <div className='flex gap-6 w-full'>
                {page !== 'confirmation' ? 
                    <div className='flex-1'>
                        <Detail data={data} label='Previous Details' />
                    </div>
                :null}
                {page !== 'confirmation' ? 
                    <div className='border h-full' />
                :null}
                <div className='flex-1'>
                    <Detail data={data} label='New Details' />
                </div>
            </div>
        </div>
    </div>
  )
}
