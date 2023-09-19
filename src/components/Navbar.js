import React from 'react'
import { useSelector } from 'react-redux'
import Auth from './Auth/Auth';
import { Outlet } from 'react-router-dom';
import ProfileSurvey from './ProfileSurvey/ProfileSurvey';
import Header from './Header';
import NavLinks from './NavLinks';

export default function Navbar() {
  const {userData} = useSelector(state => state.user)

  const {loggedIn} = userData;

  return (
    <div>
      {loggedIn ? (
        <div>
          <Header />
          <div className='w-full px-md shadow-sm bg-secondary border-b'>
            <NavLinks />
          </div>
          <ProfileSurvey />
          <Outlet />
        </div>
      ):<Auth />}
    </div>
  )
}
