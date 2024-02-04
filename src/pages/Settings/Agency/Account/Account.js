import React, { useEffect, useState } from 'react'
import TextInput from '../../../../components/form/TextInput'
import EmailInput from '../../../../components/form/EmailInput'
import Button1 from '../../../../components/form/Button1'
import PasswordInput from '../../../../components/form/PasswordInput'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import updatePassword from '../../../../controllers/user/updatePassword'
import { useSelector } from 'react-redux'
import updateProfile from '../../../../controllers/user/updateProfile'
import resendVerifyEmail from '../../../../controllers/Auth/resendVerifyEmail'

export default function AccountSettings() {
  const {userData:{user}} = useSelector(state => state.user);
  const [data,setData] = useState({firstName: '',lastName: '',email: ''});
  const [loading,setLoading] = useState(false);
  const [resent,setResent] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const [haveAccountPassword,setHaveAccountPassword] = useState(!user?.googleId);


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

  async function handleResendLink() {
    setResent(true)
    const res = await resendVerifyEmail(data);
    if(res.return) {
      enqueueSnackbar(res.msg || 'Verification code sent.',{variant: 'success'});
      // setData({...data,otp: ''})
    } else {
      enqueueSnackbar(res.msg || 'Something went wrong!', {variant: 'error'})
      setResent(false)
    }

  }

  return (
    <div className='content-max-w flex flex-col gap-4'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <h5>Information</h5>
        <TextInput label={'Full name'} placeholder={'Okafor Chiemena'} 
          value={data.firstName+' '+data.lastName}
          onChange={(ev) => handleFullName(ev.target.value)}
        />
        <EmailInput 
          value={data.email}
          onChange={(ev) => setData({...data,email: ev.target.value})}
          tooltip={!user?.isEmailVerified ?
            <div>
              To complete your registration, please verify your email with the link we sent to <b>{data.email}. </b> 
              Didn't receive an email? <b className='cursor-pointer' onClick={handleResendLink}>{!resent ? 'Resend confirmation link' : 'Sent'}</b>
            </div>
            :null
          } 
        />
        <div className='flex justify-end'>
          <Button1 type='submit' loading={loading} className='sm:!w-auto'>Save Changes</Button1>
        </div>
      </form>
      {haveAccountPassword ? 
        <ChangePassword hasPassword={!user?.googleId} />
      :
        <button className='btn-outlined border-primary text-primary' onClick={() => setHaveAccountPassword(true)}>Create an account with your email</button>
      }
      <div className='bg-red-300/50 text-gray-600 flex flex-col gap-3 p-4 mt-10 rounded-lg'>
        <h5>Delete Account</h5>
        <p className='text-red-500 font-bold'>
          Once you delete your account, you will no longer have access to Miles Apps and API, all pending organization invitations will be revoked as well as organization memberships.
          If you'd like to delete your account, please contact <Link className='text-red-900' to="#">customer support.</Link>
        </p>
      </div>
    </div>
  )
}

function ChangePassword({hasPassword}) {
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
      <h5>Password</h5>
      {hasPassword ? 
        <PasswordInput label='Old Password'required
          value={data.oldPassword}
          onChange={(ev) => setData({...data,oldPassword: ev.target.value})}
        />
      :null}
      <div className='flex gap-4'>
        <PasswordInput className='flex-1' label={hasPassword?'New Password':'Enter Password'} required
          value={data.newPassword}
          onChange={(ev) => setData({...data,newPassword: ev.target.value})}
        />
        <PasswordInput className='flex-1' label='Confirm Password' required
          value={data.confirmPassword}
          onChange={(ev) => setData({...data,confirmPassword: ev.target.value})}
        />
      </div>
      <div className='flex justify-end'>
        <Button1 type='submit' loading={loading} className='sm:!w-auto'>Save Password</Button1>
      </div>
    </form>
  )
}