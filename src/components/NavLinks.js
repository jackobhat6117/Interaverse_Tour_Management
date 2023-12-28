import { HomeOutlined, Person, ShoppingCartOutlined, SupportAgentOutlined } from "@mui/icons-material";
import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "./HOC/Icon";
import { useSelector } from "react-redux";


// const returnPage = (link) => link === 0 ? ''  
// :
// link ===  1 ? 'order'
// :
// link ===  2 ? 'users'
// :
// link ===  3 ? 'support'
// :
// 0

export default function NavLinks({profileCompleted}) {
  const {user} = useSelector(state => state.user.userData);
  const location = useLocation();
  const locations = location.pathname?.split('/');
  const page = locations[1]||'';
  const navigate = useNavigate();
  const [link,setLink] = useState(0)
  const verified = user?.detail?.isVerified;

  // const [initialPage,setInitialPage] = useState(link);


  useEffect(() => {
    setLink(page === '' ? 0 
    :
    page === 'order' ? 1
    :
    page === 'users' ? 2
    :
    page === 'support' ? 3
    :
    0)
  },[page])

  // useEffect(() => {
  //   // let link = ev.target.getAttribute('link');
  //   if(initialPage !== link) {
      
  //     navigate(returnPage(link));
  //     setInitialPage(link)
  //   }
  // },[link,navigate,initialPage])

  function handleLink(ev,val) {
    setLink(val)
    navigate(ev.target.dataset.link)
  }

  return profileCompleted && !verified ? (
    <div className="">
      <Tabs variant="scrollable" value={link} onChange={handleLink} className="font-bold" 
        TabIndicatorProps={{sx: {height: '4px'}}}>
        <Tab label='Home' data-link="/" icon={<HomeOutlined />} iconPosition="start" className='!capitalize md:flex-1 !whitespace-nowrap' />
        <Tab label='Orders' data-link="/order" icon={<ShoppingCartOutlined />} iconPosition="start" className='!capitalize md:flex-1 !whitespace-nowrap' />
        <Tab label='Customers' data-link="/users" icon={<Person />} iconPosition="start" className='!capitalize md:flex-1 !whitespace-nowrap' />
        {/* <Tab label='Support' data-link="/support" icon={<SupportAgentOutlined />} iconPosition="start" className='!capitalize md:flex-1 !whitespace-nowrap' /> */}
      </Tabs>
    </div>
  ) : (
    <div>
      {/* <Tabs variant="scrollable" value={link} onChange={handleLink} className="font-bold" 
        TabIndicatorProps={{sx: {height: '4px'}}}>
          {page === 'welcome' ? 
            <Tab label='Support' data-link="/" icon={<Icon icon='heroicons:rocket-launch' className='text-theme1 -rotate-[43deg]' />} iconPosition="start" className='!capitalize md:flex-1 !whitespace-nowrap' />
          :
            <Tab label='Getting Started' data-link="/" icon={<Icon icon='heroicons:rocket-launch' className='text-theme1 -rotate-[43deg]' />} iconPosition="start" className='!capitalize md:flex-1 !whitespace-nowrap' />
          }
      </Tabs> */}
    </div>
  )
}
