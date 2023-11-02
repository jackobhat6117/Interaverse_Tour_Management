import React, { useCallback, useEffect, useState } from 'react'
import SelectInput from '../../components/form/SelectInput'
import { MenuItem } from '@mui/material'
import updateProfile from '../../controllers/user/updateProfile';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';


export default function SecuritySettings() {
  const {user} = useSelector(state => state.user.userData);
  const [data,setData] = useState({automaticLogout: 30,passwordExpiry: 'Never'});
  const [loading,setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  const handleSubmit = useCallback(async (ev) =>  {
    ev?.preventDefault();
    const currentDate = new Date();
    let futureDate = new Date(currentDate);
    if(typeof(data.passwordExpiry) === 'number')
      futureDate.setDate(currentDate.getDate() + data.passwordExpiry);
    else futureDate = '';

    // console.log({...data,passwordExpiry: futureDate})
    setLoading(true);
    const res = await updateProfile({...data,passwordExpiry: futureDate});
    setLoading(false);
    if(res.return) {
      enqueueSnackbar('Successful',{variant: 'success'})
    } else enqueueSnackbar(res.msg, {variant: 'error'})
  },[data,enqueueSnackbar])

  useEffect(() => {
    setData({automaticLogout: user.automaticLogout || '',passwordExpiry: 'Never'})
  },[user])

  useEffect(() => {
    if(JSON.stringify(data) !== JSON.stringify({automaticLogout: 30,passwordExpiry: 'Never'}) &&
      JSON.stringify(data) !== JSON.stringify({automaticLogout: user.automaticLogout,passwordExpiry: 'Never'})
    )
      handleSubmit()
  },[data,handleSubmit,user])

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-[600px]'>
      <div className='flex flex-col gap-1'>
        <h4>Logout User</h4>
        <p>Set users to be automatically logged out after a given time period.</p>
      </div>
      <div className='flex gap-4 justify-between  max-w-[450px]'>
        <b className=' py-2 text-primary/60'>Automatically log user out</b>
        <div>
          <SelectInput size='small' className='w-auto bg-secondary' label='' disabled={loading}
            value={data.automaticLogout}
            onChange={(ev) => {setData({...data,automaticLogout: ev.target.value});}}
          >
          <MenuItem value={30}>After 30 minutes</MenuItem>
          <MenuItem value={60}>After 60 minutes</MenuItem>
          <MenuItem value={90}>After 90 minutes</MenuItem>
          <MenuItem value={120}>After 120 minutes</MenuItem>
        </SelectInput>
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <h4>Password Expiry</h4>
        <p>Make users change their password after a given time period.</p>
      </div>
      <div className='flex gap-4 justify-between  max-w-[450px]'>
        <b className=' py-2 text-primary/60 '>Require users to change their password</b>
        <div>
          <SelectInput size='small' className='w-auto bg-secondary' label='' disabled={loading}
            value={data.passwordExpiry}
            onChange={(ev) => {setData({...data,passwordExpiry: ev.target.value});}}
          >
          <MenuItem value={'Never'}>Never</MenuItem>
          <MenuItem value={14}>Every 14 days</MenuItem>
          <MenuItem value={30}>Every 30 days</MenuItem>
          <MenuItem value={60}>Every 60 days</MenuItem>
        </SelectInput>
        </div>
      </div>
    </form>
  )
}