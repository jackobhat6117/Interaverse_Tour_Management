import React, { useState } from 'react'
import {ReactComponent as TextLogo} from '../../assets/icons/textlogo.svg'
import logo from '../../assets/icons/logo.svg'
import EmailInput from '../form/EmailInput'
import PasswordInput from '../form/PasswordInput'
import Button1 from '../form/Button1'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import flightCheckedIcon from '../../assets/icons/Checkmark.svg';
import hotelCheckedIcon from '../../assets/icons/Checkmark (2).svg';
import packageCheckedIcon from '../../assets/icons/Checkmark (1).svg';
import TextInput from '../form/TextInput'
import { signupReqData } from '../../data/user/Auth/signupReq'
import signup from '../../controllers/Auth/signup'
import { useSnackbar } from 'notistack'
import Checkbox from '../form/Checkbox'
import PhoneNumberInput from '../form/PhoneNumberInput'
import Icon from '../HOC/Icon'
import Logo from '../Logo/Logo'
import { useSelector } from 'react-redux'
import acceptInvitation from '../../controllers/Auth/staff/acceptInvitation'
import { path } from '../../config'
import { getsubDomain } from '../../utils/getsubDomain'


export default function Signup() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email')
  // let type = searchParam.get('type')
  const [data,setData] = useState({...signupReqData,userType: "Agent",confirmPassword: '',email: email || ''});
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const [terms,setTerms] = useState(false);
  const [type,setType] = useState(email || false);
  const {userData: {agent}} = useSelector(state => state?.user)
  const agency = getsubDomain();



  async function handleSubmit(ev) {
    ev?.preventDefault();

    const {firstName,lastName,email,password} = data;
    setLoading(true);
    let res = {return: 0,msg: 'Something went wrong on our end! Please contact support. 0xSTLOG'}
    console.log(agent)
    if(agent)
      res = await acceptInvitation({firstName,lastName,email,password,agentId: agent?._id,hash: agent?.hash})
    else
      res = await signup(data);
    setLoading(false);
    if(res.return) {
      enqueueSnackbar('Registered Successfully.',{variant: 'success'});
      setTimeout(() => {
        navigate(`?view=verify&email=${data.email}`)
      },2000)
    } else enqueueSnackbar(res.msg || 'Registration Failed.', {variant: 'error'})
  }
  
  async function handleGoogleAuth() {
    let curUrl = new URLSearchParams({callbackUrl: window.location.href})
    window.location.href = (process.env.REACT_APP_API+'/main/v1/auth/google?'+curUrl)
  }

  return agency ? <AgencySignup data={data} setData={setData} handleSignup={handleSubmit} /> : (
    <div className='flex min-h-screen '>
      <div className='bg-black hidden md:block flex-0 '>
        <div className='w-full h-full hidden md:flex flex-col bg-theme1/40'>
          <div className='lg:px-20 p-10 py-5 flex gap-2 text-white'>
            {/* <img src={logo} alt='' className='object-contain' /> */}
            {/* <img src={textlogo} alt='' className='' /> */}
            <Logo textClassName={'text-secondary capitalize'} />
          </div>
          <div className='flex flex-col p-10 lg:px-20 flex-1 gap-6 text-secondary justify-center'>
            <h4 className='pb-4 text-secondary'>Sell travel online seamlessly</h4>
            <Service title={'Get instant connection to top flight GDS'} icon={flightCheckedIcon}>
              Search, book and issue tickets - without the need for accreditation or industry expertise.
            </Service>
            <Service title={'Offer accommodation to your customers'} icon={hotelCheckedIcon}>
              {/* Earn commissions by promoting accommodations at more than 1 million properties globally. */}
              Earn commissions more than 1 million properties globally.
            </Service>
            <Service title={'Upsell your customers with tours'} icon={packageCheckedIcon}>
              {/* Give your customers the flexibility they want. Offer them tours, events and activities from around the globe. */}
              Offer them tours, events and activities from around the globe.
            </Service>
          </div>
        </div>
      </div>
      {!type ? (
        <div className='flex-1 bg-secondary flex flex-col '>
          <div className='lg:px-20 px-4 self-center md:hidden p-4 flex gap-2 w-[80%]'>
            <img src={logo} alt='' className='object-contain' />
            <TextLogo className='text-primary' />
            {/* <img src={textlogo} alt='' className=' h-8 my-2' /> */}
          </div>
          <div className='flex flex-1 flex-col justify-center items-center '>

            <div className='flex flex-col gap-8 w-[80%]'>
              <h4>Create your account on {path.siteName}</h4>
              {/* <div id='signInDiv'></div> */}
              <div className='flex flex-col gap-4'>
                <div className='btn flex gap-4 !bg-secondary !text-primary px-[8px] py-5'
                  onClick={() => !loading && handleGoogleAuth()}
                >
                  <Icon icon='devicon:google' className='p-[1px]' />
                  <span className='flex-1 '>
                    {loading?
                    'Please wait...'
                    :
                    'Sign up with google'}
                  </span>
                </div>
                <div className='btn flex gap-4 !bg-secondary !text-primary px-[8px] py-5 '
                  onClick={() => setType(true)}
                >
                  <Icon icon='mdi:email' className='bg-theme1 rounded-full p-[6px] text-secondary' />
                  <span className='flex-1 '>Sign up with your email</span>
                </div>
              </div>
              <Link to='/' className='text-[12px] text-primary/70'>Already have an account? <span className='text-theme1'>Login</span></Link>
            </div>
          </div>
        </div>
        
      ):( // sign up form

        <div className='flex-1 flex flex-col sm:bg-theme1/10 max-h-scroll overflow-auto justify-center'>
          <div className='lg:px-20 px-10 self-center md:hidden p-4 hidden sm:flex gap-2 w-full'>
            <img src={logo} alt='' className='object-contain' />
            <TextLogo className='text-primary' />
            {/* <img src={textlogo} alt='' className=' h-8 my-2' /> */}
          </div>
          <form onSubmit={handleSubmit} className='flex flex-col items-center flex-1 sm:p-4'>
            <div className='lg:px-20 p-4 sm:hidden flex justify-center w-full mb-2 bg-secondary'>
              <TextLogo className='text-primary h-4' />
            </div>
            <h5 className='sm:hidden text-primary/50'>Sell travel online seamlessly</h5>
            <div className='bg-secondary rounded-lg px-4 !py-6 sm:card flex flex-col gap-5 sticky top-10'>
              <h5 className='pb-2 text-center sm:text-left'>Create an account on Intraverse</h5>
              <div className='flex gap-4 flex-wrap sm:flex-nowrap'>
                <TextInput size='small' required label={'First Name'} placeholder={'e.g John'}
                  value={data.firstName}
                  onChange={(ev) => setData({...data,firstName: ev.target.value})}
                  />
                <TextInput size='small' required label={'Last Name'} placeholder={'e.g Doe'} 
                  value={data.lastName}
                  onChange={(ev) => setData({...data,lastName: ev.target.value})}          
                  />
              </div>
              <EmailInput size='small' required disabled={email}
                value={data.email}
                onChange={(ev) => setData({...data,email: ev.target.value})}          
              />
              <PhoneNumberInput size='small' required
                label={'Your phone number'}
                value={data.phone}
                onChange={(value) => setData({...data,phone: value})}          
              />
              <div className='flex gap-4 flex-wrap sm:flex-nowrap'>
                <PasswordInput size='small' required
                  value={data.password}
                  onChange={(ev) => setData({...data,password: ev.target.value})}          
                />
                <PasswordInput size='small' label={'Confirm password'} required
                  value={data.confirmPassword}
                  onChange={(ev) => setData({...data,confirmPassword: ev.target.value})}
                />
              </div>
              <div className='flex flex-col text-primary/70'>
                <Checkbox labelClassName='bg-secondary px-2 py-1'>
                  I’d like to receive occasionaly updates
                </Checkbox>
                <Checkbox labelClassName='bg-secondary px-2 py-1' onChange={(ev) => setTerms(ev.target.checked)}>
                  I’ve read and agree with Intraverse 
                  <Link to='/tos' target='_blank'>Terms</Link>
                   & 
                  <Link to='/privacy-policy' target='_blank'>Privacy Policy</Link>
                </Checkbox>
              </div>
              <Button1 loading={loading} type={'submit'} label={'Sign up'} disabled={!terms}></Button1>
              <div className='self-center text-center flex flex-col gap-3'>
                <div className='flex gap-2 items-center'>
                  <p className='text-primary/40'>Already have an account?</p><Link className='text-theme1 font-bold' to="?login">Login</Link>
                </div>
                <div onClick={() => setType(false)} to='?view=register' className='text-primary/50 font-bold'>Go back</div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

function AgencySignup({data,setData,handleSignup}) {
  const [loading,setLoading] = useState(false);

  async function handleSubmit(ev) {
    ev?.preventDefault();
    setLoading(true);
    await handleSignup();
    setLoading(false);
  }
  return (
    <div className='flex flex-col items-center justify-center gap-4 min-h-screen p-10'>
      <form onSubmit={handleSubmit} className='flex flex-col items-center text-center gap-10 max-w-[500px]'>
        <Logo />
        <h4>Welcome to {path.siteName} Travels</h4>
        <div>
          A teammate has invited you to join their account. Please complete the fields below to get started creating your account
        </div>
        <div className='flex flex-col gap-6'>
          <div className='flex gap-6'>
            <TextInput label='First Name' value={data?.firstName}
              onChange={(ev) => setData({...data,firstName: ev.target.value})} />
            <TextInput label='Last Name' value={data?.lastName}
              onChange={(ev) => setData({...data,lastName: ev.target.value})} />
          </div>
          <div className='flex gap-6'>
            <PasswordInput size='small' required
              value={data.password}
              onChange={(ev) => setData({...data,password: ev.target.value})}          
            />
            <PasswordInput size='small' label={'Confirm password'} required
              value={data.confirmPassword}
              onChange={(ev) => setData({...data,confirmPassword: ev.target.value})}
            />
          </div>
          <div className='py-5'>
            <Button1 loading={loading} type='submit'>Join Team</Button1>
          </div>
          <div>
            <Link to='/'>Login</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
function Service({title,icon,children}) {
  return (
    <div className='flex gap-5 text-white'>
      <img src={icon} alt='service' className='w-10 h-10 object-contain ' />
      <div className='flex flex-col gap-2'>
        <span className=''>
          {title}
        </span>
        <p className='!text-white/50 max-w-[350px]'>
          {children}
        </p>
      </div>
    </div>
  )
}
