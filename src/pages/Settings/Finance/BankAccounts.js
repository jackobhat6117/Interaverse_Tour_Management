import React from 'react'
import CustomTable from '../../../components/Table/CustomTable'
import Button1 from '../../../components/form/Button1'
import Icon from '../../../components/HOC/Icon'


function ActionCol({params,reload}) {
  let def = params.value === 'default';
  let status = def ? 'Default Account':'Set as default';

  function handleDefault() {
    if(status === 'default') return false;
  }

  return (
    <div className='flex items-center gap-4 w-full text-gray-600'>
      <Button1 className={`flex-1 ${def ? '!bg-theme1/20 !text-theme1':'!text-gray-600 !bg-gray-200'}`} onClick={handleDefault}>{status}</Button1>
      <span className='p-2 rounded-md !bg-gray-200 flex items-center justify-center cursor-pointer '><Icon icon='tabler:edit' /></span>
      <span className='p-2 rounded-md !bg-gray-200 flex items-center justify-center cursor-pointer '><Icon icon='material-symbols:delete-outline' className='text-red-500' /></span>
    </div>
  )
}
export default function BankAccounts({data,loading}) {
  // let data = [
  //   {bank: 'UBA',account: '12341234',accountName: 'Okafor Chiemena Derick',status: 'default'},
  //   {bank: 'Access Bank',account: '12341234',accountName: 'Okafor Chiemena Derick',status: ''},
  //   {bank: 'Access Bank',account: '12341234',accountName: 'Okafor Chiemena Derick',status: ''},
  // ]
  let columns = [
    {field: 'bankCode',headerName: 'Bank'},
    {field: 'account',headerName: 'Account Number'},
    {field: 'accountName',headerName: 'Account Name'},
    {field: 'status',headerName: 'Action', flex: 1, minWidth: 300,
      renderCell: (params) => (
        <ActionCol params={params} reload={() => console.log('reload table callback')} />
      )
    }
  ]
  return (
    <div className=' text-primary'>
      <CustomTable rows={data} columns={columns} loading={loading} />
    </div>
  )
}
