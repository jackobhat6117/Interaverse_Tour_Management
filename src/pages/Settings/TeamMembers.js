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
import deleteTeamMember from '../../controllers/settings/team/deleteTeamMember';
import LearnMoreButton from '../../components/mini/LearnMoreButton';
import activateTeamMember from '../../controllers/settings/team/activateTeamMember';
import deactivateTeamMember from '../../controllers/settings/team/deactivateTeamMember copy';



function ActionCol({params,reload}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const {enqueueSnackbar} = useSnackbar();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  async function handleDelete() {
    const res = await deleteTeamMember(params.id);
    if(res.return) {
      enqueueSnackbar('Removed',{variant: 'success'})
      reload && reload();
    } else
      enqueueSnackbar(res.msg,{variant: 'error'})
  }
  async function handleActivate() {
    const res = await activateTeamMember(params.id);
    if(res.return) {
      enqueueSnackbar('Activated',{variant: 'success'})
      reload && reload();
    } else
      enqueueSnackbar(res.msg,{variant: 'error'})
  }
  async function handleDeactivate() {
    const res = await deactivateTeamMember(params.id);
    if(res.return) {
      enqueueSnackbar('Deactivated',{variant: 'success'})
      reload && reload();
    } else
      enqueueSnackbar(res.msg,{variant: 'error'})
  }
  
  return (
    <div className='flex justify-end px-2 w-full'>
      <Settings onClick={handleClick} className='text-primary/70 cursor-pointer' />
      <TableMenu open={open} anchorEl={anchorEl} setOpen={setOpen}>
        {['Inactive','Deactivated'].includes(params?.row?.status) ? 
          <Button className='flex btn-theme-light !test !justify-start !text-start items-center gap-2 p-2'
            onClick={handleActivate}
          >
            <Edit className='text-primary/50' fontSize='small' />
            Activate</Button>
        :
          <Button className='flex btn-theme-light !test !justify-start !text-start items-center gap-2 p-2'
            onClick={handleDeactivate}
          >
            <Edit className='text-primary/50' fontSize='small' />
            Deactivate</Button>
        }
        <Button className='flex btn-theme-light !test !justify-start !text-start items-center gap-2 p-2'
          onClick={handleDelete}
        >
          <Delete className='text-primary/50' fontSize='small'/>
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
          <ActionCol reload={load} params={params} />
        )
      }
    },
  ]
  return (
    <div className='flex flex-col gap-4'>
      {!data.length ? (
        <div className=' text-center flex flex-col items-center gap-8'>
          <h4>You don't have any team members</h4>
          <div className='flex gap-2'>
            <LearnMoreButton label='Learn about team members' />
            <InviteTeam reload={load} label='Invite a team member' />
          </div>
        </div>
      ):(

      <div className='xmax-w-[500px] flex flex-col gap-4'>
        <div className='flex justify-between items-center gap-4'>
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
      )}
    </div>
  )
}

function InviteTeam({reload,label='Invite'}) {
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
    <div className='flex flex-col'>
      <Button1 variant='contained' className='!capitalize' onClick={() => setOpen(true)}>{label}</Button1>
      <Modal1 open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit} className='p-4 flex flex-col gap-4'>
          <h5>Invite a team member</h5>
          <EmailInput label='email' value={data.email} onChange={(ev) => setData({...data,email: ev.target.value})} />
          <div className='text-start'>
            Role
            <RadioGroup value={data.role} onChange={(ev) => setData({...data,role: ev.target.value})} className='flex flex-col gap-2'>
              {roles.map((role,i) => (
                <RadioInput key={i} value={role.title} checked={data.role === role.title}>
                  <div className='flex flex-col'>
                    <h6>{role.label}</h6>
                    <p className='text-primary/80'>{role.description}</p>
                  </div>
                </RadioInput>
              ))}
            </RadioGroup>
          </div>
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