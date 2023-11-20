import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from '@mui/material';
import Icon from './HOC/Icon';
import {ReactComponent as LearnIcon} from '../assets/icons/learnMore.svg'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';


export default function WelcomeNavbar(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const locations = location.pathname?.split('/');
  let page = locations[2];
  if(page === '')
    page = 'welcome';
  else if(page === undefined || !page) page = '';
  
  const links = ['','pricing','learn','support']
  
  console.log(page,locations," 000")
  const [tabIndex,setTabIndex] = useState(
    links.indexOf(page)
  );

  useEffect(() => {
    window.scrollTo(0,0)
  },[location])


  function handleChange(ev,val) {
    ev?.preventDefault();
    setTabIndex(val);
    navigate(ev.target.dataset.link)
  }
  return (
    <div className='flex flex-col min-h-screen '>
      {
        !props.children ? 
          <Header />
        :null
      }
      <div className='w-full px-md shadow-sm bg-secondary border-b'>
        <Tabs variant="scrollable" value={tabIndex} className="font-bold" 
          onChange={(ev,val) => handleChange(ev,val)}
          TabIndicatorProps={{sx: {height: '4px'}}}>
            <Tab label='Getting Started' data-link="/" icon={<Icon icon='heroicons:rocket-launch' className=' -rotate-[43deg]' />} iconPosition="start" className='!capitalize !min-w-[150px] md:flex-1 !whitespace-nowrap' />
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
