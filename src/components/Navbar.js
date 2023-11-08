import React from 'react'
import { Outlet } from 'react-router-dom';
import ProfileSurvey from './ProfileSurvey/ProfileSurvey';
import Header from './Header';
import NavLinks from './NavLinks';
import ProfileStatusCheck from './ProfileSurvey/New/ProfileStatusCheck';
import { useSelector } from 'react-redux';
import checkProfileComplete from '../features/profile/checkProfileComplete';

export default function Navbar() {
  const {user} = useSelector(state => state.user.userData)

  const profileCompleteCheck = checkProfileComplete(user);
  const completed = true || profileCompleteCheck?.every(obj => obj.complete);
  return (
    <div className='flex flex-col min-h-screen '>
      <Header />
      <div className='w-full px-md shadow-sm bg-secondary border-b'>
        <NavLinks profileCompleted={completed} />
      </div>
      <ProfileSurvey />
      <div className='bg-secondary flex flex-col h-full flex-1'>
        {completed ? (
          <Outlet />
        ):(
          <div className='flex flex-col min-h-screen px-md'>
            <div className='flex flex-1 flex-col items-center justify-center text-center w-full '>
              <ProfileStatusCheck data={profileCompleteCheck} />
            </div>
          </div>    
        )}
      </div>
    </div>
  )
}