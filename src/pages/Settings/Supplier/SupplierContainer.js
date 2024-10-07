import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CustomLink } from '../../../components/Settings/CustomLink'



export const supplierLinks = [
  {to: "/settings/supplier/", title: '', icon: 'vaadin:cash',label: "Suppliers"},
  {to: "/settings/supplier/markup", title: 'markup', icon: 'mdi:hand-coin',label: "Mark up"},
  // {to: "/settings/supplier/payment", title: 'payment', icon: 'simple-icons:contactlesspayment', label: "Payment Method"},
  // {to: "/settings/supplier/gateway", title: 'gateway', icon: 'fluent:collections-add-20-filled', label: "Payment Gateway"},

]

const SupplierContainer = () => {

  const location  = useLocation()
  let pathname = location.pathname.split("/")
  let page = pathname[pathname.length-1]
  return (
    <div>
       <div className='flex flex-1 flex-col gap-4 w-full h-full'>
      <div className='hidden sm:flex gap-2 overflow-x-auto overflow-hidden w-full'>
        {supplierLinks.map(({to,title,icon,label},i) => (
          <CustomLink key={i} to={to} active={!page ? title === '' : title === page} Icon={icon} label={label} />
        ))}
      </div>
      <div className='sm:hidden vector-bg text-white p-2'>
        <h3 className='capitalize text-white'>{page || 'Payout'}</h3>
      </div>

      <hr className='hidden sm:block mb-2' />
      <Outlet />
    </div>
    </div>
  )
}

export default SupplierContainer
