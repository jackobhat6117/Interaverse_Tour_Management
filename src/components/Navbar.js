import React from 'react'
import { useSelector } from 'react-redux'
import Outlet from 'react-router-dom/dist/umd/react-router-dom.development'
import Auth from './Auth/Auth';

export default function Navbar() {
  const {userData} = useSelector(state => state.user)

  const {loggedIn} = userData;

  return (
    <div>
      {loggedIn ? (
        <Outlet />
      ):<Auth />}
    </div>
  )
}
