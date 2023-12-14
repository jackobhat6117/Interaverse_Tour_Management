import { EmailOutlined, LayersOutlined, LockOutlined } from '@mui/icons-material';
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CustomLink } from './CustomLink';


export const orderLinks = [
  {to: "/settings/order/", title: '', icon: EmailOutlined,label: "Mark Up"},
  {to: "/settings/order/commission", title: 'commission', icon: LockOutlined,label: "Commision"},
  {to: "/settings/order/points", title: 'points', icon: LayersOutlined, label: "Miles Points"},
  {to: "/settings/order/suppliers", title: 'suppliers', icon: 'carbon:scis-transparent-supply', label: "Suppliers"},
]

export default function OrderNav() {
  const location = useLocation();

  let pathname = location.pathname.split("/");
  let page = pathname[pathname.length-1]

  return (
    <div className='flex flex-col gap-4 h-full'>
      <div className='hidden sm:flex gap-2 overflow-x-auto overflow-hidden w-full'>
        {orderLinks.map(({to,title,icon,label},i) => (
          <CustomLink key={i} to={to} active={!page ? title === '' : title === page} Icon={icon} label={label} />
        ))}
      </div>
      <div className='sm:hidden vector-bg text-white p-2'>
        <h3 className='capitalize text-white'>{page || 'Mark Up'}</h3>
      </div>

      <hr className='hidden sm:block mb-2' />
      <Outlet />
    </div>
  )
}