import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EmailInput from '../../components/forms/EmailInput'
import Button1 from '../../components/forms/Button1'
import { useSelector } from 'react-redux'
import getContactMails from '../../controllers/contactMail/getContactMails'
import removeContactMail from '../../controllers/contactMail/removeContactMail'
import { useSnackbar } from 'notistack'
import createContactMail from '../../controllers/contactMail/createContactMail'


export default function ContactEmails() {
  const {user} = useSelector(state => state.user.userData);
  const [data,setData] = useState([]);
  const [email,setEmail] = useState('');
  const {enqueueSnackbar} = useSnackbar();
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    load();
  },[])

  async function load() {
    setLoading(true);
    const res = await getContactMails();
    setLoading(false);
    if(res.return) {
      setData(res.data?.data)
    }
  }

  async function handleRemove(id) {
    setLoading(true);
    const res = await removeContactMail(id);
    setLoading(false);
    if(res.return) {
      load();
      enqueueSnackbar('Removed',{variant: 'success'})
    } else enqueueSnackbar(res.msg,{variant: 'error'})
  }

  async function handleAdd() {
    const res = await createContactMail({email,actions: ['Account']});
    if(res.return) {
      enqueueSnackbar('Email Added',{variant: 'success'})
      load();
    } else enqueueSnackbar(res.msg,{variant: 'error'})
  }
  // console.log(data);
  return (
    <div className='flex flex-col gap-4 !text-primary/60 max-w-[600px]'>
      <div className='flex gap-4'>
        <div className='!btn'>Support</div>
        <Button className='btn-theme-light'>Schedule Changes</Button>
      </div>
      <p>All our communication will be sent by default to your email {user.email}</p>
      <p>However, when opening a support ticket, you can choose to follow up with an alternative email address, which can be set-up by admins for your organisation.</p>
      <div className='flex gap-3'>
        <EmailInput label={'Your email'} className='flex-1 w-full' 
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <Button1 className='!w-auto' onClick={handleAdd}>Add</Button1>
      </div>
      <div className='flex flex-col gap-3 py-3'>
        {loading ? (
          <div className='border-theme1 flex justify-center text-4xl'>
            <div className='load w-20 h-20'></div>
          </div>
        ):null}
        {data.map((obj,i) => (
          <div className='flex justify-between gap-3'>
            {obj.email}
            <Button className='!text-red-500 !font-bold' onClick={() => handleRemove(obj._id)}>Remove</Button>
          </div>
        ))}
      </div>
    </div>
  )
}