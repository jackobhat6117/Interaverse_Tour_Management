import React, { useState } from 'react'
import textlogo from '../../assets/icons/textlogo.png'
import EmailInput from '../forms/EmailInput'
import PasswordInput from '../forms/PasswordInput'
import Button1 from '../forms/Button1'
import { Link, useNavigate } from 'react-router-dom'
import flightCheckedIcon from '../../assets/icons/Checkmark.png';
import hotelCheckedIcon from '../../assets/icons/Layer 2.png';
import packageCheckedIcon from '../../assets/icons/Checkmark (1).png';
import TextInput from '../forms/TextInput'
import { signupReqData } from '../../data/user/Auth/signupReq'
import signup from '../../controllers/Auth/signup'
import { useSnackbar } from 'notistack'


export default function Signup() {
  const [data,setData] = useState({...signupReqData,confirmPassword: ''});
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
        navigate('?view=verify')
      },2000)
    } else enqueueSnackbar('Registration Failed.', {variant: 'error'})
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
          <Service title={'Get instant connection to top flight GDS'} icon={hotelCheckedIcon}>
            Search, book and issue tickets - without the need for accreditation or industry expertise.
          </Service>
          <Service title={'Get instant connection to top flight GDS'} icon={packageCheckedIcon}>
            Search, book and issue tickets - without the need for accreditation or industry expertise.
          </Service>
        </div>
      </div>
      <form onSubmit={handleSubmit} className='w-1/2 flex flex-col items-center flex-1 bg-[#CCE2FA] p-10'>
        <div className='card flex flex-col gap-5'>
          <h3 className='pb-4'>Enter Sign up Details</h3>
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
          <PasswordInput required
            value={data.password}
            onChange={(ev) => setData({...data,password: ev.target.value})}          
          />
          <PasswordInput label={'Confirm password'} required
            value={data.confirmPassword}
            onChange={(ev) => setData({...data,confirmPassword: ev.target.value})}
          />
          <Button1 loading={loading} type={'submit'} label={'Sign up'}></Button1>
          <div className='self-center text-center flex flex-col gap-3'>
            <div className='flex gap-2 items-center'>
              <p className='text-primary/40'>Already have an account?</p><Link className='text-theme1 font-bold' to="?login">Login</Link>
            </div>
          </div>
        </div>
      </form>
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