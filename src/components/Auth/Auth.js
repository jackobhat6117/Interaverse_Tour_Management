import React from 'react'
import Login from './Login'
import { useLocation } from 'react-router-dom';
import Signup from './Signup';
import ResetPassword from './ResetPassword';
import VerifyEmail from './VerifyEmail';


export default function Auth() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const view = searchParams.get('view')

  // console.log(view)
  return (
    <div>
      {view === 'register' ? 
        <Signup />
      :
      view === 'reset' ?
        <ResetPassword />
      :
      view === 'verify' ?
        <VerifyEmail />
      :
        <Login />
      }
    </div>
  )
}
