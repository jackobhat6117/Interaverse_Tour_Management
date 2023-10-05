import React, { useState } from 'react'
import TextInput from '../../components/forms/TextInput'
import Button1 from '../../components/forms/Button1'
import { ProfilePicture } from '../../components/forms/ProfilePicture'
import { useSnackbar } from 'notistack'
import addCustomKey from '../../controllers/settings/paystack/addCustomKey'
import updateProfile from '../../controllers/user/updateProfile'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/reducers/userSlice'

export default function Settings() {
  const {user} = useSelector(state => state.user.userData);
  const [data,setData] = useState({
    agencyLogo: user?.detail?.agencyLogo || '',
    registeredBusinessName: user?.detail?.registeredBusinessName || '',
    agencyUrl: user?.detail?.agencyUrl || '',
  })
  const {enqueueSnackbar} = useSnackbar();
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();

  console.log(user)

  async function handleSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData();
    Object.entries(data).map(([key,val]) => formData.append(key,val));

    setLoading(true);
    const res = await updateProfile(formData);
    setLoading(false);
    if(res.return) {
      enqueueSnackbar('Profile Updated',{variant: 'success'})
      // console.log(res.data);
      if(res?.data?.data)
        dispatch(setUser(res.data.data))
    } else enqueueSnackbar(res.msg || 'Error',{variant: 'error'})
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

  }
  return (
    <div className='flex flex-col gap-4'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-[700px]'>
        <div className='flex gap-4'>
          <ProfilePicture
            value={data.agencyLogo}
            onChange={(value) => {setData({...data,agencyLogo: value}); console.log(value)}}
          
          />
          <div className='flex flex-col justify-center'>
            <h3>Logo</h3>
            <p>Pick a logo for your agency. The upload file size limit is 1MB.</p>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <TextInput label={'Agency Name'} placeholder={'xyz team'}
            value={data.registeredBusinessName}
            onChange={(ev) => setData({...data,registeredBusinessName: ev.target.value})}
          />
          <div>
            <TextInput
              value={data.agencyUrl}
              onChange={(ev) => setData({...data,agencyUrl: ev.target.value})}
              label={'Agency URL'} placeholder={'app.miles.com/agencyname'}/>
            <div className='tooltip'>This is a unique identifier for your team. It must contain only URL-friendly characters.</div>
          </div>
        </div>
        <div className='flex sm:justify-end'>
          <Button1 loading={loading} type='submit' className='!self-end !text-base sm:!w-auto !px-4 !capitalize'>Save Changes</Button1>
        </div>
      </form>
      <PaymentGateway />
    </div>
  )
}

function PaymentGateway() {
  const [data,setData] = useState({
    "clientId":"",
    "clientSecret":"",
    "webhook": ''
  });
  const {enqueueSnackbar} = useSnackbar();
  const [loading,setLoading] = useState(false);

  async function handleSubmit(ev) {
    ev.preventDefault()
    
    setLoading(true);
    const res = await addCustomKey(data);
    setLoading(false);
    if(res.return) {
      enqueueSnackbar('Successfull',{variant: 'success'})
    } else enqueueSnackbar(res.msg, {variant: 'error'})
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-6 max-w-[700px] py-6'>
      <div className='flex flex-col gap-3'>
        <h5>Payment Gateway</h5>
        <p>Use your own payment gateway by providing your Paystack key details.</p>
      </div>
      <div className='flex flex-col gap-6'>
        <TextInput label={'Paystack Secret Key'} required
          value={data.clientSecret}
          onChange={(ev) => setData({...data,clientSecret: ev.target.value})}
          placeholder={'Sk_2909320932'}/>
        <TextInput label={'Paystack Public Key'} required
          value={data.clientId}
          onChange={(ev) => setData({...data,clientId: ev.target.value})}
          placeholder={'Pk_2909320932'}/>
        <TextInput label={'webhook'}
          value={data.webhook}
          onChange={(ev) => setData({...data,webhook: ev.target.value})}
        />
      </div>
      <div className='flex sm:justify-end'>
        <Button1 type='submit' loading={loading} className='sm:!self-end !text-base sm:!w-auto !px-4 !capitalize'>Save Changes</Button1>
      </div>
    </form>
  )
}