import React from 'react'
import logo from '../assets/icons/textlogo.png';
import SearchInput from './forms/SearchInput';
import { FormControlLabel, Switch, styled } from '@mui/material';
import { Close, Notifications, Person } from '@mui/icons-material';
import CustomMenu from './utils/CustomMenu';
import moment from 'moment/moment';
import Button1 from './forms/Button1';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/userSlice';


const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 32,
  height: 16,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 12,
    height: 12,
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const colors = [
  '#1E61DC','#D9A513','#1EA994','#1E61DC','#B52026'
]

export default function Header() {
  const dispatch = useDispatch();
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
    <div className='flex items-center gap-10 px-md py-2'>
      <div>
        <img src={logo} alt='Miles' />
      </div>
      <div className='flex-1'>
        <SearchInput />
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
                const objDate = moment(obj.date);
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
          <div className='shadow-md border'>
            <Button1 onClick={handleLogout} variant={'text'} className='text-primary'>Logout</Button1>
          </div>
        </CustomMenu>
      </div>
    </div>
  )
}