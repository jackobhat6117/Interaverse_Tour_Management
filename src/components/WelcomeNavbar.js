import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from '@mui/material';
import Icon from './HOC/Icon';
import {ReactComponent as LearnIcon} from '../assets/icons/learnMore.svg'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import { HomeOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';


export default function WelcomeNavbar(props) {
  const {user} = useSelector(state => state.user.userData);
  const profileComplete = user?.detail?.isProfileComplete;
  const underReview = user?.detail?.requestedVerification;
  const navigate = useNavigate();
  const location = useLocation();
  const locations = location.pathname?.split('/');
  let page = locations[2];
  if(page === 'getting-started')
    page = 'welcome';
  else if(page === undefined || !page) page = 'getting-started';
  
  const links = ['getting-started','pricing','learn','support']
  
  const [tabIndex,setTabIndex] = useState(
    links.indexOf(page)
  );

  useEffect(() => {
    window.scrollTo(0,0)
    setTabIndex(links.indexOf(page))
    //eslint-disable-next-line
  },[location])

  console.log('tab: ',tabIndex, locations[2])


  function handleChange(ev,val) {
    ev?.preventDefault();
    setTabIndex(val);
    navigate(ev.target.dataset.link)
    return true;
  }
  return (
    <div className='flex flex-col min-h-screen '>
      {
        !props.children ? 
          <Header />
        :null
      }
      <div className='w-full hidden md:block px-md shadow-sm bg-secondary border-b'>
        <Tabs variant="scrollable" value={tabIndex} className="font-bold" 
          onChange={(ev,val) => handleChange(ev,val)}
          TabIndicatorProps={{sx: {height: '4px'}}}>
            <Tab label='Getting Started' data-link="/getting-started" icon={<Icon icon='heroicons:rocket-launch' className='!min-w-[20px] !h-6 -rotate-[43deg]' />} iconPosition="start" className='!capitalize !min-w-[150px] md:flex-1 !whitespace-nowrap' />
            {profileComplete && underReview ?
              <Tab label='Home' data-link="/" icon={<HomeOutlined />} iconPosition="start" className='!capitalize md:flex-1 !whitespace-nowrap' />
            :null}
            <Tab label='Pricing' data-link="/welcome/pricing" icon={
              <div className={'flex justify-center items-center  w-5 h-5 rounded-full border '+(tabIndex === 1 ? 'border-theme1':'border-primary/40')}>
                <Icon icon='tabler:currency-naira' className=' ' />
              </div>
            } iconPosition="start" className='!capitalize !min-w-[150px] md:flex-1 !whitespace-nowrap' />
            <Tab label='Learn More' data-link="/welcome/learn" icon={
              <LearnIcon className='text-theme-1' />
            } iconPosition="start" className='!capitalize !min-w-[150px] md:flex-1 !whitespace-nowrap' />
            <Tab label='Support' data-link="/welcome/support" icon={<Icon icon='material-symbols-light:contact-support-outline' className=' ' />} iconPosition="start" className='!capitalize !min-w-[150px] md:flex-1 !whitespace-nowrap' />
        </Tabs>
      </div>

      <div className='bg-secondary flex flex-col h-full flex-1'>
        {props.children || <Outlet />}
      </div>
    </div>
  )
}
