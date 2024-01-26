import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Auth from './Auth';
import getAccount from '../../controllers/user/getAccount';
import { setUser } from '../../redux/reducers/userSlice';
import LoadingBar from '../animation/LoadingBar';
import Logo from '../Logo/Logo';
import updateProfile from '../../controllers/user/updateProfile';


export default function AuthValidate() {
  const {userData} = useSelector(state => state.user)
  const dispatch = useDispatch();
  console.log(userData)
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  },[])

  async function loadUser() {
    const res = await getAccount();
    if(res.return) {
      if(!res?.data?.account?.detail) {
        const updRes = await updateProfile({userType: 'Agent'})
        if(updRes.return) {
          return dispatch(setUser(updRes?.data))
        } 
      }

      dispatch(setUser(res?.data?.account))
    }
  }

  const {loggedIn,user} = userData;

  return (
    <div className='flex justify-center'>
      <div className='max-w-full w-[1500px]'>
        {loggedIn ? (
          user?._id ?
            <Outlet />
          : 
          <div className='flex flex-col gap-2 justify-center items-center h-screen w-full'>
            <Logo />
            <LoadingBar />
          </div>
        ):<Auth />}
      </div>
    </div>
  )
}
