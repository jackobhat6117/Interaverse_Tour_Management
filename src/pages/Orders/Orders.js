import React, { useState } from 'react'
import LearnMoreButton from '../../components/mini/LearnMoreButton'
import CreateOrder from './CreateOrder'
import OrdersData from './OrdersData'


const tempObj = {
  date: '22, Jan',name: 'John Doe',provider: 'gb Travels',type: ['Flight','Tour','Stay'][parseInt(Math.random()*3)],amount: 234900,
  commission: '4900',
  updatedDate: '5:30, 24/24/24',
  bookRef: parseInt(Math.random(99999)),
  status: ['confirmed','pending','on hold','cancelled','expired'][parseInt(Math.random(5))]
}

export default function Orders() {
  const [data,setData] = useState([]);

  return !data?.length ? (
    <div className={`pd-md flex-1 flex flex-col ${!data?.length ? 'bg-emptypage':''}`}>
      <h5>Orders</h5>
      <div className='w-full h-full sm:flex-1 py-10 sm:py-2 flex flex-col gap-4 h-full justify-center items-center'>
        <h4>You don't have any orders</h4>
        <div className='flex flex-col sm:flex-row gap-2 w-full sm:w-auto'>
          <LearnMoreButton label='Learn how to create order' />
          <CreateOrder handleReturn={() => setData([...data,tempObj])} />
        </div>
      </div>
    </div>


  ) : ( // data table list
    <OrdersData data={data} setData={setData} />
  )
}
