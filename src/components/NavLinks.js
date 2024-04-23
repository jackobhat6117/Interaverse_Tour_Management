import { HomeOutlined, Person, ShoppingCartOutlined } from "@mui/icons-material";
import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Icon from "./HOC/Icon";
import { getsubDomain } from "../utils/getsubDomain";
import { getTestLevel } from "../utils/testLevel";


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
  const agency = getsubDomain();
  const profileComplete = agency || user?.detail?.isProfileComplete || user?.detail?.isVerified;

  // const [initialPage,setInitialPage] = useState(link);

  useEffect(() => {
    let pag = (page === '' ? 0 
    :
    page === 'getting-started' && !profileComplete ? -1
    :
    page === 'order' ? 1
    :
    page === 'accommodation' ? 1
    :
    page === 'tour' ? 1
    :
    page === 'users' ? 2
    :
    page === 'support' ? 3
    :
    0)
    setLink((agency && page !== 'agency-welcome') || !profileComplete?pag+1:pag)
    //eslint-disable-next-line
  },[page])

  // useEffect(() => {
  //   // let link = ev.target.getAttribute('link');
  //   if(initialPage !== link) {
      
  //     navigate(returnPage(link));
  //     setInitialPage(link)
  //   }
  // },[link,navigate,initialPage])

  function handleLink(ev,val) {
    navigate(ev.target.dataset.link)
    setLink(val)
    return true;
  }

  return profileCompleted ? (
    <div className="">
      <Tabs variant="scrollable" value={link} onChange={handleLink} className="font-bold" 
        TabIndicatorProps={{sx: {height: '4px'}}}>
        {!profileComplete?
          <Tab label='Getting Started' data-link="/getting-started" icon={<Icon icon='heroicons:rocket-launch' className=' -rotate-[43deg]' />} iconPosition="start" className='!capitalize !min-w-[150px] md:flex-1 !whitespace-nowrap' />
        :null}
        {agency ?
          <Tab label='Getting Started' data-link="/agency-welcome" icon={<Icon icon='heroicons:rocket-launch' className=' -rotate-[43deg]' />} iconPosition="start" className='!capitalize !min-w-[150px] md:flex-1 !whitespace-nowrap' />
        :null}
        <Tab label='Home' data-link="/" icon={<HomeOutlined />} iconPosition="start" className='!capitalize md:flex-1 !whitespace-nowrap' />
        <Tab label='Orders' data-link="/order" icon={<ShoppingCartOutlined />} iconPosition="start" className='!capitalize md:flex-1 !whitespace-nowrap' />
        {getTestLevel() <= getTestLevel('dev') ? 
          <Tab label='Customers' data-link="/users" icon={<Person />} iconPosition="start" className='!capitalize md:flex-1 !whitespace-nowrap' />
        :null}
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
