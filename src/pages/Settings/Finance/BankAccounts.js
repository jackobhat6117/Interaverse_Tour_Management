import React, { createContext, useContext, useState } from 'react'
import CustomTable from '../../../components/Table/CustomTable'
import Button1 from '../../../components/form/Button1'
import Icon from '../../../components/HOC/Icon'
import Modal1 from '../../../components/DIsplay/Modal/Modal1';
import { AddBankForm } from './AddBankForm';


const ActionsContext = createContext();

export default function BankAccounts({data,loading,banks,reload}) {
  let modData = data?.map(obj => ({...obj,bankName: getBankName(obj.bankCode)}));
  const [editObj,setEditObj] = useState();
  const [deleteObj,setDeleteObj] = useState();


  function getBankName(code) {
    console.log(code,banks)
    let bank = banks?.find(obj => obj.value === code)
    return bank?.label;
  }

  function updateData() {
    // delete loagic
    reload && reload(); // reload table
  }
  async function deleteData() {
    // delete loagic
    reload && reload(); // reload table
  }

  async function setDefault(id) {

    reload && reload();
  }

  let columns = [
    {field: 'bankName',headerName: 'Bank'},
    {field: 'accountNumber',headerName: 'Account Number'},
    {field: 'accountName',headerName: 'Account Name'},
    {field: 'status',headerName: 'Action', flex: 1, minWidth: 300,
      renderCell: (params) => (
        <ActionsContext.Provider value={{
          setEditObj,
          setDeleteObj,
          setDefault
        }}>
          <ActionCol params={params} reload={() => console.log('reload table callback')} />
        </ActionsContext.Provider>
      )
    }
  ]
  return (
    <div className=' text-primary'>
      <CustomTable rows={modData} columns={columns} loading={loading} />


      {/* Actions Modals */}

      <Modal1 open={editObj} setOpen={setEditObj}>
        <div className='p-10'>
          <AddBankForm banks={banks} data={editObj} updateCallback={updateData} />
        </div>
      </Modal1>
      
      <Modal1 open={deleteObj} setOpen={setDeleteObj}>
        <div className='p-10 flex flex-col gap-4 sm:min-w-[550px] w-full'>
          <h5 className='text-center'>Delete Bank Information</h5>

          <div className='flex flex-col gap-2'>
            <div className='flex gap-4 justify-between'>
              <p>Bank name:</p>
              <span>{deleteObj?.bankName}</span>
            </div>
            <div className='flex gap-4 justify-between'>
              <p>Account number:</p>
              <span>{deleteObj?.accountNumber}</span>
            </div>
            <div className='flex gap-4 justify-between'>
              <p>Account name:</p>
              <span>{deleteObj?.accountName}</span>
            </div>
          </div>

          <p>You will not be able to undo this action!</p>

          <div className='flex gap-4 flex-1 w-full'>
            <Button1 className='!bg-secondary !text-primary' onClick={() => setDeleteObj()}>Cancel</Button1>
            <Button1 className='!bg-red-500 !text-white' onClick={() => deleteData(deleteObj._id)}>Delete</Button1>
          </div>
        </div>
      </Modal1>

    </div>
  )
}

function ActionCol({params}) {
  const id = params.row?._id;
  let def = params.value === 'default';
  let status = def ? 'Default Account':'Set as default';

  return (
    <ActionsContext.Consumer>
      {(value) => {
        const {setDeleteObj,setEditObj,setDefault} = value || {}
        return (
          <div className='flex items-center gap-4 w-full text-gray-600'>

            {/* actions */}
            
            <Button1 className={`flex-1 ${def ? '!bg-theme1/20 !text-theme1':'!text-gray-600 !bg-gray-200'}`} onClick={() => setDefault(id)}>{status}</Button1>
            <span className='p-2 rounded-md !bg-gray-200 flex items-center justify-center cursor-pointer '
              onClick={() => setEditObj(params.row)}
            ><Icon icon='tabler:edit' /></span>
            <span className='p-2 rounded-md !bg-gray-200 flex items-center justify-center cursor-pointer '
              onClick={() => setDeleteObj(params.row)}
            ><Icon icon='material-symbols:delete-outline' className='text-red-500' /></span>


          </div>
        )
      }}
    </ActionsContext.Consumer>
  )
}