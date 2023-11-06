import React, { useState } from 'react'
import textlogo from '../../assets/icons/textlogo.png'
import logo from '../../assets/icons/logo.png'
import EmailInput from '../form/EmailInput'
import PasswordInput from '../form/PasswordInput'
import Button1 from '../form/Button1'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { loginReqData } from '../../data/user/Auth/loginReq'
import login from '../../controllers/Auth/login'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../redux/reducers/userSlice'


export default function Login() {
  const [data,setData] = useState({...loginReqData,confirmPassword: ''});
  const [loading,setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useDispatch();

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
    } else enqueueSnackbar(res?.msg || 'Invalid Credentials.', {variant: 'error'})
  }

  return (
    <div className='flex flex-col min-h-screen font-bold'>
      <div className='w-full p-3 px-5 flex gap-2'>
        <img src={logo} alt='Miles' className='object-contain' />
        <img src={textlogo} alt='Miles' />
      </div>
      <form onSubmit={handleSubmit} className='w-full flex flex-col items-center justify-center flex-1'>
        <div className='card bg-[#00000007] flex flex-col gap-5'>
          <h3 className='pb-4'>Sign in to your account</h3>
          <EmailInput required
            value={data.email}
            onChange={(ev) => setData({...data,email: ev.target.value})}
          />
          <PasswordInput required
            value={data.password}
            onChange={(ev) => setData({...data,password: ev.target.value})}
          />
          <Button1 loading={loading} type='submit' label={'Login'}></Button1>
          <div className='self-center text-center flex flex-col gap-3'>
            <Link to="?view=reset" className='self-center text-primary/60'>I have forgoten my password</Link>
            <div className='flex gap-2 items-center'>
              <p className='text-primary/40'>Dont have an account?</p><Link className='text-theme1 font-bold' to="?view=register">Sign up</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
