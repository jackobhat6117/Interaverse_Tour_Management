import { MenuItem, RadioGroup, Tab, Tabs } from '@mui/material'
import React, { createContext, useEffect, useState } from 'react'
import getTeamMembers from '../../controllers/settings/team/getTeamMembers';
import Modal1 from '../../components/DIsplay/Modal/Modal1';
import EmailInput from '../../components/form/EmailInput';
import RadioInput from '../../components/form/RadioInput';
import Button1 from '../../components/form/Button1';
import addTeamMember from '../../controllers/settings/team/addTeamMember';
import { useSnackbar } from 'notistack';
import CustomTable from '../../components/Table/CustomTable';
import { Delete, Settings } from '@mui/icons-material';
import deleteTeamMember from '../../controllers/settings/team/deleteTeamMember';
import LearnMoreButton from '../../components/mini/LearnMoreButton';
import activateTeamMember from '../../controllers/settings/team/activateTeamMember';
import deactivateTeamMember from '../../controllers/settings/team/deactivateTeamMember copy';
import CustomMenu from '../../components/utils/CustomMenu';
import Icon from '../../components/HOC/Icon';
import SelectInput from '../../components/form/SelectInput';
import { teamRolesData } from '../../data/team/rolesData';
import { clone } from '../../features/utils/objClone';
import updateTeamMemberRole from '../../controllers/settings/team/updateTeamMemberRole';
import getSentInvitations from '../../controllers/settings/team/getSentInvitations';


const Action = createContext();

function ActionCol({params,reload}) {
  const {enqueueSnackbar} = useSnackbar();

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
    <div className='flex justify-end px-2'>
      <CustomMenu
        element={
          <Settings className='text-primary/70 cursor-pointer' />
        }
      >
        <Action.Consumer>
          {({updateRole,resendInvitation}) => (

            <div className='flex flex-col bg-secondary rounded-lg p-2'>
            {['Inactive','Deactivated'].includes(params?.row?.status) ? 
              <Button1 className='flex btn-theme-light !justify-start !text-start items-center gap-2 p-2'
                onClick={handleActivate}
                >
                <Icon icon={'mdi:user-check'} fontSize={20} className='w-6 h-6' />
                Activate</Button1>
            : ['Active'].includes(params?.row?.status) ?
              <Button1 className='flex btn-theme-light !justify-start !text-start items-center gap-2 p-2'
                onClick={handleDeactivate}
                >
                <Icon icon={'basil:user-block-solid'} fontSize={20} className='w-6 h-6' />
                {/* <Edit className='text-primary/50' fontSize='small' /> */}
                Deactivate</Button1>
            : null
            }
            {['Pending'].includes(params?.row?.status) ? 
              <Button1 className='flex btn-theme-light !justify-start !text-start items-center gap-2 p-2'
                onClick={() => resendInvitation(params.row)}
                >
                <Icon icon={'mdi:email-resend'} fontSize={20} className='w-6 h-6' />
                {/* <Edit className='text-primary/50' fontSize='small' /> */}
                Resend Invitation</Button1>
            : 
              <Button1 variant='text' className='btn-theme-light flex !justify-start !text-start gap-2' onClick={() => updateRole.open(params.row)}>
                <Icon icon={'tabler:edit'} className='w-6' />
                Update role
              </Button1>
            }
            <Button1 className='!bg-red-500 !text-white flex !gap-2 !justify-start '
              onClick={handleDelete}
            >
              <Delete className='!w-6 !h-6 ' fontSize='small' />
              Delete</Button1>
            </div>
          )}
        </Action.Consumer>
              
      </CustomMenu>
    </div>
  )
}

const filterItems = [
  {i: 0,value: 'All'},
  {i: 1,value: 'Invited'},
];

export default function TeamMembers() {
  const [data,setData] = useState([])
  const [filter,setFilter] = useState(filterItems[0])
  const [loading,setLoading] = useState(false);

  const {enqueueSnackbar} = useSnackbar();

  const [openUpdateRole,setOpenUpdateRole] = useState(false);
  
  useEffect(() => {
    load();    
    //eslint-disable-next-line
  },[filter])

  async function load() {
    let res = {return:true,data: {data: []},msg: 'Failed fetching members. This error is from our end please notify customer support!'}
    setLoading(true);
    if(filter.value === 'All') {
      res = await getTeamMembers()
    }
    
    if(res.return) {
      let data = res?.data?.data || [];

      const res2 = await getSentInvitations();
      setLoading(false);

      if(res2.return) {
        data = [...data,...(res2?.data?.data?.map((obj,i) => ({...obj,id: i+"Inv"})) || [])];
      }
      
      // console.log('dat: ',data)
      data = data.map(obj => ({...obj,...obj?.member,id: obj._id,name: (obj?.member?.firstName||'')+' '+(obj?.member?.lastName||'')}))
      data = data.filter((cur,i,arr) => arr.findIndex((obj) => obj.email === cur.email) === i)
      setData(data);
    }
    setLoading(false);
  }

  async function resendInvitation(data) {
    setLoading(true);
    const res = await addTeamMember(data);
    setLoading(false);
    if(res.return) {
      enqueueSnackbar('Email have been resent to the user to join the app',{variant: 'success'})
    } else 
      enqueueSnackbar(res.msg || 'Invitation Error',{variant: 'error'})
  }


  let columns = [
    {field: 'name',headerName: 'Member',flex: 1},
    {field: 'email',headerName: 'Email',flex: 1},
    {field: 'role',headerName: 'Role',flex: 2},
    {field: 'action',headerName: '',flex: 2,minWidth: 60,
      renderCell: (params) => {
        return (
          <ActionCol reload={load} params={params} />
        )
      }
    },
  ]
  return (
    <div className='flex flex-col gap-4'>
      {!data.length && !loading ? (
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
          <h5 >Team Members</h5>
          <InviteTeam reload={load} />
        </div>
        <Tabs className='bg-secondary px-2' value={filter.i} onChange={(ev,newVal) => setFilter(filterItems[newVal])}>
          <Tab label='All' />
          <Tab label='Invited' />
        </Tabs>
        <Action.Provider value={{
            updateRole: {open: (val) => setOpenUpdateRole(val || true)},
            resendInvitation,
          }}>
          <CustomTable loading={loading} rows={data} columns={columns}
            // filterModel={filter}
            // onFilterModelChange={(newFilter) => setFilter(newFilter)}
          
            autoHeight
          />
        </Action.Provider>
        <Modal1 open={openUpdateRole} setOpen={setOpenUpdateRole}>
          <UpdateRole data={openUpdateRole} close={() => setOpenUpdateRole(false)} reload={load} />
        </Modal1>
      </div>
      )}
    </div>
  )
}

function UpdateRole({data,close,reload}) {
  const [reqData,setReqData] = useState({email: data?.email || '',role: data?.role || ''});
  const [loading,setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    if(data)
      setReqData({email: data?.email || '',role: data?.role || ''})
  },[data])

  async function handleSubmit() {
    setLoading(true);
    const res = await updateTeamMemberRole(data?.id,reqData);
    if(res.return) {
      enqueueSnackbar('Role updated.',{variant: 'success'})
      close();
      reload && reload();
    } else
      enqueueSnackbar(res.msg,{variant: 'error'})
    setLoading(false);
  }
  return (
    <div className='card !p-10 flex flex-col gap-4 w-[450px] !max-w-full'>
      <h4>Update Role</h4>
      <SelectInput size='small' 
        value={reqData.role}
        onChange={(ev) => setReqData({...reqData,role:ev.target.value})}
      >
        {teamRolesData.map((obj,i) => (
          <MenuItem value={obj.value} key={i}>{obj.label}</MenuItem>
        ))}
      </SelectInput>
      <Button1 onClick={handleSubmit} loading={loading}>
        Update
      </Button1>
    </div>
  )
}

function InviteTeam({reload,label='Invite'}) {
  const [open,setOpen] = useState(false);
  const [data,setData] = useState({email: '',role: ''});
  const roles = clone(teamRolesData);
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
              <Button1 className='btn-theme-light' onClick={() => setOpen(false)}>Cancel</Button1>
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