import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
// import ProfileSurvey from './ProfileSurvey/ProfileSurvey';
import Header from './Header';
import NavLinks from './NavLinks';
import { useSelector } from 'react-redux';
import checkProfileComplete from '../features/profile/checkProfileComplete';
import WelcomeNavbar from './WelcomeNavbar';
import GettingStarted from '../pages/Welcome/GettingStarted';
import { getsubDomain } from '../utils/getsubDomain';


function Navbar() {
  const {user} = useSelector(state => state.user.userData);
  const agency = getsubDomain();
  const profileCompleteCheck = checkProfileComplete(user);
  const verified = user?.detail?.isVerified;
  const completed = (profileCompleteCheck?.every(obj => obj.complete) && user?.detail?.requestedVerification) || verified;

  useEffect(() => {
    if(window?.Intercom)
      window?.Intercom('update')
  },[])

  // enqueueSnackbar('your welcom',{variant: 'success'})

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='w-full hidden md:block px-md shadow-sm bg-secondary border-b'>
        <NavLinks profileCompleted={completed || agency} />
      </div>
      {/* <ProfileSurvey /> */}
      <div className='bg-secondary flex flex-col h-full flex-1'>
        {agency || (completed) ? (
          <Outlet />
        ):(
          <WelcomeNavbar>
            <GettingStarted />
            {/* <ProfileStatusCheck data={profileCompleteCheck} /> */}
          </WelcomeNavbar>
        )}
      </div>
    </div>
  )
}

export default React.memo(Navbar)