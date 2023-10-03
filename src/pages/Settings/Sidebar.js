import { ArrowBack, Menu, PersonOutlined, Settings } from '@mui/icons-material';
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';
import CustomMenu from '../../components/utils/CustomMenu';
import Button1 from '../../components/forms/Button1';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/userSlice';


export default function SettingSideBar() {
  return (
    <div className='flex flex-col sm:flex-row bg-secondary min-h-screen !min-w-screen'>
      <Sidebar />
      <div className='sm:light-bg p-4 rounded-xl flex-1 sm:m-4 flex flex-col gap-4 overflow-hidden'>
        <Outlet />
      </div>
    </div>
  )
}


function Sidebar() {
  const location = useLocation();

  let pathname = location.pathname;
  let page = 'settings';
  if(pathname.includes('settings/agency'))
    page = 'agency';

  const activeClass = 'bg-primary/20 rounded-lg text-primary/70';
  // pathname = (pathname[-1])?.toLowerCase();

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout())
  }

  return (
    <div className=''>
      <div className='p-4 hidden sm:flex flex-col gap-3 whitespace-nowrap'>
        <div className='flex gap-1 py-4 mb-2'>
          <Link to="/">
            <ArrowBack /> Go back
          </Link>
        </div>
        <Link to='/settings/' className={`flex gap-2 font-bold p-2 px-4 ${(page === '' || page === 'settings') ? activeClass:''} `}>
          <Settings className='text-primary/50' />
          Settings</Link>
        <Link to='/settings/agency' className={`flex gap-2 font-bold p-2 px-4 ${page === 'agency' ? activeClass:''} `}>
          <PersonOutlined className='text-primary/50' />
          Agency Setup</Link>
      </div>

      {/* Mobile view */}
      <div className='sm:hidden bg-black text-white'>
        <div className='flex md:hidden justify-between items-center bg-opacity-40 gap-6 bg-theme1 text-white py-4 px-md'>
          <Link to="/"><h4>Miles</h4></Link>
          <CustomMenu element={
              <div className='rounded-md bg-primary/10 w-7 h-7 text-center flex-center justify-center'>
                <Menu className='cursor-pointer' />
              </div>
            }>
              <div className='shadow-md border bg-secondary flex flex-col items-end'>
                <Link className='btn-theme-light text-end' variant='text' to='/'>Dashboard</Link>
                <Button1 onClick={handleLogout} variant={'text'} className='text-primary !w-auto'>Logout</Button1>
              </div>
          </CustomMenu>
        </div>
      </div>
    </div>
  )
}