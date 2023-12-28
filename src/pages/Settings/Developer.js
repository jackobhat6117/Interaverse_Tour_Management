import React, { useEffect, useState } from 'react'
import {Visibility, VisibilityOff } from '@mui/icons-material'
import CustomTable from '../../components/Table/CustomTable'
import { Link, useLocation } from 'react-router-dom'
import Button1 from '../../components/form/Button1';
import Modal1 from '../../components/DIsplay/Modal/Modal1';
import TextInput from '../../components/form/TextInput';
import RadioInput from '../../components/form/RadioInput';
import { Button, MenuItem, RadioGroup } from '@mui/material';
import getAPIKeys from '../../controllers/settings/APIKeys/getAPIKeys';
import createAPIKey from '../../controllers/settings/APIKeys/createAPIKey';
import { useSnackbar } from 'notistack';
import CustomTabs from '../../components/DIsplay/CustomTabs';
// import { DataGrid } from '@mui/x-data-grid';
import LearnMoreButton from '../../components/mini/LearnMoreButton';
import getWebhooks from '../../controllers/webhook/getWebooks';
import createWebhook from '../../controllers/webhook/createWebhook.js';
import moment from 'moment';
import getWebhook from '../../controllers/webhook/getWebook';
import activateWebhook from '../../controllers/webhook/activateWebhook';
import deactivateWebhook from '../../controllers/webhook/deactivateWebhook';
import removeWebhook from '../../controllers/webhook/removeWebhook';
import suspendWebhook from '../../controllers/webhook/suspendWebhook';
import { alertType } from '../../data/constants';
import EditableInput from '../../components/form/EditableInput';
import getWebhookEvents from '../../controllers/webhook/getWebookEvent';
import Checkbox from '../../components/form/Checkbox';
import CopyButton from '../../components/mini/CopyButton';
import deleteAPIKey from '../../controllers/settings/APIKeys/deleteAPIKey';
import pingWebhook from '../../controllers/webhook/pingWebhook';
import SelectInput from '../../components/form/SelectInput';


export default function DeveloperSetting() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  let view = queryParams.get('view') || '';

  return (
    <div className='flex flex-col gap-4 !text-primary/60 flex-1 h-full self-stretch'>

      {view === 'webhook' ? 
        <WebHook />
      :
        <AccessKeys />
      }
    </div>
  )
}

function WebHook() {
  const [data,setData] = useState([])
  const [webhook,setWebhook] = useState();
  const [selected,setSelected] = useState();
  const [loading,setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar()

  useEffect(() => {
    load();
  },[])

  useEffect(() => {
    if(selected)
      fetchWebhook(selected);
  },[selected])

  async function load() {
    setLoading(true);
    const res = await getWebhooks();
    setLoading(false);
    if(res.return) {
      if(res?.data?.data) {
        let data = res?.data?.data?.map(obj => ({...obj,id: obj._id})) || []
        setData(data)
      }
    }
  }

  async function fetchWebhook(id) {
    setLoading(true);
    const res = await getWebhook(id);
    setLoading(false);
    if(res.return) {
      setWebhook(res?.data)
    } else setWebhook();
  }

  let columns = [
    {field: 'status',headerName: 'Status',flex: 1},
    {field: 'events',headerName: 'Event',flex: 1,maxWidth: 300,minWidth: 300,
      renderCell: (params) => (
        <div title={params.value?.join(', ')} className='overflow-x-auto overflow-hidden'>
          {params.value?.join(', ')}
        </div>
      )
    },
    {field: 'createdAt',headerName: 'Date Created',flex: 1,
      renderCell: (params) => (
        <div>
          {moment(params.value || "").format('HH:MM YY/MM/DD')}
        </div>
      )
    },
  ];

  function handleRowChange(val) {
    if(val[0])
      setSelected(val[0])
  }

  async function handleActivate(id) {
    const res = await activateWebhook(id);
    if(res.return) {
      enqueueSnackbar('Activated',{variant: 'success'})
      fetchWebhook(id);
      load();
    }
    else enqueueSnackbar(res.msg,{variant: 'error'})
  }
  async function handleDeactivate(id) {
    const res = await deactivateWebhook(id);
    if(res.return) {
      enqueueSnackbar('Deactivated',{variant: 'success'})
      fetchWebhook(id);
      load();
    }
    else enqueueSnackbar(res.msg,{variant: 'error'})
  }
  async function handleRemove(id) {
    const res = await removeWebhook(id);
    if(res.return) {
      enqueueSnackbar('Removed',{variant: 'success'})
      fetchWebhook(id);
      load();
    }
    else enqueueSnackbar(res.msg,{variant: 'error'})
  }
  async function handleSuspend(id) {
    const res = await suspendWebhook(id);
    if(res.return) {
      enqueueSnackbar('Suspended',{variant: 'success'})
      fetchWebhook(id);
      load();
    }
    else enqueueSnackbar(res.msg,{variant: 'error'})
  }
  async function handlePing(id) {
    const res = await pingWebhook(id);
    if(res.return) {
      enqueueSnackbar(res.msg?.toString()+' ping returned',{variant: 'success'})
    }
    else enqueueSnackbar(res.msg,{variant: 'error'})
  }


  let filterOptions = [
    {label: 'All',value: 'All'},
    {label: 'Succeded',value: 'Succeded'},
    {label: 'Failed',value: 'Failed'}
  ]
  return (
    <div className={`flex flex-col gap-4 !text-primary/60 ${!data.length ? 'bg-emptypage flex-1 h-full ':''}`}>
      <div className='flex gap-4 justify-between items-center'>
        <div className='flex gap-2 self-start'>
          <Link className={`btn-theme-light`} to="?view=accessKeys">Access Keys</Link>
          <Link className={`btn`} to="?view=webhook">Web Hooks</Link>
        </div>
        {data.length?(
          <div className='flex '>
            <CreateWebHook reload={() => load()} />
          </div>
        ):null}
      </div>
      {!data.length && !loading ? (
        <div className=' text-center flex flex-col items-center gap-8'>
          <h4>You don't have any test webooks</h4>
          <div className='flex gap-2'>
            <LearnMoreButton label='Learn about webhooks' />
            <CreateWebHook reload={() => load()} />
          </div>
        </div>
      ):(
        <div className='max-w-[600px] flex flex-col gap-2'>            
          {webhook && !loading ?  // Single webhook view
            <div className='flex flex-col gap-2'>
              <div className='flex flex-wrap gap-2 justify-between'>
                <EditableInput value={webhook.name} className='h4' />
                <div>
                  <SelectInput select size='small' noShrink={true} label='Options'>
                    {webhook.status !== 'Active' ? 
                    <MenuItem onClick={() => handleActivate(webhook._id)}>Activate</MenuItem>
                    :
                    <MenuItem onClick={() => handleDeactivate(webhook._id)}>Deactivate</MenuItem>
                    }
                    <MenuItem onClick={() => handleSuspend(webhook._id)}>Suspend</MenuItem>
                    <MenuItem onClick={() => handlePing(webhook._id)}>Ping</MenuItem>
                    <MenuItem className='!bt !text-white'>
                      <Button1 onClick={() => handleRemove(webhook._id)} className='!btn !bg-red-500 !text-white'>
                      Delete
                      </Button1>
                    </MenuItem>
                  </SelectInput>
                </div>
              </div>
              <hr />
              <div className='flex flex-col gap-1'>
                <div className='flex gap-2 justify-between'>
                  <b>URL</b>
                  <span>{webhook.url}</span>
                </div>
                <div className='flex gap-2 justify-between'>
                  <b>Status</b>
                  <span className={alertType[webhook.status?.toLowerCase()]}>{webhook.status}</span>
                </div>
                <div className='flex gap-2 justify-between'>
                  <b>Listening To</b>
                  <span>{webhook.events.length} event</span>
                </div>
              </div>
              <hr />
            </div>
          :loading ? <div className='border-theme1 flex justify-center items-center p-4'><div className='load !w-10 !h-10'></div></div>:null}
          <br />


          {/* Table view */}
          <h6>Delivery Log</h6>
          <div className='flex gap-2 flex-wrap justify-between items-center self-start w-full'>
            <CustomTabs defaultValue='All' options={filterOptions} />
            <div>
              <TextInput select size='small' label='Filter' noShrink></TextInput>
            </div>
          </div>
          <hr />
          <div className='flex justify-end'>
            <p>Updated 22:22, 05/05/2023</p>
          </div>
          <br />
          <CustomTable rows={data} columns={columns}
            onRowSelectionModelChange={(val) => handleRowChange(val)}
          />
        </div>
      )}
    </div>
  )
}

function CreateWebHook({reload}) {
  const [data,setData] = useState({url: '',events: []});
  const [events,setEvents] = useState([]);
  const [open,setOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    load();
  },[])

  async function load() {
    const res = await getWebhookEvents();
    if(res.return) {
      setEvents(res.data || [])
    }
  }

  async function handleSubmit(ev) {
    ev.preventDefault();

    if(data.url === '' || data.event === '')
      return enqueueSnackbar('All fields are required!',{variant: 'error'})

    setLoading(true);
    const res = await createWebhook({...data,name: data.url});
    setLoading(false);
    if(res.return) {
      reload();
      enqueueSnackbar('Webhook added',{variant: 'success'})
      setOpen(false);
    } else enqueueSnackbar(res.msg,{variant: 'error'})
  }

  const handleCheckboxChange = (value) => {
    setData((data) => {
      if (data.events.includes(value)) {
        return {...data,events: data.events.filter((val) => val !== value)};
      } else {
        return {...data,events: [...data.events, value]};
      }
    });
  };

  return (
    <div>
      <Button variant='contained' className='!capitalize' onClick={() => setOpen(true)}>Create test webhook</Button>
      <Modal1 open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-10 max-w-[700px]'>
          <h4>Create a test webhook</h4>
          <TextInput 
            value={data.url} 
            onChange={(ev) => setData({...data,url: ev.target.value})}
            label={'URL'} placeholder={'https://www.webhook.com'} tooltip='Must be for an https server. We do not accept IP addresses and some URLs are blacklisted (e.g. https://localhost).' />
          {/* <RadioGroup className='flex flex-col gap-2' multiple onChange={(ev) => setData({...data,event: ev.target.value})}>
            Events to listen to
            {events.map((val,i) => (
              <RadioInput key={i} value={val} checked={data.event === val}>
                <div className='self-center'>
                  {val}
                </div>
              </RadioInput>
            ))}
          </RadioGroup> */}
          <div className='flex flex-col gap-2'>
            <h6 className='text-primary/40'>Events to listen to</h6>
            {events.map((val,i) => (
              <Checkbox key={i} onChange={() => handleCheckboxChange(val)}>{val}</Checkbox>
            ))}
          </div>
          <div className='flex gap-2 '>
            <div>
              <Button1 onClick={() => setOpen(false)} variant='outlined' className='w-[20%]'>Cancel</Button1>
            </div>
            <Button1 type='submit' loading={loading} className='flex-1'>Create test webtoken</Button1>
          </div>
        </form>
      </Modal1>
    </div>
  )
}



function ActionCol({params,select,toggleView}) {
  const [view,setView] = useState(false);
  function handleClick() {
    setView(!view)
    toggleView && toggleView(params.id,!view)
  }
  function handleView() {
    select && select(params.id)
  }
  return (
    <div className='flex gap-4 items-center cursor-pointer justify-between'>
      <div onClick={handleView}>
        View key
      </div>
      <div onClick={handleClick}>
        {!view?<Visibility className='text-primary/60' />:<VisibilityOff className='text-primary/60' />}
      </div>
    </div>
  )
}

function AccessKeys() {
  const [open,setOpen] = useState(false);
  const [scope,setScope] = useState('');
  const [name,setName] = useState('');
  const [loading,setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const [data,setData] = useState([]);
  const [selected,setSelected] = useState();
  // const data = [
  //   {id: 1,name: 'General',clientId: 'miles_test_************gDje',secret: 'miles_secrete_************gDE',lastUsed: 'Never used',scope: 'Read and write',key: 'View Key'}
  // ]



  useEffect(() => {
    load();
  },[])

  async function load() {
    setLoading(true);
    const res = await getAPIKeys();
    setLoading(false);
    if(res.return) {
      let data = res?.data?.data?.map(obj => ({...obj,id: obj._id,clientSecretView: obj.clientSecret,clientSecret: '******************'}))
      setData(data)
    }
  }

  async function handleSubmit(ev) {
    ev.preventDefault();

    setLoading(true);
    const res = await createAPIKey({name,scope});
    setLoading(false);
    if(res.return ) {
      load();
      enqueueSnackbar('Api Creation Successful',{variant: 'success'})
      setOpen(false);
    } else enqueueSnackbar('Failed creating key',{variant: 'error'})
  }

  function handleVisibilityToggle(id,view) {
    setData(oldData =>
      oldData.map((row) => {
        if(row.id === id) {
          return {
            ...row,
            clientSecret: view ? row.clientSecretView : '*****************'
          }
        }
        return row
      })
    )
  }
  function handleView(id) {
    setSelected(data.find(obj => obj.id === id));
  }
  const columns = [
    {field: 'name',headerName: 'Name',flex: 1},
    {field: 'clientId',headerName: 'Client ID',flex: 1},
    {field: 'clientSecret',headerName: 'Client Secret',flex: 1},
    {field: 'lastUsed',headerName: 'LastUsed',flex: 1},
    {field: 'scope',headerName: 'Scope',flex: 1},
    {field: 'key',headerName: 'Secret Key',flex: 1,
      renderCell: (params) => (
        <ActionCol params={params} select={handleView} toggleView={handleVisibilityToggle} />
      )
    },
  ]
  return (
    <div className={`flex flex-col gap-4 !text-primary/60 ${!data.length ? 'bg-emptypage flex-1 h-full ':''}`}>
      <div className='flex gap-4 justify-between'>
        <div className='flex gap-2 self-start'>
          <Link className={`btn`} to="?view=accessKeys">Access Keys</Link>
          <Link className={`btn-theme-light`} to="?view=webhook">Web Hooks</Link>
        </div>
        <div>
          <Button variant='contained' className='' onClick={() => setOpen(true)}>Create Key</Button>
        </div>
      </div>
      {!data.length ? (
        <div className=' text-center flex flex-col items-center gap-8 py-3'>
          <h4>You don't have any access keys</h4>
          <div className='flex gap-2'>
            <LearnMoreButton label='Learn about access keys'  />
            <Button variant='contained' className='' onClick={() => setOpen(true)}>Create Access Keys</Button>
          </div>
        </div>
      ): [
        <AccessKeyView key={1} selected={selected} reload={() => {load();setSelected(null)}} />
        ,
        <CustomTable key={2} loading={loading} rows={data} columns={columns} />
      ]}

      <Modal1 open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit} className='p-4 flex flex-col gap-6 max-w-[800px]'>
          <h5>Create an access key</h5>
          <TextInput 
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            label={'Token name'} placeholder={'e.g Miles token'} />
          <div>
            <span>Scope</span>
            <RadioGroup name='scope' value={scope} onChange={(ev) => setScope(ev.target.value)} className='flex flex-col gap-2'>
              <RadioInput checked={scope === 'Full'} value={'Full'}>
                <div className='flex flex-col '>
                  <h5>Read and write</h5>
                  <p className='text-primary/70'>A read and write token is able to read and modify any resource</p>
                </div>
              </RadioInput>
              <RadioInput checked={scope === 'ReadOnly'} value={'ReadOnly'}>
                <div className='flex flex-col '>
                  <h5>Read only</h5>
                  <p className='text-primary/70'>A read token is able to read but not modify any resource</p>
                </div>
              </RadioInput>
            </RadioGroup>
          </div>
          <div className='flex gap-2 '>
            <Button1 className='!w-[20%]' variant='text' onClick={() => setOpen(false)}>Cancel</Button1>
            <Button1 type='submit' className='!w-auto flex-1' loading={loading}>Create token</Button1>
          </div>
        </form>
      </Modal1>

    </div>
  )
}

function AccessKeyView({selected,reload}) {
  const [open,setOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  async function handleDelete() {
    setLoading(true);
    const res = await deleteAPIKey(selected?.clientId);
    if(res.return) {
      enqueueSnackbar('Acecss key removed.',{variant: 'success'})
      setOpen(false);
      reload && reload();
    } else enqueueSnackbar(res?.msg,{variant: 'error'})
    setLoading(false);
  }

  return selected && (
    <div className='flex flex-col gap-4 max-w-[600px] self-center'>
      <h4>{selected?.name}</h4>
      <hr />
      <div className='flex flex-col gap-2'>
        <div className='flex gap-4 justify-between'>
          <b>Scope</b>
          {selected?.scope}
        </div>
      </div>
      <p className='border-y'>Client ID</p>
      <div className='flex gap-4 justify-between'>
        <p id='clientId' className='break-all'>{selected?.clientId}</p>
        <CopyButton id='clientId' />
      </div>
      <p className='border-y'>Client Secret Key</p>
      <div className='flex gap-4 justify-between'>
        <p id='clientSecret' className='break-all'>{selected.clientSecretView || selected?.clientSecret}</p>
        <CopyButton id='clientSecret' />
      </div>
      <hr />
      <div className='p-4 bg-red-100 flex flex-col gap-4'>
        <h5>Danger Zone</h5>
        <div className='text-red-700'>
          By deleting this token it will immediately disable its access to the Miles API.
          Please make sure it's safe to delete this token before doing so.
        </div>
        <div className='flex justify-end mb-2'>
          <Button1 className='!bg-red-500 !text-white !w-auto' onClick={() => setOpen(true)}>Delete</Button1>
        </div>
      </div>

      <Modal1 open={open} setOpen={setOpen}>
        <div className='card flex flex-col items-center gap-4'>
          <h4>Delete Access Key</h4>
          <p>Are you sure you want to delete this access token?<br />
            you will not be able to undo this action
          </p>
          <div className='flex gap-2 w-full'>
            <Button1 className='bg-theme-light !w-auto flex-1' variant='text' onClick={() => setOpen(false)}>Cancel</Button1>
            <Button1 loading={loading} className='!bg-red-500 !text-white !flex-1' onClick={handleDelete}>Delete</Button1>
          </div>
        </div>
      </Modal1>
    </div>
  )
}