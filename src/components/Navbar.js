import React from 'react'
import { Outlet } from 'react-router-dom';
import ProfileSurvey from './ProfileSurvey/ProfileSurvey';
import Header from './Header';
import NavLinks from './NavLinks';

export default function Navbar() {
  return (
    <div>
      <Header />
      <div className='w-full px-md shadow-sm bg-secondary border-b'>
        <NavLinks />
      </div>
      <ProfileSurvey />
      <Outlet />
    </div>
  )
}
