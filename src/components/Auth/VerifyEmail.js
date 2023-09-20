import React, { useState } from 'react'
import textlogo from '../../assets/icons/textlogo.png'
import EmailInput from '../forms/EmailInput'
import Button1 from '../forms/Button1'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import TextInput from '../forms/TextInput'
import verifyEmail from '../../controllers/Auth/verifyEmail'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../redux/reducers/userSlice'
import resendVerifyEmail from '../../controllers/Auth/resendVerifyEmail'


export default function VerifyEmail() {
  const [data,setData] = useState({otp: '',email: ''});
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useDispatch();

  async function handleSubmit(ev) {
    ev.preventDefault();

    setLoading(true);
    const res = await verifyEmail((new URLSearchParams(data)).toString());
    setLoading(false);
    if(res.return) {
      enqueueSnackbar(res.msg || 'Welcome, your email has been verified.',{variant: 'success'});
      let {token: accessToken,account: user} = res.data;
      dispatch(setUserData({accessToken,user,loggedIn: true}))
      setTimeout(() => {
        navigate('/')
      },2000)
    } else enqueueSnackbar(res.msg, {variant: 'error'})
  }

  async function resSubmit(ev) {
    ev.preventDefault();

    setLoading(true);
    const res = await resendVerifyEmail(data);
    setLoading(false);
    if(res.return) {
      enqueueSnackbar(res.msg || 'Verification code sent.',{variant: 'success'});
      setData({...data,otp: ''})
    } else enqueueSnackbar(res.msg, {variant: 'error'})

  }

  return (
    <div className='flex flex-col min-h-screen font-bold'>
      <div className='w-full p-3 px-5'>
        <img src={textlogo} alt='Miles' />
      </div>
      <form onSubmit={handleSubmit} className='w-full flex flex-col items-center justify-center flex-1'>
        <div className='card bg-[#00000007] flex flex-col gap-5'>
          <h2 className='pb-4'>Verify Email</h2>
          <EmailInput required
            value={data.email}
            onChange={(ev) => setData({...data,email: ev.target.value})}
          />
          <TextInput required label={'OTP'}
            value={data.otp}
            onChange={(ev) => setData({...data,otp: ev.target.value})}
          />
          <div className='self-start'>
            <Button1 loading={loading} type='submit' label={'Resend'} onClick={resSubmit} variant='text'></Button1>
          </div>
          <Button1 loading={loading} type='submit' label={'Verify'}></Button1>
          <div className='self-center text-center flex flex-col gap-3 w-full'>
            <div className='flex gap-2 justify-between flex-wrap gap-4 flex-1'>
              <div className=''>
                <Link className='text-theme1 font-bold' to="?view=login">Login</Link>
              </div>
              <div className='flex gap-2 flex-wrap'>
                <p className='text-primary/40'>Dont have an account?</p><Link className='text-theme1 font-bold' to="?view=register">Sign up</Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
