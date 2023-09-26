import { ArrowBack, Menu, PersonOutlined, Settings } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Code, EmailOutlined, GroupsOutlined, LayersOutlined, LockOutlined, SettingsOutlined } from '@mui/icons-material'


export default function SettingSideBar() {
  const location = useLocation();

  let pathname = location.pathname.split("/");
  let page = pathname[pathname.length-1]
  // pathname = (pathname[-1])?.toLowerCase();

  console.log(page)

  return (
    <div className='flex flex-col sm:flex-row bg-secondary min-h-screen !min-w-screen'>
      <Sidebar />
      <div className='sm:light-bg p-4 rounded-xl flex-1 sm:m-4 flex flex-col gap-4'>
        <div className='hidden sm:flex flex-wrap gap-2 overflow-x-auto w-full'>
          <Link to="/settings/"> <Button className={`${!page ? 'btn-theme' : 'btn-theme-light'} `}><SettingsOutlined className={`${!page ? 'text-secondary/80' : ''} `} fontSize='small' /> Preference</Button></Link>
          <Link to="/settings/team"> <Button className={`${page === 'team' ? 'btn-theme':'btn-theme-light'}`}><GroupsOutlined className={`${page === 'team' ? 'text-secondary/80' : ''} `} fontSize='small' /> Team Members</Button></Link>
          <Link to="/settings/contact"> <Button className={`${page === 'contact' ? 'btn-theme':'btn-theme-light'}`}><EmailOutlined className={`${page === 'contact' ? 'text-secondary/80' : ''} `} fontSize='small' /> Contact Emails</Button></Link>
          <Link to="/settings/security"> <Button className={`${page === 'security' ? 'btn-theme':'btn-theme-light'}`}><LockOutlined className={`${page === 'security' ? 'text-secondary/80' : ''} `} fontSize='small' /> Security</Button></Link>
          <Link to="/settings/#"> <Button className={`${page === 'balance' ? 'btn-theme':'btn-theme-light'}`}><LayersOutlined className={`${page === 'balance' ? 'text-secondary/80' : ''} `} fontSize='small' /> Balance</Button></Link>
          <Link to="/settings/#"> <Button className={`${page === 'developer' ? 'btn-theme':'btn-theme-light'}`}><Code className={`${page === 'developer' ? 'text-secondary/80' : ''} `} fontSize='small' /> Developers</Button></Link>
        </div>
        <div className='sm:hidden vector-bg text-white p-2'>
          <h3>Preference</h3>
        </div>

        <hr className='border-primary/20' />

        <Outlet />
      </div>
    </div>
  )
}


function Sidebar() {
  return (
    <div className=''>
      <div className='p-4 hidden sm:flex flex-col whitespace-nowrap'>
        <div className='flex gap-1 py-4 mb-4'>
          <ArrowBack /> Go back
        </div>
        <Link to='/' className='flex gap-2 font-bold p-2 px-4 btn'>
          <Settings />
          Settings</Link>
        <Link to='/' className='flex gap-2 font-bold p-2 px-4 '>
          <PersonOutlined />
          Agency Setup</Link>
      </div>

      {/* Mobile view */}
      <div className='sm:hidden bg-black text-white'>
        <div className='flex md:hidden justify-between items-center bg-opacity-40 gap-6 bg-theme1 text-white py-4 px-md'>
          <h4>Miles</h4>
          <Menu />
        </div>
      </div>
    </div>
  )
}