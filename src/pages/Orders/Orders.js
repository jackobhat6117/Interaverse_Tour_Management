import React, { useEffect, useState } from 'react'
import LearnMoreButton from '../../components/mini/LearnMoreButton'
import CreateOrder from './CreateOrder'
import OrdersData from './OrdersData'
import { CircularProgress } from '@mui/material'
import getBookings from '../../controllers/booking/getBookings'
import { templateFlightOrderData, templateOrdersData } from '../../data/order/ordersData'


const tempObj = {
  date: '22, Jan',name: 'John Doe',provider: 'gb Travels',type: ['Flight','Tour','Stay'][parseInt(Math.random()*3)],amount: 234900,
  commission: '4900',
  updatedDate: '5:30, 24/24/24',
  bookRef: parseInt(Math.random(99999)),
  status: ['confirmed','pending','on hold','cancelled','expired'][parseInt(Math.random(5))]
}

export default function Orders() {
  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    load();
  },[])

  async function load() {
    setLoading(true);
    const res = await getBookings();
    setLoading(false);
    if(res.return) {
      let data = [];
      res.data?.data?.map(obj => {
        obj?.flightBooking?.map(flightObj => 
          data.push({...obj,flightObj,type: 'Flight'})
        )
        return true;
      })
      data = data?.map(obj => templateFlightOrderData(obj))
      setData(data)
    }
  }
  

  return loading ? (
    <div className='p-6 flex-1 flex justify-center items-center'>
      <CircularProgress />
    </div>
  ): !data?.length ? (
    <div className={`pd-md flex-1 flex flex-col ${!data?.length ? 'bg-emptypage':''}`}>
      <h5>Orders</h5>
      <div className='w-full sm:flex-1 py-10 sm:py-2 flex flex-col gap-4 h-full justify-center items-center'>
        <div>You don't have any orders</div>
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
