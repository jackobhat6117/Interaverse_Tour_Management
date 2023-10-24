import { HomeOutlined, Person, ShoppingCartOutlined, SupportAgentOutlined } from "@mui/icons-material";
import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const returnPage = (link) => link === 0 ? ''  
:
link ===  1 ? 'order'
:
link ===  2 ? 'users'
:
link ===  3 ? 'support'
:
0

export default function NavLinks() {
  const location = useLocation();
  const locations = location.pathname?.split('/');
  const page = locations[locations.length-1];
  const navigate = useNavigate();
  const [link,setLink] = useState(0)
  const [initialPage,setInitialPage] = useState(link);


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

  useEffect(() => {
    // let link = ev.target.getAttribute('link');
    if(initialPage !== link) {
      
      navigate(returnPage(link));
      setInitialPage(link)
    }
  },[link,navigate,initialPage])

  function handleLink(ev,val) {
    setLink(val)
  }
  return (
    <div className="">
      <Tabs variant="scrollable" value={link} onChange={handleLink} className="font-bold" 
        TabIndicatorProps={{sx: {height: '4px'}}}>
        <Tab label='Home' link="/" icon={<HomeOutlined />} iconPosition="start" className='!capitalize md:flex-1 !whitespace-nowrap' />
        <Tab label='Order' link="/order" icon={<ShoppingCartOutlined />} iconPosition="start" className='!capitalize md:flex-1 !whitespace-nowrap' />
        <Tab label='User Management' link="/users" icon={<Person />} iconPosition="start" className='!capitalize md:flex-1 !whitespace-nowrap' />
        <Tab label='Support' link="/support" icon={<SupportAgentOutlined />} iconPosition="start" className='!capitalize md:flex-1 !whitespace-nowrap' />
      </Tabs>
    </div>
  )
}
