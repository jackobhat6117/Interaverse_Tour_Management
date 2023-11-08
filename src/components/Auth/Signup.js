import React, { useState } from 'react'
import textlogo from '../../assets/icons/textlogo.png'
import logo from '../../assets/icons/logo.png'
import EmailInput from '../form/EmailInput'
import PasswordInput from '../form/PasswordInput'
import Button1 from '../form/Button1'
import { Link, useNavigate } from 'react-router-dom'
import flightCheckedIcon from '../../assets/icons/Checkmark.png';
import hotelCheckedIcon from '../../assets/icons/Layer 2.png';
import packageCheckedIcon from '../../assets/icons/Checkmark (1).png';
import TextInput from '../form/TextInput'
import { signupReqData } from '../../data/user/Auth/signupReq'
import signup from '../../controllers/Auth/signup'
import { useSnackbar } from 'notistack'
import Checkbox from '../form/Checkbox'
import PhoneNumberInput from '../form/PhoneNumberInput'


export default function Signup() {
  // const location = useLocation();
  // const searchParam = new URLSearchParams(location.search)
  // let type = searchParam.get('type')
  const [data,setData] = useState({...signupReqData,userType: "Agent",confirmPassword: ''});
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  async function handleSubmit(ev) {
    ev.preventDefault();

    setLoading(true);
    const res = await signup(data);
    setLoading(false);
    if(res.return) {
      enqueueSnackbar('Registered Successfully.',{variant: 'success'});
      setTimeout(() => {
        navigate(`?view=verify&email=${data.email}`)
      },2000)
    } else enqueueSnackbar(res.msg || 'Registration Failed.', {variant: 'error'})
  }

  return (
    <div className='flex min-h-screen '>
      <div className='w-full flex-1 hidden md:flex flex-col'>
        <div className='lg:px-20 p-10 flex gap-2'>
          <img src={logo} alt='Miles' className='object-contain' />
          <img src={textlogo} alt='Miles' />
        </div>
        <div className='flex flex-col p-10 lg:px-20 flex-1 gap-6'>
          <h4 className='pb-4 '>Sell travel online seamlessly</h4>
          <Service title={'Get instant connection to top flight GDS'} icon={flightCheckedIcon}>
            Search, book and issue tickets - without the need for accreditation or industry expertise.
          </Service>
          <Service title={'Sell stays at over 1m hotels globally'} icon={hotelCheckedIcon}>
            Earn commissions by promoting accommodations at more than 1 million properties globally.
          </Service>
          <Service title={'Upsell your customers with tour packages'} icon={packageCheckedIcon}>
            Give your customers the flexibility they want. Offer them tours, events and activities from around the globe.
          </Service>
        </div>
      </div>
      {/* {!type ? ( */}
        {/* <div className='flex flex-col justify-center gap-5 p-10 py-5 flex-1 bg-[#CCE2FA]'>
          <h5 className='px-4'>Select your business type</h5>
          <RadioGroup name='userType' className='flex flex-col gap-4' value={data.userType} onChange={((ev) => setData({...data,userType: ev.target.value}))}>
            <label className='card cursor-pointer p-4 py-2 flex items-center gap-4'>
                <Radio value={'Agent'} />
                <div className='flex flex-col'>
                  <h5>Travel Agency</h5>
                  <p>Allow your customers to search, book and pay for flights, stays and tours on your own website. Manage bookings and issue tickets.</p>
                </div>
            </label>
            <label className='card cursor-pointer p-4 py-2 flex items-center gap-4'>
                <Radio value={'Business'} />
                <div className='flex flex-col'>
                  <h5>Business</h5>
                  <p>Search, book and pay for flights, stays and tours. Manage bookings and issue tickets.</p>
                </div>
            </label>
            <label className='card cursor-pointer p-4 py-2 flex items-center gap-4'>
                <Radio value={'Customer'} />
                <div className='flex flex-col'>
                  <h5>Freelancer</h5>
                  <p>Search, book and pay for flights, stays and tours for your customers using the Miles dashboard. Manage bookings and issue tickets.</p>
                </div>
            </label>
            <label className='card cursor-pointer p-4 py-2 flex items-center gap-4'>
                <Radio value={'Affiliate'} />
                <div className='flex flex-col'>
                  <h5>Developer</h5>
                  <p>Access to comprehensive documentation for the Miles API</p>
                </div>
            </label>
          </RadioGroup>
          <Link to={`?view=register&type=${data.userType}`}><Button1 size='large' className='p-3' >Signup</Button1></Link>
          <div className='self-center text-center flex flex-col gap-3'>
            <div className='flex gap-2 items-center'>
              <p className='text-primary/40'>Already have an account?</p><Link className='text-theme1 font-bold' to="?login">Login</Link>
            </div>
          </div>
        </div> */}
      {/* ):( */}
        <form onSubmit={handleSubmit} className='w-1/2 flex flex-col items-center flex-1 sm:bg-[#CCE2FA] sm:p-10'>
          <div className='lg:px-20 px-4 sm:hidden shadow-md w-full mb-2 bg-secondary'>
            <img src={textlogo} alt='Miles' className=' h-8 my-2' />
          </div>
          <div className='bg-secondary rounded-lg px-4 !py-6 sm:card flex flex-col gap-5  sticky top-10'>
            <h5 className='pb-2 text-center sm:text-left'>Enter Sign up Details</h5>
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
            <EmailInput size='small' required
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
              <Checkbox labelClassName='bg-secondary px-2 py-1'>
                I’ve read and agree with Miles Terms & Privacy Policy
              </Checkbox>
            </div>
            <Button1 loading={loading} type={'submit'} label={'Sign up'}></Button1>
            <div className='self-center text-center flex flex-col gap-3'>
              <div className='flex gap-2 items-center'>
                <p className='text-primary/40'>Already have an account?</p><Link className='text-theme1 font-bold' to="?login">Login</Link>
              </div>
              <Link to='?view=register' className='text-primary/50 font-bold'>Go back</Link>
            </div>
          </div>
        </form>
      {/* )} */}
    </div>
  )
}

function Service({title,icon,children}) {
  return (
    <div className='flex gap-5 text-primary/70'>
      <img src={icon} alt='service' className='w-10 h-10 object-contain ' />
      <div className='flex flex-col gap-2'>
        <b className=''>
          {title}
        </b>
        <p className='text-primary/50'>
          {children}
        </p>
      </div>
    </div>
  )
}
