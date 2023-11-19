import React, { useState } from 'react'
import logo from '../assets/icons/textlogo.png';
import SearchInput from './form/SearchInput';
import { Drawer, FormControlLabel } from '@mui/material';
import { Close, Home, Menu, Notifications, Person, Settings } from '@mui/icons-material';
import CustomMenu from './utils/CustomMenu';
import moment from 'moment/moment';
import Button1 from './form/Button1';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/userSlice';
import { Link } from 'react-router-dom';
import IOSSwitch from './form/IOSSwitch';



const colors = [
  '#1E61DC','#D9A513','#1EA994','#1E61DC','#B52026'
]

export default function Header() {
  const dispatch = useDispatch();
  const [open,setOpen] = useState(false);
  const notifications = [
    {date: '9/19/2023',title: 'Complete the quick start tutorial',description: 'This tutorial shows you how easy and fast it is to start selling flights with Miles'},
    {date: '9/10/2023',title: 'View our guides',description: 'Visit our guide section to learn more about the Miles API, and start building your integration'},
    {date: '9/10/2023',title: 'View our guides',description: 'Visit our guide section to learn more about the Miles API, and start building your integration'},
    {date: '9/10/2023',title: 'View our guides',description: 'Visit our guide section to learn more about the Miles API, and start building your integration'},
  ]

  function handleLogout() {
    dispatch(logout())
  }
  return (
    <div>
      <div className='hidden md:flex items-center gap-10 px-md py-2'>
      <Link to='/'>
        <img src={logo} alt='Miles' />
      </Link>
      <div className='flex-1 z-[90]'>
        <SearchInput exampleview={true} searchview={true} />
      </div>
      <div className='flex gap-3 items-center text-primary/50'>
        <b>Test mode</b>
        <FormControlLabel
          control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
        />

        {/* Account Menu */}
        <CustomMenu element={
          <div className='rounded-md bg-primary/10 w-7 h-7 text-center flex-center justify-center'>
            <Notifications className='!text-base'/>
          </div>
        }>
          <div className='min-w-[40vw] max-w-[800px] shadow-md border'>
            <div className='flex justify-between items-center gap-4 p-2 px-4 bg-secondary/70 ' style={{backdropFilter: 'blur(8px)'}}>
              Notifications
              <small>Last updated: 2hrs ago</small>
            </div>
            <div className='p-4 bg-secondary flex flex-col gap-2 overflow-y-auto max-h-[80vh]'>
              {notifications.map((obj,i) => {
                const currentDate = moment();
                const objDate = moment(new Date(obj.date));
                const formattedDate = objDate.isSame(currentDate, 'day')
                  ? 'Today'
                  : objDate.isSame(currentDate.clone().subtract(1, 'day'), 'day')
                  ? 'Yesterday'
                  : objDate.format('DD/MM/YYYY');

                return (
                <div className={`relative bg-primary/10 p-4 rounded-r-lg border-l-[15px] `} style={{borderColor: colors[i%(colors.length-1)]}} key={i}>
                  <Close className='absolute top-0 right-0 m-3 cursor-pointer' />
                  <b className='text-primary/50'>
                    {formattedDate}
                  </b>
                  <h5>{obj.title}</h5>
                  <p>{obj.description}</p>
                </div>
               )
              })}
            </div>
          </div>
        </CustomMenu>

        <CustomMenu element={
          <div className='rounded-md bg-primary/10 w-7 h-7 text-center flex-center justify-center'>
            <Person className='!text-base' />
          </div>
        }>
          <div className='shadow-md border bg-secondary flex flex-col gap-1'>
            <Link className='btn-theme-light text-end' variant='text' to='/settings/'>Settings</Link>
            <Button1 onClick={handleLogout} variant={'text'} className='text-primary'>Logout</Button1>
          </div>
        </CustomMenu>
      </div>
      </div>

      {/* Mobile View */}
      <div className='bg-black'>
        <div className='flex md:hidden justify-between items-center bg-opacity-40 gap-6 bg-theme1 text-white py-4 px-md'>
          <h4>Miles</h4>
          <div className='rounded-md bg-primary/10 w-7 h-7 text-center flex-center justify-center' onClick={() => setOpen(true)}>
            <Menu className='cursor-pointer' />
          </div>
          <Drawer open={open} onClose={() => setOpen(false)} anchor='right'
            SlideProps={{className: 'min-w-[300px]'}}
          >
            <div className='w-full h-full shadow-md border bg-secondary flex flex-col gap-4 p-4 overflow-y-auto overflow-hidden'>
              <CustomLink to={'/'} active={true} Icon={Home} label='Home' />
              <CustomLink to={'/settings/'} active={false} Icon={Settings} label='Settings' />
              <Button1 onClick={handleLogout} variant={'text'} className='text-primary !w-auto'>Logout</Button1>
            </div>
          </Drawer>
          {/* <CustomMenu element={
              <div className='rounded-md bg-primary/10 w-7 h-7 text-center flex-center justify-center'>
                <Menu className='cursor-pointer' />
              </div>
            }>
              <div className='shadow-md border bg-secondary flex flex-col '>
                <Link className='btn-theme-light text-end' variant='text' to='/settings/'>Settings</Link>
                <Button1 onClick={handleLogout} variant={'text'} className='text-primary !w-auto'>Logout</Button1>
              </div>
          </CustomMenu> */}
        </div>
      </div>
    </div>
  )
}
function CustomLink({to,active,Icon,label}) {
  return (
    <Link to={to}> <Button1 className={`!justify-between ${active ? 'btn-theme' : 'btn-theme-light'}  whitespace-nowrap`}>
      {label}
      <Icon className={`${active ? 'text-secondary/80' : ''} `} fontSize='small' />
    </Button1></Link>
  )
}