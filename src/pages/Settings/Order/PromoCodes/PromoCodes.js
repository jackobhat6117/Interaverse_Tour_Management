import React, { createContext, useState } from 'react'
import Button1 from '../../../../components/form/Button1'
import CustomTable from '../../../../components/Table/CustomTable'
import TextInput from '../../../../components/form/TextInput';
import { MenuItem } from '@mui/material';
import Icon from '../../../../components/HOC/Icon';
import Modal1 from '../../../../components/DIsplay/Modal/Modal1';
import PromoDeleteForm from './PromoDeleteForm';
import PromoCodeForm from './PromoCodeForm';


const ActionContext = createContext();

export default function PromoSettings() {
  const data = [
    {codeName: 'Christmas Code',code: '23423',deal: '1231',status: 'active'},
    {codeName: 'New year code',code: '23423',deal: '1231',status: 'inactive'},
  ]

  const [addNew,setAddNew] = useState(false);
  const [deleteObj,setDeleteObj] = useState();

  async function handleStatusChange() {
    
  }

  const columns = [
    {field: 'codeName',headerName: 'Code Name'},
    {field: 'code',headerName: 'Code'},
    {field: 'deal', headerName: 'Deal'},
    {field: 'status',headerName: 'Action',minWidth: 200,
      renderCell: (params) => (
        <ActionContext.Provider value={{
          handleStatusChange,
          setDeleteObj
        }}>
          <ActionCol params={params} />
        </ActionContext.Provider>
      )
    }
  ]
  return (
    <div className='flex flex-col items-start'>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between gap-4 w-full'>
            <h5>Create Promo / Ariline Codes</h5>
            <div>
              <Button1 onClick={() => setAddNew(true)}>Create new code</Button1>
              <Modal1 open={addNew} setOpen={setAddNew}>
                <div className='card p-10'>
                  <PromoCodeForm cancel={() => setAddNew(false)} />
                </div>
              </Modal1>
            </div>
          </div>
          <CustomTable rows={data} columns={columns} />
        </div>


        <Modal1 open={deleteObj} setOpen={() => setDeleteObj()}>
          <div className='card p-10'>
            <PromoDeleteForm data={deleteObj} cancel={() => setDeleteObj()} />
          </div>
        </Modal1>
    </div>
  )
}

function ActionCol({params}) {
  return (
    <ActionContext.Consumer>
      {(val) => {
        const {handleStatusChange,setDeleteObj} = val || {};
        return (
          <div className='flex gap-2 w-full'>
            <TextInput select size='small' label='' 
              value={params.value}
              onChange={(ev) => handleStatusChange(ev.target.value,params.row)}
            >
              <MenuItem>Active</MenuItem>
              <MenuItem>Disable</MenuItem>
            </TextInput>
            <span className='p-2 bg-red-100 text-red-500 rounded-md cursor-pointer' onClick={() => setDeleteObj(params.row)}>
              <Icon icon='material-symbols-light:delete' />
            </span>
          </div>
        )
      }}
    </ActionContext.Consumer>
  )
}