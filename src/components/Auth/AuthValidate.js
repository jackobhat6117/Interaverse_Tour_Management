import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Auth from './Auth';


export default function AuthValidate() {
  const {userData} = useSelector(state => state.user)

  const {loggedIn} = userData;

  return (
    <div>
      {!loggedIn ? (
          <Outlet />
      ):<Auth />}
    </div>
  )
}
