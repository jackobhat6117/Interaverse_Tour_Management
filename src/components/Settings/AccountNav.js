import { Code, EmailOutlined, GroupsOutlined, LayersOutlined, LockOutlined, SettingsOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { CustomLink } from './CustomLink';

export const accountLinks = [
  {to: "/settings/", title: '', icon: SettingsOutlined, label: "Account"},
  {to: "/settings/security", title: 'security', icon: LockOutlined,label: "Security"},
  {to: "/settings/team", title: 'team', icon: GroupsOutlined,label:"Team Members"},
  // {to: "/settings/contact", title: 'contact', icon: EmailOutlined,label: "Contact Emails"},
  // {to: "/settings/balance", title: 'balance', icon: LayersOutlined, label: "Balance"},
  // {to: "/settings/developer", title: 'developer', icon: Code, label: "Developers"},
]
export default function AccountNav() {
  const location = useLocation();

  let pathname = location.pathname.split("/");
  let page = pathname[pathname.length-1]
  // console.log('page: ',page)

  return (
    <div className='flex flex-col gap-4 w-full h-full'>
      <div className='hidden sm:flex gap-2 overflow-x-auto overflow-hidden w-full'>
        {accountLinks.map(({to,title,icon,label},i) => (
          <CustomLink key={i} to={to} active={!page ? title === '' : title === page} Icon={icon} label={label} />
        ))}
        {/* <Link to="/settings/"> <Button className={`${!page ? 'btn-theme' : 'btn-theme-light'}  whitespace-nowrap`}><SettingsOutlined className={`${!page || (page==='') ? 'text-secondary/80' : ''} `} fontSize='small' /> Preference</Button></Link>
        <Link to="/settings/team"> <Button className={`${page === 'team' ? 'btn-theme':'btn-theme-light'} whitespace-nowrap`}><GroupsOutlined className={`${page === 'team' ? 'text-secondary/80' : ''} `} fontSize='small' /> Team Members</Button></Link>
        <Link to="/settings/contact"> <Button className={`${page === 'contact' ? 'btn-theme':'btn-theme-light'} whitespace-nowrap`}><EmailOutlined className={`${page === 'contact' ? 'text-secondary/80' : ''} `} fontSize='small' /> Contact Emails</Button></Link>
        <Link to="/settings/security"> <Button className={`${page === 'security' ? 'btn-theme':'btn-theme-light'} whitespace-nowrap`}><LockOutlined className={`${page === 'security' ? 'text-secondary/80' : ''} `} fontSize='small' /> Security</Button></Link>
        <Link to="/settings/balance"> <Button className={`${page === 'balance' ? 'btn-theme':'btn-theme-light'} whitespace-nowrap`}><LayersOutlined className={`${page === 'balance' ? 'text-secondary/80' : ''} `} fontSize='small' /> Balance</Button></Link>
        <Link to="/settings/developer"> <Button className={`${page === 'developer' ? 'btn-theme':'btn-theme-light'} whitespace-nowrap`}><Code className={`${page === 'developer' ? 'text-secondary/80' : ''} `} fontSize='small' /> Developers</Button></Link> */}
      </div>
      <div className='sm:hidden vector-bg text-white p-2'>
        <h3 className='capitalize text-white'>{page || 'Account'}</h3>
      </div>
      <hr className='hidden sm:block mb-2' />

      <Outlet />
    </div>
  )
}
