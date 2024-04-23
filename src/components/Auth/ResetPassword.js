import React, { useState } from 'react'
import textlogo from '../../assets/icons/textlogo.svg'
import EmailInput from '../form/EmailInput'
import Button1 from '../form/Button1'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import forgotPassword from '../../controllers/Auth/forgotPassword'
import { useSelector } from 'react-redux'
import staffForgotPassword from '../../controllers/Auth/staff/forgotPassword'


export default function ResetPassword() {
  const [email,setEmail] = useState('');
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const {userData: {agent}} = useSelector(state => state.user)

  async function handleSubmit(ev) {
    ev.preventDefault();

    setLoading(true);
    let res = {return: 0,msg: 'Something went wrong on our end! Please contact support 0xRSTPWD'}
    if(agent)
      res = await staffForgotPassword({email})
    else
      res = await forgotPassword({email});
    setLoading(false);
    if(res.return) {
      enqueueSnackbar(res.msg || 'Reset link sent to your email.',{variant: 'success'});
      setTimeout(() => {
        navigate(`?view=recover&email=${email}`)
      },2000)
    } else enqueueSnackbar(res.msg || 'Failed sending to your email!', {variant: 'error'})
  }

  return (
    <div className='flex flex-col min-h-screen font-bold'>
      <div className='w-full p-3 px-5'>
        <img src={textlogo} alt='' />
      </div>
      <form onSubmit={handleSubmit} className='w-full flex flex-col items-center justify-center flex-1'>
        <div className='p-6 sm:card sm:bg-[#00000007] flex flex-col gap-5'>
          <h2 className='pb-4'>Forgot Password</h2>
          <EmailInput required
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <Button1 loading={loading} type='submit' label={'Send Reset Link'}></Button1>
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
