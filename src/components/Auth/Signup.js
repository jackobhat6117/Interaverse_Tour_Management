import React, { useState } from 'react'
import textlogo from '../../assets/icons/textlogo.png'
import EmailInput from '../forms/EmailInput'
import PasswordInput from '../forms/PasswordInput'
import Button1 from '../forms/Button1'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import flightCheckedIcon from '../../assets/icons/Checkmark.png';
import hotelCheckedIcon from '../../assets/icons/Layer 2.png';
import packageCheckedIcon from '../../assets/icons/Checkmark (1).png';
import TextInput from '../forms/TextInput'
import { signupReqData } from '../../data/user/Auth/signupReq'
import signup from '../../controllers/Auth/signup'
import { useSnackbar } from 'notistack'
import { Radio, RadioGroup } from '@mui/material'
import Checkbox from '../forms/Checkbox'


export default function Signup() {
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search)
  let type = searchParam.get('type')
  const [data,setData] = useState({...signupReqData,userType: type || "",confirmPassword: ''});
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
        <div className='lg:px-20 p-10'>
          <img src={textlogo} alt='Miles' />
        </div>
        <div className='flex flex-col p-10 lg:px-20 flex-1 gap-6'>
          <h3 className='pb-4'>Start selling travel today!</h3>
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
      {!type ? (
        <div className='flex flex-col justify-center gap-10 p-10 flex-1 bg-[#CCE2FA]'>
          <h3>Tell us about your business</h3>
          <RadioGroup name='userType' className='flex flex-col gap-4' value={data.userType} onChange={((ev) => setData({...data,userType: ev.target.value}))}>
            <label className='card cursor-pointer p-4 flex gap-4'>
                <Radio value={'Agency'} />
                <div className='flex flex-col gap-4'>
                  <h4>Travel Agency</h4>
                  <p>Access airline, hotel and tours inventory, make bookings and issue tickets on behalf of your customers</p>
                </div>
            </label>
            <label className='card cursor-pointer p-4 flex gap-4'>
                <Radio value={'Business'} />
                <div className='flex flex-col gap-4'>
                  <h4>Business</h4>
                  <p>Access airline, hotel and tours inventory, make bookings and issue tickets on behalf of your customers</p>
                </div>
            </label>
            <label className='card cursor-pointer p-4 flex gap-4'>
                <Radio value={'Customer'} />
                <div className='flex flex-col gap-4'>
                  <h4>Freelancer</h4>
                  <p>Access airline, hotel and tours inventory, make bookings and issue tickets on behalf of your customers</p>
                </div>
            </label>
            <label className='card cursor-pointer p-4 flex gap-4'>
                <Radio value={'Affiliate'} />
                <div className='flex flex-col gap-4'>
                  <h4>Developer</h4>
                  <p>Access airline, hotel and tours inventory, make bookings and issue tickets on behalf of your customers</p>
                </div>
            </label>
            <Link to={`?view=register&type=${data.userType}`}><Button1 size='large' className='p-3' >Signup</Button1></Link>
          </RadioGroup>
        </div>
      ):(
        <form onSubmit={handleSubmit} className='w-1/2 flex flex-col items-center flex-1 sm:bg-[#CCE2FA] sm:p-10'>
          <div className='lg:px-20 px-4 sm:hidden shadow-md w-full mb-2 bg-secondary'>
            <img src={textlogo} alt='Miles' className=' h-8 my-2' />
          </div>
          <div className='bg-secondary rounded-lg p-4 sm:card flex flex-col gap-5 m-2'>
            <h3 className='pb-4 text-center sm:text-left'>Enter Sign up Details</h3>
            <TextInput required label={'First Name'} placeholder={'e.g John'}
              value={data.firstName}
              onChange={(ev) => setData({...data,firstName: ev.target.value})}
            />
            <TextInput required label={'Last Name'} placeholder={'e.g Doe'} 
              value={data.lastName}
              onChange={(ev) => setData({...data,lastName: ev.target.value})}          
            />
            <EmailInput required
              value={data.email}
              onChange={(ev) => setData({...data,email: ev.target.value})}          
            />
            {/* <PhoneNumberInput required
              value={data.phone}
              onChange={(ev) => setData({...data,phone: ev.target.value})}          
            /> */}
            <PasswordInput required
              value={data.password}
              onChange={(ev) => setData({...data,password: ev.target.value})}          
            />
            <PasswordInput label={'Confirm password'} required
              value={data.confirmPassword}
              onChange={(ev) => setData({...data,confirmPassword: ev.target.value})}
            />
            <div className='flex flex-col gap-2 text-primary/70'>
              <Checkbox labelClassName='bg-secondary'>
                I’d like to receive occasionaly updates
              </Checkbox>
              <Checkbox labelClassName='bg-secondary'>
                I’ve read and agree with Miles Terms & Privacy Policy
              </Checkbox>
            </div>
            <Button1 loading={loading} type={'submit'} label={'Sign up'}></Button1>
            <div className='self-center text-center flex flex-col gap-3'>
              <div className='flex gap-2 items-center'>
                <p className='text-primary/40'>Already have an account?</p><Link className='text-theme1 font-bold' to="?login">Login</Link>
              </div>
            </div>
          </div>
        </form>
      )}
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