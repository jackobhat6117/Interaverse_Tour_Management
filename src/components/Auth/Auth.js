import React, { useEffect } from 'react'
import Login from './Login'
import { useLocation } from 'react-router-dom';
import Signup from './Signup';
import ResetPassword from './ResetPassword';
import VerifyEmail from './VerifyEmail';
import RecoverPassword from './RecoverPassword';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/reducers/userSlice';
// import getAccount from '../../controllers/user/getAccount';


export default function Auth() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id')
  const accessToken = searchParams.get('accessToken')
  const dispatch = useDispatch();


  const view = searchParams.get('view')

  async function validateGoogleToken() {
    dispatch(setUserData({loggedIn: false,accessToken,id: id,user: {}}))

  }

  useEffect(() => {
    if(accessToken)
      validateGoogleToken()

    //eslint-disable-next-line
  },[accessToken])

  // console.log(view)
  return (
    <div>
      {view === 'register' ? 
        <Signup />
      :
      view === 'verify' ?
        <VerifyEmail />
      :
      view === 'reset' ?
        <ResetPassword />
      :
      view === 'recover' ?
        <RecoverPassword />
      :
        <Login />
      }
    </div>
  )
}
