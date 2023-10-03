import { Code, EmailOutlined, GroupsOutlined, LayersOutlined, LockOutlined, SettingsOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function AccountSetupNav() {
  const location = useLocation();

  let pathname = location.pathname.split("/");
  let page = pathname[pathname.length-1]

  console.log('page: ',page)

  return (
    <div className='flex flex-col gap-4'>
      <div className='hidden sm:flex gap-2 overflow-x-auto overflow-hidden w-full'>
        <Link to="/settings/agency/"> <Button className={`${!page || page === '' || (page === 'agency') ? 'btn-theme' : 'btn-theme-light'}  whitespace-nowrap`}><SettingsOutlined className={`${!page || (page === 'agency') ? 'text-secondary/80' : ''} `} fontSize='small' /> Account</Button></Link>
        <Link to="/settings/agency/setup"> <Button className={`${page === 'setup' ? 'btn-theme':'btn-theme-light'} whitespace-nowrap`}><GroupsOutlined className={`${page === 'setup' ? 'text-secondary/80' : ''} `} fontSize='small' /> Agency Setup</Button></Link>
        <Link to="/settings/agency/markup"> <Button className={`${page === 'markup' ? 'btn-theme':'btn-theme-light'} whitespace-nowrap`}><EmailOutlined className={`${page === 'markup' ? 'text-secondary/80' : ''} `} fontSize='small' /> Mark up</Button></Link>
        <Link to="/settings/agency/commission"> <Button className={`${page === 'commission' ? 'btn-theme':'btn-theme-light'} whitespace-nowrap`}><LockOutlined className={`${page === 'commission' ? 'text-secondary/80' : ''} `} fontSize='small' /> Commission</Button></Link>
        <Link to="/settings/agency/balance"> <Button className={`${page === 'balance' ? 'btn-theme':'btn-theme-light'} whitespace-nowrap`}><LayersOutlined className={`${page === 'balance' ? 'text-secondary/80' : ''} `} fontSize='small' /> Miles Points</Button></Link>
        <Link to="/settings/agency/developer"> <Button className={`${page === 'developer' ? 'btn-theme':'btn-theme-light'} whitespace-nowrap`}><Code className={`${page === 'developer' ? 'text-secondary/80' : ''} `} fontSize='small' /> Payment</Button></Link>
      </div>
      <div className='sm:hidden vector-bg text-white p-2'>
        <h3 className='capitalize'>{page || 'Account'}</h3>
      </div>

      <hr className='hidden sm:block' />
      <Outlet />
    </div>
  )
}
