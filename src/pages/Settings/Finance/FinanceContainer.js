import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

export default function FinanceContainer() {
  const location = useLocation();

  let pathname = location.pathname.split("/");
  let page = pathname[pathname.length-1]

  return (
    <div className='flex flex-1 flex-col gap-4 w-full h-full'>
      <div className='sm:hidden vector-bg text-white p-2'>
        <h3 className='capitalize'>{page || 'Finance'}</h3>
      </div>
      <Outlet />
    </div>
  )
}
