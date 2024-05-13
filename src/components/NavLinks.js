import { HomeOutlined, Person, ShoppingCartOutlined } from "@mui/icons-material";
import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


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
  // const {user} = useSelector(state => state.user.userData);
  const location = useLocation();
  const locations = location.pathname?.split('/');
  const page = locations[1]||'';
  const navigate = useNavigate();
  const [link,setLink] = useState(0)
  // const profileComplete = user?.detail?.isProfileComplete;

  // const [initialPage,setInitialPage] = useState(link);


  useEffect(() => {
    let pag = (page === '' ? 0 
    :
    page === 'order' ? 1
    :
    page === 'users' ? 2
    :
    page === 'support' ? 3
    :
    0)
    setLink(pag)
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
    setLink(val)
    console.log(window.location.pathname)
    // navigate(ev.target.dataset.link)
  }

  function handleNav(link) {
    if(link === window.location.pathname)
      window.location.reload();

    navigate(link);

  }
  
  return profileCompleted ? (
    <div className="">
      <Tabs variant="scrollable" value={link} onChange={handleLink} className="font-bold" 
        TabIndicatorProps={{sx: {height: '4px'}}}>
        {/* {!profileComplete?
          <Tab label='Getting Started' data-link="/welcome" icon={<Icon icon='heroicons:rocket-launch' className=' -rotate-[43deg]' />} iconPosition="start" className='!capitalize !min-w-[150px] md:flex-1 !whitespace-nowrap' />
        :null} */}
        <Tab label='Home' onClick={() => handleNav("/")} data-link="/" icon={<HomeOutlined />} iconPosition="start" className='!capitalize md:flex-1 !whitespace-nowrap' />
        <Tab label='Orders' onClick={() => handleNav("/order")} data-link="/order" icon={<ShoppingCartOutlined />} iconPosition="start" className='!capitalize md:flex-1 !whitespace-nowrap' />
        <Tab label='Customers' onClick={() => handleNav("/users")} data-link="/users" icon={<Person />} iconPosition="start" className='!capitalize md:flex-1 !whitespace-nowrap' />
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
