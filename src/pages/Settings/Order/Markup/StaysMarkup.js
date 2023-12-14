import React, { createContext, useEffect, useState } from 'react'
import CustomTable from '../../../../components/Table/CustomTable'
import TextInput from '../../../../components/form/TextInput'
import { MenuItem } from '@mui/material'
import Modal1 from '../../../../components/DIsplay/Modal/Modal1'
import getMarkups from '../../../../controllers/markup/getMarkups'
import Icon from '../../../../components/HOC/Icon'
import CreateMarkup from './CreateMarkup'
import { Link } from 'react-router-dom'
import Button1 from '../../../../components/form/Button1'


const ActionContext = createContext();
export default function StaysMarkup() {
  const [open,setOpen] = useState(false);
  const [data] = useState([
    {id: 1,name: 'Default Markup',type: 'value',figure: '5000',status: 'active'},
    {id: 2,name: 'Default Markup',type: 'Percentage',figure: '0',status: 'active'}
  ])
  const [editObj,setEditObj] = useState();


  useEffect(() => {
    load();
  },[])

  async function load() {
    setEditObj();
    const res = await getMarkups();
    if(res.return) {
      console.log(res.data)
    }
  }

  async function changeStatus() {
    // activate deactivate logic
    load();
  }

  const columns = [
    {field: 'name',headerName: 'Mark-up name',flex: 1},
    {field: 'type',headerName: 'Type',flex: 1},
    {field: 'figure',headerName: 'Figure',flex: 1},
    {field: 'status',headerName: 'Action',flex: 1,minWidth: 200,
      renderCell: (params) => {
        return (
          <ActionContext.Provider value={{
            setEditObj,
            changeStatus
          }}>
            <ActionCol params={params} />
          </ActionContext.Provider>
        )
      }
    },
  ]
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between flex-wrap items-center gap-4'>
        <div className='flex gap-2'>
          <Link to='?type=Flights' className={'btn-theme-light rounded-md'}>Flights</Link>
          <Link to='?type=Stays' className={'btn'}>Stays</Link>
          <Link to='?type=Tours' className={'btn-theme-light rounded-md'}>Tours</Link>
        </div>
        {/* <h5 className='text-primary/70'>Created Mark ups</h5> */}
        <div>
          <Button1 onClick={() => setOpen(true)}>Create new markup</Button1>
          <Modal1 open={open} setOpen={setOpen}>
            <CreateMarkup forType={'Stays'} footer={
              <div>
                <Button1 onClick={() => setOpen(false)} className='btn-theme-light'>Cancel</Button1>
              </div>
            }/>
          </Modal1>
        </div>

      </div>

      <CustomTable rows={data} columns={columns} />

      <Modal1 open={editObj} setOpen={setEditObj}>
        <div className='p-6'>
          <CreateMarkup update data={editObj}  />
        </div>
      </Modal1>
    </div>
  )
}

function ActionCol({params}) {
  return (
    <ActionContext.Consumer>
      {(value) => {
        const {setEditObj,changeStatus} = value || {}
        return (
          <div className='flex gap-2'>
            <TextInput select value={params.value || ''} size='small' label=''
              onChange={() => changeStatus(params?.id)}
            >
              <MenuItem value='active'>Active</MenuItem>
              <MenuItem value='inactive'>Disabled</MenuItem>
            </TextInput>
            <label
             className='bg-primary/10 rounded-md cursor-pointer p-2 text-primary/30'
             onClick={() => setEditObj(params?.row)}>
              <Icon icon='tabler:edit' />
            </label>
          </div>
        )
      }}
    </ActionContext.Consumer>
  )
}

