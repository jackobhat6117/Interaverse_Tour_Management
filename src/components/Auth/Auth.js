import React, { useEffect, useState } from 'react'
import Login from './Login'
import { useLocation, useNavigate } from 'react-router-dom';
import Signup from './Signup';
import ResetPassword from './ResetPassword';
import VerifyEmail from './VerifyEmail';
import RecoverPassword from './RecoverPassword';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/reducers/userSlice';
// import getAccount from '../../controllers/user/getAccount';
import textlogo from '../../assets/icons/textlogo.svg'
import logo from '../../assets/icons/logo.svg'



export default function Auth({agency}) {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id')
  const accessToken = searchParams.get('accessToken')
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);

  const view = searchParams.get('view')
    
  async function validateGoogleToken() {
    // const newUrl = `${window.location.protocol}//${window.location.host}`;
    // window.history.replaceState({}, document.title, newUrl);
    
    setLoading(true);
    setTimeout(() => setLoading(false),4000)
    dispatch(setUserData({loggedIn: true,accessToken,id: id,user: {},googleUser: true}))

    navigate({
      pathname: '/',
      search: ''
    })
  }

  useEffect(() => {
    if(accessToken)
      validateGoogleToken()

    //eslint-disable-next-line
  },[accessToken])

  return !loading ? (
    <div className='bg-secondary sm:bg-inherit'>
      {view === 'register' ? 
        <Signup />
      :
      view === 'verify' && !agency ?
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
  ) : (
    <div className='flex flex-col flex-1 min-h-screen justify-center items-center '>
      <div className='w-full  px-5 flex gap-2 justify-center '>
        <img src={logo} alt='' className='h-[35px] object-contain' />
        <img src={textlogo} alt='' className='h-[35px]' />
      </div>
      <img src={'/gifs/loading-bar.gif'} alt='Preloader' className='h-[150px] -translate-y-10' />
    </div>
  )
}
