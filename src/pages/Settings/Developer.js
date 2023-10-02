import React, { useEffect, useState } from 'react'
import {Visibility, VisibilityOff } from '@mui/icons-material'
import CustomTable from '../../components/Table/CustomTable'
import { Link, useLocation } from 'react-router-dom'
import Button1 from '../../components/forms/Button1';
import Modal1 from '../../components/DIsplay/Modal/Modal1';
import TextInput from '../../components/forms/TextInput';
import RadioInput from '../../components/forms/RadioInput';
import { RadioGroup } from '@mui/material';
import getAPIKeys from '../../controllers/settings/APIKeys/getAPIKeys';
import createAPIKey from '../../controllers/settings/APIKeys/createAPIKey';
import { useSnackbar } from 'notistack';


export default function DeveloperSetting() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  let view = queryParams.get('view') || '';

  return (
    <div className='flex flex-col gap-4 !text-primary/60 '>

      {view === 'webhook' ? 
        <WebHook />
      :
        <AccessKeys />
      }
    </div>
  )
}

function WebHook() {
  return (
    <div className='flex flex-col gap-4 !text-primary/60'>
      <div className='flex gap-4 justify-between'>
        <div className='flex gap-2 self-start'>
          <Link className={`btn-theme-light`} to="?view=accessKeys">Access Keys</Link>
          <Link className={`btn`} to="?view=webhook">Web Hooks</Link>
        </div>
      </div>
    </div>
  )
}



function ActionCol({params}) {
  const [view] = useState(false);
  return (
    <div className='flex gap-4 justify-between'>
      View key
      {view?<Visibility />:<VisibilityOff />}
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
  // const data = [
  //   {id: 1,name: 'General',clientId: 'miles_test_************gDje',secret: 'miles_secrete_************gDE',lastUsed: 'Never used',scope: 'Read and write',key: 'View Key'}
  // ]



  useEffect(() => {
    load();
  },[])

  async function load() {
    const res = await getAPIKeys();
    if(res.return) {
      let data = res?.data?.data?.map(obj => ({...obj,id: obj._id}))
      setData(data)
      console.log(data)
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
  const columns = [
    {field: 'name',headerName: 'Name',flex: 1},
    {field: 'clientId',headerName: 'Client ID',flex: 1},
    {field: 'clientSecret',headerName: 'Client Secret',flex: 1},
    {field: 'lastUsed',headerName: 'LastUsed',flex: 1},
    {field: 'scope',headerName: 'Scope',flex: 1},
    {field: 'key',headerName: 'Secret Key',flex: 1,
      renderCell: (params) => (
        <ActionCol params={params} />
      )
    },
  ]
  return (
    <div className='flex flex-col gap-4 !text-primary/60'>
      <div className='flex gap-4 justify-between'>
        <div className='flex gap-2 self-start'>
          <Link className={`btn`} to="?view=accessKeys">Access Keys</Link>
          <Link className={`btn-theme-light`} to="?view=webhook">Web Hooks</Link>
        </div>
        <div>
          <Button1 className='' onClick={() => setOpen(true)}>Create Key</Button1>
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
      </div>

      <CustomTable rows={data} columns={columns} />
    </div>
  )
}