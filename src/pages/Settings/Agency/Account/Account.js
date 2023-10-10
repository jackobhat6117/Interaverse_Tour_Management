import React, { useEffect, useState } from 'react'
import TextInput from '../../../../components/forms/TextInput'
import EmailInput from '../../../../components/forms/EmailInput'
import Button1 from '../../../../components/forms/Button1'
import PasswordInput from '../../../../components/forms/PasswordInput'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import updatePassword from '../../../../controllers/user/updatePassword'
import { useSelector } from 'react-redux'
import updateProfile from '../../../../controllers/user/updateProfile'

export default function AccountSettings() {
  const {user} = useSelector(state => state.user.userData);
  const [data,setData] = useState({firstName: '',lastName: '',email: ''});
  const [loading,setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    setData(data => ({...data,firstName: user?.firstName || '',lastName: user?.lastName || '',email: user?.email || ''}))
  },[user])

  function handleFullName(val) {
    let fullName = val.split(' ');
    let firstName = fullName[0]
    let lastName = fullName[1]
    setData({...data,firstName,lastName})
  }

  async function handleSubmit(ev) {
    ev && ev.preventDefault();

    setLoading(true);
    const res = await updateProfile(data);
    setLoading(false);
    if(res.return) {
      enqueueSnackbar('Profile Updated.',{variant: 'success'})
    } else enqueueSnackbar(res.msg,{variant: 'error'})
  }

  return (
    <div className='content-max-w flex flex-col gap-4'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <h4>Information</h4>
        <TextInput label={'Full name'} placeholder={'Okafor Chiemena'} 
          value={data.firstName+' '+data.lastName}
          onChange={(ev) => handleFullName(ev.target.value)}
        />
        <EmailInput 
          value={data.email}
          onChange={(ev) => setData({...data,email: ev.target.value})}
          tooltip={
            <div>
              To complete your registration, please verify your email with the link we sent to <b>abcdefxyz@gmail.com.</b> 
              Didn't receive an email? <b>Resend confirmation link</b>
            </div>
          } 
        />
        <div className='flex justify-end'>
          <Button1 type='submit' loading={loading} className='!w-auto'>Save Changes</Button1>
        </div>
      </form>
      <ChangePassword />
      <div className='bg-red-300 text-gray-600 flex flex-col gap-3 p-4 rounded-lg'>
        <h5>Delete Account</h5>
        <p className='text-red-500 font-bold'>
          Once you delete your account, you will no longer have access to Miles Apps and API, all pending organization invitations will be revoked as well as organization memberships.
          If you'd like to delete your account, please contact <Link className='text-red-900' to="#">customer support.</Link>
        </p>
      </div>
    </div>
  )
}

function ChangePassword() {
  const [data,setData] = useState({oldPassword: '',newPassword: '',confirmPassword: ''});
  const {enqueueSnackbar} = useSnackbar();
  const [loading,setLoading] = useState(false);

  async function handleSubmit(ev) {
    ev.preventDefault();

    if(data.confirmPassword !== data.newPassword)
      return enqueueSnackbar("Password's doesn't match!",{variant: 'error'})

    setLoading(true);
    const res = await updatePassword(data);
    setLoading(false);
    if(res.return) {
      enqueueSnackbar('Password updated',{variant: 'success'})
    } else enqueueSnackbar(res.msg,{variant: 'error'})
    
  }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <h4>Password</h4>
      <PasswordInput label='Old Password'required
        value={data.oldPassword}
        onChange={(ev) => setData({...data,oldPassword: ev.target.value})}
      />
      <div className='flex gap-4'>
        <PasswordInput className='flex-1' label='New Password' required
          value={data.newPassword}
          onChange={(ev) => setData({...data,newPassword: ev.target.value})}
        />
        <PasswordInput className='flex-1' label='Confirm Password' required
          value={data.confirmPassword}
          onChange={(ev) => setData({...data,confirmPassword: ev.target.value})}
        />
      </div>
      <div className='flex justify-end'>
        <Button1 type='submit' loading={loading} className='!w-auto'>Save Password</Button1>
      </div>
    </form>
  )
}