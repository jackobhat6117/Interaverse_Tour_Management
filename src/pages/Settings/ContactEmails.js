import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EmailInput from '../../components/form/EmailInput'
import Button1 from '../../components/form/Button1'
import { useSelector } from 'react-redux'
import getContactMails from '../../controllers/contactMail/getContactMails'
import removeContactMail from '../../controllers/contactMail/removeContactMail'
import { useSnackbar } from 'notistack'
import createContactMail from '../../controllers/contactMail/createContactMail'
import { Link } from 'react-router-dom'


export default function ContactEmails() {
  const {user} = useSelector(state => state.user.userData);
  const [data,setData] = useState([]);
  const [tab,setTab] = useState('support');
  const [email,setEmail] = useState('');
  const {enqueueSnackbar} = useSnackbar();
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    load();
  },[])

  async function load() {
    setLoading(true);
    let query = {
      filterBy: 'type',
      filterValue: 'Support',
    }
    const res = await getContactMails((new URLSearchParams(query)).toString());
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
    const res = await createContactMail({email,type:'Support',actions: ['Account']});
    if(res.return) {
      enqueueSnackbar('Email Added',{variant: 'success'})
      load();
      setEmail('')
    } else enqueueSnackbar(res.msg,{variant: 'error'})
  }
  // console.log(data);
  return (
    <div className='flex flex-col gap-4 !text-primary/60 max-w-[600px]'>
      <div className='flex gap-4'>
        <div className={`${tab === 'support' ? '!btn' : 'btn-theme-light'}`} onClick={() => setTab('support')}>Support</div>
        <div className={`${tab === 'schedule' ? '!btn' : 'btn-theme-light'}`} onClick={() => setTab('schedule')}>Schedule Changes</div>
      </div>
      {tab === 'schedule' ? 
        <ScheduleChanges />
      :
      <div className='flex flex-col gap-4'>
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
            <div key={i} className='flex justify-between gap-3'>
              {obj.email}
              <Button className='!text-red-500 !font-bold' onClick={() => handleRemove(obj._id)}>Remove</Button>
            </div>
          ))}
        </div>
      </div>
      }
    </div>
  )
}

function ScheduleChanges() {
  const [data,setData] = useState([]);
  const [email,setEmail] = useState('');
  const [loading,setLoading] = useState(false);
  const [loadingAdd,setAddLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    load();
  },[])

  async function load() {
    setLoading(true);
    let query = {
      filterBy: 'type',
      filterValue: 'Event',
    }
    const res = await getContactMails((new URLSearchParams(query)).toString());
    setLoading(false);
    if(res.return) {
      setData(res.data?.data)
    }
  }
  async function handleAdd() {
    setAddLoading(true);
    const res = await createContactMail({email,type: 'Event',actions: ['Account']});
    setAddLoading(false);
    if(res.return) {
      enqueueSnackbar('Email Added',{variant: 'success'})
      load();
    } else enqueueSnackbar(res.msg,{variant: 'error'})
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
  return (
    <div className='flex flex-col gap-4'>
      <p>This is where you can add a designated notification email for when an order has been changed.</p>
      <p>We want to ensure that if one of your bookings is changed by the airline, you are told as soon as possible so you can ensure the traveller is notified.</p>
      <p>If you have a designated notification email set up, we will send it there. If not, we will send it to all the administrators in your organisation.</p>
      <div className='flex gap-3 items-start'>
        <EmailInput label={'Your email'} className='flex-1 w-full' 
          value={email}
          tooltip={
            <p>You can try our <Link className='underline' to="/settings/developer?view=webhook">webhooks</Link> for notifications like this, including changes to your orders.</p>
          }
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <Button1 className='!w-auto' onClick={handleAdd} loading={loadingAdd}>Add</Button1>
      </div>
      <div className='flex flex-col gap-3 py-3'>
        {loading ? (
          <div className='border-theme1 flex justify-center text-4xl'>
            <div className='load w-20 h-20'></div>
          </div>
        ):null}
        {data.map((obj,i) => (
          <div key={i} className='flex justify-between gap-3'>
            {obj.email}
            <Button className='!text-red-500 !font-bold' onClick={() => handleRemove(obj._id)}>Remove</Button>
          </div>
        ))}
      </div>
    </div>
  )
}