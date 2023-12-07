import React, { useState } from 'react'
import textlogo from '../../assets/icons/textlogo.png'
import logo from '../../assets/icons/logo.png'
import EmailInput from '../form/EmailInput'
import PasswordInput from '../form/PasswordInput'
import Button1 from '../form/Button1'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { loginReqData } from '../../data/user/Auth/loginReq'
import login from '../../controllers/Auth/login'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../redux/reducers/userSlice'
import Icon from '../HOC/Icon'


export default function Login() {
  const [data,setData] = useState({...loginReqData,confirmPassword: ''});
  const [loading,setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(ev) {
    ev.preventDefault();

    setLoading(true);
    const res = await login(data);
    setLoading(false);
    if(res.return) {
      enqueueSnackbar('You are logged in.',{variant: 'success'});
      dispatch(setUserData({
        loggedIn: true,
        accessToken: res?.data?.token,
        user: res?.data?.account
      }))
    } else {
      enqueueSnackbar(res?.msg || 'Invalid Credentials.', {variant: 'error'})
      if(res?.msg === 'Account not active')
        navigate('/?view=verify&email='+data.email)
    }
  }

  async function handleGoogleAuth() {
    let curUrl = new URLSearchParams({callbackUrl: window.location.href})
    window.location.href = (process.env.REACT_APP_API+'/main/v1/auth/google?'+curUrl)
  }


  return (
    <div className='flex flex-col min-h-screen font-bold gap-4'>
      <div className='w-full p-3 px-5 flex gap-2 bg-secondary justify-center sm:justify-start'>
        <img src={logo} alt='' className='h-[35px] object-contain' />
        <img src={textlogo} alt='' className='h-[35px]' />
      </div>
      <form onSubmit={handleSubmit} className='w-full flex flex-col items-center justify-center flex-1'>
        <div className='card flex flex-col gap-5 text-center'>
          <h4 className='pb-4'>Sign in to your account</h4>
          <EmailInput required
            className='!w-full sm:!w-[400px] max-w-full'
            value={data.email}
            placeholder=""
            onChange={(ev) => setData({...data,email: ev.target.value})}
          />
          <PasswordInput required noValidation placeholder=''
            className='!w-full sm:!w-[400px] max-w-full'
            value={data.password}
            onChange={(ev) => setData({...data,password: ev.target.value})}
          />
          <Button1 loading={loading} type='submit' label={'Login'}></Button1>
          <div className='self-center text-center flex flex-col gap-1 '>
            <Link to="?view=reset" className='self-center text-primary/60'>Forgot your password? <span className='text-theme1'>Recover now</span></Link>
            <div className='btn flex gap-4 !bg-transparent border-none !justify-center !text-primary px-[8px]'
              onClick={() => !loading && handleGoogleAuth()}
            >
              <Icon icon='devicon:google' className='p-[1px]' />
              <span className=''>
                {loading?
                'Please wait...'
                :
                'Sign in with google'}
              </span>
            </div>

            <div className='flex gap-2 items-center justify-center'>
              <p className='text-primary/40'>Dont have an account?</p><Link className='text-theme1 font-bold' to="?view=register">Sign up</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
