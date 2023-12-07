import { ArrowBack, Home, Menu, Money, PersonOutlined, Settings } from '@mui/icons-material';
import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';
import Button1 from '../../components/form/Button1';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/userSlice';
import { Drawer } from '@mui/material';
import { accountLinks } from '../../components/Settings/AccountNav';
import { accountSetupLinks } from '../../components/Settings/AccountSetupNav';
import Icon from '../../components/HOC/Icon';
import { orderLinks } from '../../components/Settings/OrderNav';
import { CustomLink } from '../../components/Settings/CustomLink';
import { financeLinks } from './Finance/FinanceContainer';


export default function SettingSideBar() {
  return (
    <div className='flex flex-col sm:flex-row bg-secondary min-h-screen !min-w-screen'>
      <Sidebar />
      <div className='sm:light-bg p-4 px-6 rounded-xl flex-1 sm:m-4 sm:ml-0 flex flex-col gap-4 overflow-hidden'>
        <Outlet />
      </div>
    </div>
  )
}


function Sidebar() {
  const location = useLocation();
  const [open,setOpen] = useState(false);

  let pathname = location.pathname;
  let page = 'settings';
  if(pathname.includes('settings/agency'))
    page = 'agency';
  else if(pathname.includes('settings/order'))
    page = 'order';
  else if(pathname.includes('settings/finance'))
    page = 'finance';

  const activeClass = ' border-l-4 -translate-x-1 border-theme1';
  // pathname = (pathname[-1])?.toLowerCase();
  let pageTitle = pathname.split("/")[pathname.split("/").length-1]


  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout())
  }

  return (
    <div className=''>
      <div className='p-4 hidden sm:flex flex-col gap-3 whitespace-nowrap'>
        <div className='flex gap-1 py-4 mb-2 justify-center md:justify-start'>
          <Link to="/">
            <ArrowBack /> <span className='hidden md:inline-block'>Go back</span>
          </Link>
        </div>
        <span to='/settings/' custom-title='Settings' className={`flex gap-2 title md:title-hide font-bold p-2 px-4 border-b `}>
          {/* <Settings className='text-primary/50' /> */}
          <span className='hidden md:block'>Settings</span>
        </span>
        <Link to='/settings/' custom-title='Account' className={`flex gap-2 title md:title-hide  p-2 px-4 ${(page === '' || page === 'settings') ? activeClass:''} `}>
          {/* <PersonOutlined className='text-primary/50' /> */}
          <Icon icon='iconamoon:profile-fill' className='text-[#4A5C6B] !w-5 !h-5' />
          <span className='hidden md:block'>Account</span>
        </Link>
        <Link to='/settings/agency/' custom-title='Business' className={`flex gap-2 title md:title-hide  p-2 px-4 ${page === 'agency' ? activeClass:''} `}>
          {/* <PersonOutlined className='text-primary/50' /> */}
          <Icon icon='teenyicons:briefcase-solid' className='text-[#4A5C6B] !w-5 !h-5' />
          <span className='hidden md:block'>Business</span>
        </Link>
        <Link to='/settings/order/' custom-title='Order' className={`flex gap-2 title md:title-hide  p-2 px-4 ${page === 'order' ? activeClass:''} `}>
          {/* <PersonOutlined className='text-primary/50' /> */}
          <Icon icon='icon-park-solid:transaction' className='text-[#4A5C6B] !w-5 !h-5' />
          <span className='hidden md:block'>Order</span>
        </Link>
        <Link to='/settings/finance/' custom-title='Finance' className={`flex gap-2 title md:title-hide  p-2 px-4 ${page === 'finance' ? activeClass:''} `}>
          {/* <Money className='text-primary/50' /> */}
          <Icon icon='fa6-solid:coins' className='text-[#4A5C6B] !w-5 !h-5' />
          <span className='hidden md:block'>Finance</span>
        </Link>
      </div>

      {/* Mobile view */}
      <div className='sm:hidden bg-black text-white'>
        <div className='flex md:hidden justify-between items-center bg-opacity-40 gap-6 bg-theme1 text-white py-4 px-md'>
          <Link to="/"><h4 className='text-white'>Miles</h4></Link>
          <div className='rounded-md bg-primary/10 w-7 h-7 text-center flex-center justify-center' onClick={() => setOpen(true)}>
            <Menu className='cursor-pointer' />
          </div>
          <Drawer open={open} anchor='right' onClose={() => setOpen(false)}
            SlideProps={{className: 'min-w-[300px]'}}
          >
            <div className='w-full h-full shadow-md border bg-secondary flex flex-col gap-4 p-4 overflow-y-auto overflow-hidden'>
              {/* <Link className='btn-theme-light flex font-bold !text-primary !px-2 ' variant='text' to='/'>Home</Link> */}
              <CustomLink to={'/'} active={false} Icon={Home} label='Home' />
              <hr />
              <h5 className='px-2'>Settings</h5>
              {accountLinks.map((obj,i) => (
                <CustomLink key={i} to={obj.to} active={page === 'settings' && pageTitle === obj.title} Icon={obj.icon} label={obj.label} />
                // <Link to={obj.to} className='btm-theme-light flex gap-3 py-2 border-bx w-full justify-between'>
                //   {obj.label}
                //   {createElement(obj.icon,{className: ''})}
                // </Link>
              ))}
              <hr />
              <h5 className='px-2'>Agency Setup</h5>
              {accountSetupLinks.map((obj,i) => (
                <CustomLink key={i} to={obj.to} active={page === 'agency' && pageTitle === obj.title} Icon={obj.icon} label={obj.label} />
                // <Link to={obj.to} className='btm-theme-light flex gap-3 py-2 border-bx w-full justify-between'>
                //   {obj.label}
                //   {createElement(obj.icon,{className: ''})}
                // </Link>
              ))}
              <hr />
              <h5 className='px-2'>Order</h5>
              {orderLinks.map((obj,i) => (
                <CustomLink key={i} to={obj.to} active={page === 'order' && pageTitle === obj.title} Icon={obj.icon} label={obj.label} />
                // <Link to={obj.to} className='btm-theme-light flex gap-3 py-2 border-bx w-full justify-between'>
                //   {obj.label}
                //   {createElement(obj.icon,{className: ''})}
                // </Link>
              ))}
              <hr />
              <h5 className='px-2'>Finance</h5>
              {financeLinks.map((obj,i) => (
                <CustomLink key={i} to={obj.to} active={page === 'finance' && pageTitle === obj.title} Icon={obj.icon} label={obj.label} />
                // <Link to={obj.to} className='btm-theme-light flex gap-3 py-2 border-bx w-full justify-between'>
                //   {obj.label}
                //   {createElement(obj.icon,{className: ''})}
                // </Link>
              ))}
              <hr />
              <Button1 onClick={handleLogout} variant={'text'} className='text-primary  !w-auto '>Logout</Button1>
            </div>
          </Drawer>
          {/* <CustomMenu element={
              <div className='rounded-md bg-primary/10 w-7 h-7 text-center flex-center justify-center'>
                <Menu className='cursor-pointer' />
              </div>
            }>
              <div className='shadow-md border bg-secondary flex flex-col items-end'>
                <Link className='btn-theme-light text-end' variant='text' to='/'>Dashboard</Link>
                <Button1 onClick={handleLogout} variant={'text'} className='text-primary !w-auto'>Logout</Button1>
              </div>
          </CustomMenu> */}
        </div>
      </div>
    </div>
  )
}