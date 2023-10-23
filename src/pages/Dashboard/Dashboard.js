import React from 'react'
import RevenuAnalytics from './RevenuAnalytics'
import { useSelector } from 'react-redux'
import Button1 from '../../components/forms/Button1'


export default function Dashboard() {
  const {user} = useSelector(state => state.user.userData)
  return (
    <div className='pd-md flex flex-col gap-4 mb-16 '>
      <div className='flex gap-6 flex-wrap '>
        <div className='flex gap-1 whitespace-nowrap'>
          Welcome back,
          <b>{user?.firstName} {user?.lastName}</b>
        </div>
        <div className='flex-1 flex flex-wrap md:flex-nowrap gap-4 justify-end'>
          <Button1 className='btn-theme1 whitespace-nowrap flex-1 md:flex-none !w-auto !p-4 !px-6 ' to="/">Create a new order</Button1>
          {/* <Link className='btn whitespace-nowrap flex-1 md:flex-none' to="/">View orders needing review</Link>
          <Link className='btn whitespace-nowrap flex-1 md:flex-none' to="/">View pending orders</Link> */}
        </div>
      </div>
      <RevenuAnalytics />
    </div>
  )
}
