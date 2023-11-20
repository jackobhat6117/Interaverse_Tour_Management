import React, { useState } from 'react'
import textlogo from '../../assets/icons/textlogo.png'
import logo from '../../assets/icons/logo.png'
import EmailInput from '../form/EmailInput'
import Button1 from '../form/Button1'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import verifyEmail from '../../controllers/Auth/verifyEmail'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../redux/reducers/userSlice'
import resendVerifyEmail from '../../controllers/Auth/resendVerifyEmail'
import OTPInput from './OTPInput'
import MailVerified from '../animation/MailVerified'
import MailSent from '../animation/MailSent'


export default function VerifyEmail() {
  const searchParam = new URLSearchParams(window?.location?.search);
  const email = searchParam.get('email')
  const [data,setData] = useState({otp: '',email: email || ''});
  // const navigate = useNavigate()
  const [loading,setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useDispatch();
  const [verified,setVerified] = useState(false);

  async function handleSubmit(ev) {
    ev?.preventDefault();
    ev?.stopPropagation();
    if(loading)
      return false;

    setLoading(true);
    const res = await verifyEmail((new URLSearchParams(data)).toString());
    setLoading(false);
    if(res.return) {
      setVerified(true);
      // enqueueSnackbar('Welcome, your email has been verified.',{variant: 'success'});
      let {token: accessToken,account: user} = res.data;
      dispatch(setUserData({accessToken,user,loggedIn: true}))
      // setTimeout(() => {
      //   navigate('/')
      // },4000)
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
    } else enqueueSnackbar(res.msg || 'Something went wrong!', {variant: 'error'})

  }

  return (
    <div className='flex flex-col min-h-screen font-bold'>
      <div className='w-full p-3 px-5 flex gap-2 bg-secondary justify-center sm:justify-start'>
        <img src={logo} alt='Miles' className='h-[35px] object-contain' />
        <img src={textlogo} alt='Miles' className='h-[35px]' />
      </div>
      {!verified ? 
        <form onSubmit={handleSubmit} className='w-full flex flex-col items-center justify-center flex-1'>
          <div className='card px-4 sm:px-10 py-4 bg-secondary flex flex-col gap-3 max-w-[600px]'>
            <MailSent className={'!h-[80px]'} />
            <h4 className=' text-center'>Verify your email address</h4>
            <p className='text-center text-primary/70 pb-4'>
              Please enter the verification code sent to your email
              <b className='block font-bold'>{email}.</b>
              {/* Please enter the code to verify your account */}
              {/* The code we send is only valid for 24 hours,<br /> click the RESEND button below to get a new code. */}
            </p>

            {data.email ? null :
              <EmailInput required
                value={data.email}
                onChange={(ev) => setData({...data,email: ev.target.value})}
              />
            }
            <OTPInput required label={'OTP'}
              value={data.otp}
              onChange={(val) => {setData({...data,otp: val})}}
              callback={() => handleSubmit()}
            />
            <Button1 loading={loading} type='submit' label={'Verify'}></Button1>
            <div className='flex gap-2 justify-center items-center -my-3 pt-4'>
              <p>Did not get any email? </p>
              <div>
                <Button1 loading={loading} label={'Resend'} onClick={resSubmit} variant='text'></Button1>
              </div>
            </div>
            <div className='self-center text-center flex flex-col gap-3 w-full'>
              <div className='flex gap-2 justify-center flex-wrap flex-1'>
                {/* <div className=''>
                  <Link className='text-theme1 font-bold' to="?view=login">Login</Link>
                </div> */}
                <div className='flex gap-2 flex-wrap'>
                  {/* <p className='text-primary/40'>Dont have an account?</p> */}
                  <Link className='text-theme1 font-bold' to="?view=register">Go back to Sign up</Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      :
        <Verified />
      }
    </div>
  ) 
}

function Verified() {
  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <div className='card flex flex-col items-center gap-4 text-center max-w-[500px] '>
        <div className='flex-1 '>
          <MailVerified className={'h-[80px] scale-[200%]'} />
          {/* <img src='/gifs/successful-email-envelope.gif' alt='' className='h-[200px]' /> */}
        </div>
        <h5>Your email was successfully verified.</h5>
        <p>
          Your email address has been successfully verified, and your account activated. Continue to activate your business on Intraverse.
        </p>
        <Link to='/profile' className='btn-theme rounded-md justify-center w-full'>Activate your business</Link>
      </div>
    </div>
  )
}