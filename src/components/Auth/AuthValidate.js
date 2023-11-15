import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Auth from './Auth';
import getAccount from '../../controllers/user/getAccount';
import { setUserData } from '../../redux/reducers/userSlice';


export default function AuthValidate() {
  const {userData} = useSelector(state => state.user)
  const dispatch = useDispatch();

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  },[])

  async function loadUser() {
    const res = await getAccount();
    if(res.return)
      dispatch(setUserData({loggedIn: true,accessToken: userData.accessToken,user: res?.data?.account}))
  }

  const {loggedIn} = userData;

  return (
    <div>
      {loggedIn ? (
          <Outlet />
      ):<Auth />}
    </div>
  )
}
