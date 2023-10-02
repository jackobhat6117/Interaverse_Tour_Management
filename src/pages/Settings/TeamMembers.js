import { Button, RadioGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Table from '../../components/Table/Table';
import getTeamMembers from '../../controllers/settings/team/getTeamMembers';
import Modal1 from '../../components/DIsplay/Modal/Modal1';
import EmailInput from '../../components/forms/EmailInput';
import RadioInput from '../../components/forms/RadioInput';
import Button1 from '../../components/forms/Button1';
import addTeamMember from '../../controllers/settings/team/addTeamMember';
import { useSnackbar } from 'notistack';


export default function TeamMembers() {
  const [data,setData] = useState([
    {id: 1,name: 'John Doe',email: 'johndoe@gmail.com',role: 'Owner'}
  ])

  useEffect(() => {
    load();
  },[])

  async function load() {
    const res = await getTeamMembers()
    if(res.return) {
      let data = (res?.data?.data || []).map(obj => ({...obj,...obj.member,name: obj.member.firstName+' '+obj.member.lastName}))
      setData(data);
      // console.log(res.data?.data)
    }
  }
  let columns = [
    {field: 'name',headerName: 'Member'},
    {field: 'email',headerName: 'Email'},
    {field: 'role',headerName: 'Role'},
  ]
  return (
    <div className='flex flex-col gap-4'>
      <div className='max-w-[500px] flex flex-col gap-4'>
        <div className='flex justify-between gap-4'>
          <h5 className='text-primary/50'>Active</h5>
          <InviteTeam />
        </div>
        <Table rows={data} columns={columns} />
        {/* <table className='w-full my-2'>
          <thead className='!bg-theme1/20 p-2'>
            <TD>Member</TD>
            <TD>Email</TD>
            <TD>Role</TD>
          </thead>
          <tbody>
            <tr>
              <TD>John Doe</TD>
              <TD>johndoe@gmail.com</TD>
              <TD>Owner</TD>
            </tr>
            <tr>
              <TD>John Doe</TD>
              <TD>johndoe@gmail.com</TD>
              <TD>Owner</TD>
            </tr>
          </tbody>
        </table> */}
      </div>
    </div>
  )
}

function InviteTeam() {
  const [open,setOpen] = useState(false);
  const [data,setData] = useState({email: '',role: ''});
  const roles = [
    {
      title: "TicketOfficer",
      description: 'Able to search, book and issue tickets',
    },
    {
      title: "BookingOfficer",
      description: 'Search and book flights, stays and tours'
    },
    {
      title: "Developer",
      description: 'Full access to orders as well as API access tokens.',
    },
    {
      title: 'Owner',
      description: 'Owner have full read and write privileges.'
    }
  ]
  const [loading,setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  async function handleSubmit(ev) {
    ev.preventDefault();

    setLoading(true);
    const res = await addTeamMember(data);
    setLoading(false);
    if(res.return) {
      enqueueSnackbar('Invitation Successful',{variant: 'success'})
    } else 
      enqueueSnackbar(res.msg || 'Invitation Error',{variant: 'error'})
  }

  return (
    <div>
      <Button variant='contained' onClick={() => setOpen(true)}>Invite</Button>
      <Modal1 open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit} className='p-4 flex flex-col gap-4'>
          <h5>Invite a team member</h5>
          <EmailInput label='email' value={data.email} onChange={(ev) => setData({...data,email: ev.target.value})} />
          <RadioGroup value={data.role} onChange={(ev) => setData({...data,role: ev.target.value})} className='flex flex-col gap-2'>
            {roles.map((role,i) => (
              <RadioInput value={role.title} checked={data.role === role.title}>
                <div className='flex flex-col'>
                  <h6>{role.title}</h6>
                  <p className='text-primary/80'>{role.description}</p>
                </div>
              </RadioInput>
            ))}
          </RadioGroup>
          <div className='flex gap-2'>
            <div className='w-[30%]'>
              <Button1 type='submit' className='btn-theme-light'>Cancel</Button1>
            </div>
            <div className='flex-1'>
              <Button1 loading={loading} type='submit' className=''>Send Invite</Button1>
            </div>
          </div>
        </form>
      </Modal1>
    </div>
  )
}