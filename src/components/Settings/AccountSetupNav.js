import { Code, EmailOutlined } from '@mui/icons-material';
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CustomLink } from './CustomLink';


export const accountSetupLinks = [
  {to: "/settings/agency/", title: '', icon: 'teenyicons:briefcase-solid',label:"Information"},
  {to: "/settings/agency/brand", title: 'brand', icon: 'material-symbols:branding-watermark', label: "Brand"},
  {to: "/settings/agency/contact", title: 'contact', icon: EmailOutlined,label: "Contact Emails"},
  {to: "/settings/agency/developer", title: 'developer', icon: Code, label: "Developers"},

  // {to: "/settings/agency/markup", title: 'markup', icon: EmailOutlined,label: "Mark Up"},
  // {to: "/settings/agency/commission", title: 'commission', icon: LockOutlined,label: "Commision"},
  // {to: "/settings/agency/points", title: 'points', icon: LayersOutlined, label: "Miles Points"},
  // {to: "/settings/agency/payment", title: 'payment', icon: Code, label: "Payment"},
]

export default function AccountSetupNav() {
  const location = useLocation();

  let pathname = location.pathname.split("/");
  let page = pathname[pathname.length-1]

  return (
    <div className='flex flex-col gap-4 h-full'>
      <div className='hidden sm:flex gap-2 overflow-x-auto overflow-hidden w-full'>
        {accountSetupLinks.map(({to,title,icon,label},i) => (
          <CustomLink key={i} to={to} active={!page ? title === '' : title === page} Icon={icon} label={label} />
        ))}
      </div>
      <div className='sm:hidden vector-bg text-white p-2'>
        <h3 className='capitalize text-white'>{page || 'Information'}</h3>
      </div>

      <hr className='hidden sm:block mb-2' />
      <Outlet />
    </div>
  )
}