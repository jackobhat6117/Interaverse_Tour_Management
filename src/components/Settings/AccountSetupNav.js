import { Code, EmailOutlined, GroupsOutlined, LayersOutlined, LockOutlined, SettingsOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'


export const accountSetupLinks = [
  {to: "/settings/agency/", title: '', icon: SettingsOutlined, label: "Account"},
  {to: "/settings/agency/setup", title: 'setup', icon: GroupsOutlined,label:"Agency Setup"},
  {to: "/settings/agency/markup", title: 'markup', icon: EmailOutlined,label: "Mark Up"},
  {to: "/settings/agency/commission", title: 'commission', icon: LockOutlined,label: "Commision"},
  {to: "/settings/agency/points", title: 'points', icon: LayersOutlined, label: "Miles Points"},
  {to: "/settings/agency/payment", title: 'payment', icon: Code, label: "Payment"},
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
        <h3 className='capitalize'>{page || 'Account'}</h3>
      </div>

      <hr className='hidden sm:block' />
      <Outlet />
    </div>
  )
}


function CustomLink({to,active,Icon,label}) {
  return (
    <Link to={to}> <Button className={`${active ? 'btn-theme' : 'btn-theme-light'}  whitespace-nowrap`}><Icon className={`${active ? 'text-secondary/80' : ''} `} fontSize='small' />{label}</Button></Link>
  )
}