import { Button, RadioGroup, Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import getTeamMembers from '../../controllers/settings/team/getTeamMembers';
import Modal1 from '../../components/DIsplay/Modal/Modal1';
import EmailInput from '../../components/forms/EmailInput';
import RadioInput from '../../components/forms/RadioInput';
import Button1 from '../../components/forms/Button1';
import addTeamMember from '../../controllers/settings/team/addTeamMember';
import { useSnackbar } from 'notistack';
import CustomTable from '../../components/Table/CustomTable';
import { Delete, Edit, Settings } from '@mui/icons-material';
import TableMenu from '../../components/mini/TableMenu';



function ActionCol() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };
  
  return (
    <div className='flex justify-end px-2 w-full'>
      <Settings onClick={handleClick} className='text-primary/70 cursor-pointer' />
      <TableMenu open={open} anchorEl={anchorEl} setOpen={setOpen}>
        <Button className='flex btn-theme-light !test !justify-start !text-start items-center gap-2 p-2'>
          <Edit className='text-primary/50' fontSize='small' />
          Update role</Button>
        <Button className='flex btn-theme-light !test !justify-start !text-start items-center gap-2 p-2'>
          <Delete className='text-primary/50' fontSize='small' />
          Delete</Button>
      </TableMenu>
    </div>
  )
}
export default function TeamMembers() {
  const [data,setData] = useState([])
  const [filter,setFilter] = useState('All')
  const [loading,setLoading] = useState(false);

  
  useEffect(() => {
    if(filter !== '')
      load()
    //eslint-disable-next-line react-hooks/exhaustive-deps    
  },[filter])

  async function load() {
    let query = {
      filterBy: 'status',
      filterValue: filter
    }
    if(filter === 'All') query = "";

    setLoading(true);
    const res = await getTeamMembers((new URLSearchParams(query)).toString())
    setLoading(false);
    if(res.return) {
      let data = (res?.data?.data || []).map(obj => ({...obj,...obj.member,id: obj._id,name: obj.member.firstName+' '+obj.member.lastName}))
      setData(data);
      // console.log(res.data?.data)
    }
  }

  let columns = [
    {field: 'name',headerName: 'Member',flex: 1},
    {field: 'email',headerName: 'Email',flex: 1},
    {field: 'role',headerName: 'Role',flex: 2},
    {field: 'action',headerName: '',flex: 2,
      renderCell: (params) => {
        return (
          <ActionCol />
        )
      }
    },
  ]
  return (
    <div className='flex flex-col gap-4'>
      <div className='xmax-w-[500px] flex flex-col gap-4'>
        <div className='flex justify-between gap-4'>
          <h5 className='text-primary/50'>Team Members</h5>
          <InviteTeam reload={load} />
        </div>
        <Tabs className='bg-secondary px-2' value={filter} onChange={(ev,newVal) => setFilter(newVal)}>
          <Tab label='All' value='All'/>
          <Tab label='Invited' value='Active' />
        </Tabs>
        <CustomTable loading={loading} rows={data} columns={columns}
          autoHeight
          // components={{
          //   NoRowsOverlay: () => <div>No rows</div>,
          // }}
         />
        {/* <Table rows={data} columns={columns} /> */}
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

function InviteTeam({reload}) {
  const [open,setOpen] = useState(false);
  const [data,setData] = useState({email: '',role: ''});
  const roles = [
    {
      title: "TicketOfficer",
      label: "Ticket Officer",
      description: 'Able to search, book and issue tickets',
    },
    {
      title: "BookingOfficer",
      label: "Booking Officer",
      description: 'Search and book flights, stays and tours'
    },
    {
      title: "Developer",
      label: "Developer",
      description: 'Full access to orders as well as API access tokens.',
    },
    {
      title: 'Admin',
      label: 'Adminsitrator',
      description: 'Admin have full access to search, book and manage access tokens.'
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
      setOpen(false);
      enqueueSnackbar('Email have been sent to the user to join the app',{variant: 'success'})
      if(reload) reload();
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
                  <h6>{role.label}</h6>
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