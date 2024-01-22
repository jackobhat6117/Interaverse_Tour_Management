import React, { useCallback, useEffect, useState } from 'react'
import SelectInput from '../../components/form/SelectInput'
import { MenuItem } from '@mui/material'
import updateProfile from '../../controllers/user/updateProfile';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { setUser } from '../../redux/reducers/userSlice';


export default function SecuritySettings() {
  const {user} = useSelector(state => state.user.userData);
  const [data,setData] = useState({automaticLogout: user.automaticLogout,passwordExpiry: user.passwordExpiry});
  const [loading,setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useDispatch();

  const handleSubmit = async (data) =>  {
    const currentDate = new Date();
    let futureDate = new Date(currentDate);
    if(typeof(data.passwordExpiry) === 'number')
      futureDate.setDate(currentDate.getDate() + data.passwordExpiry);
    else futureDate = null;

    // console.log({...data,passwordExpiry: futureDate})
    setLoading(true);
    const res = await updateProfile({...data,passwordExpiry: futureDate});
    setLoading(false);
    if(res.return) {
      dispatch(setUser(res.data))
      enqueueSnackbar('Successful',{variant: 'success'})
    } else enqueueSnackbar(res.msg, {variant: 'error'})
  }

  useEffect(() => {
    setData({automaticLogout: user.automaticLogout || '',passwordExpiry: user.passwordExpiry})
  },[user])

  // useEffect(() => {
  //   if(JSON.stringify(data) !== JSON.stringify({automaticLogout: user.automaticLogout,passwordExpiry: user.passwordExpiry}))
  //     handleSubmit()
  // },[data,handleSubmit,user])

  function handleChange(data) {
    setData(data);
    handleSubmit(data)
  }

  function getDaysDiff(target) {
    const targetDate = new Date(target);
    const currentDate = new Date();

    const timeDiff = targetDate.getTime() - currentDate.getTime();

    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))

    if(daysDiff <= 14)
      return 14;
    else if(daysDiff <= 30)
      return 30;
    else if(daysDiff <= 60)
      return 60;

    else return 'Never'
  } 

  return (
    <form className='flex flex-col gap-4 max-w-[600px]'>
      <div className='flex flex-col gap-1'>
        <h5>Logout User</h5>
        <p>Set users to be automatically logged out after a given time period.</p>
      </div>
      <div className='flex gap-4 justify-between  max-w-[450px]'>
        <b className=' py-2 text-primary/60'>Automatically log user out</b>
        <div>
          <SelectInput size='small' className='w-auto bg-secondary' label='' disabled={loading}
            value={data.automaticLogout}
            onChange={(ev) => handleChange({...data,automaticLogout: ev.target.value})}
          >
          <MenuItem value={30}>After 30 minutes</MenuItem>
          <MenuItem value={60}>After 60 minutes</MenuItem>
          <MenuItem value={90}>After 90 minutes</MenuItem>
          <MenuItem value={120}>After 120 minutes</MenuItem>
          <MenuItem value={1440}>After a day</MenuItem>
          <MenuItem value={10080}>After a week</MenuItem>
          <MenuItem value={43829}>After a month</MenuItem>
        </SelectInput>
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <h5>Password Expiry</h5>
        <p>Make users change their password after a given time period.</p>
      </div>
      <div className='flex gap-4 justify-between  max-w-[450px]'>
        <b className=' py-2 text-primary/60 '>Require users to change their password</b>
        <div>
          <SelectInput size='small' className='w-auto bg-secondary' label='' disabled={loading}
            value={data.passwordExpiry?getDaysDiff(data.passwordExpiry):'Never'}
            onChange={(ev) => {handleChange({...data,passwordExpiry: ev.target.value});}}
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