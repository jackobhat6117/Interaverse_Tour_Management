import React, { useState } from 'react'
import Button1 from '../../components/forms/Button1'
import { FileDownloadOutlined } from '@mui/icons-material'
import CustomTable from '../../components/Table/CustomTable'
import { alertType } from '../../data/constants'
import Modal1 from '../../components/DIsplay/Modal/Modal1'
import TextInput from '../../components/forms/TextInput'
import FilterCalendar from '../../components/forms/FilterCalendar'


export default function BalanceSetting() {
  const columns = [
    {field: 'description',headerName: 'Description',flex: 1},
    {field: 'bookingRef',headerName: 'Booking Ref',flex: 1},
    {field: 'amount',headerName: 'Amount (NGN)',flex: 1},
    {field: 'balance',headerName: 'Balance (NGN)',flex: 1},
    {field: 'supplier',headerName: 'Supplier',flex: 1},
    {field: 'action',headerName: 'Action',flex: 1,
      renderCell: (params) => (
        <div className={`${alertType[params.value]}`}>{params.value}</div>
      )
    },
    {field: 'date',headerName: 'Date Created',flex: 1},
  ]
  const data = [
    {id: 1,description: 'ord_0000AV9MwafcDvAKVr6zWC',bookingRef: '1RD231',amount: 123123,balance: 123123,supplier: 'Turkish Airline',action: 'created',date: '9/29/2023'},
    {id: 2,description: 'TOP-UP',bookingRef: null,amount: 123123,balance: 123123,supplier: 'Turkish Airline',date: '9/29/2023',action: 'created'},
    {id: 3,description: 'ord_0000AV9MwafcDvAKVr6zWC',bookingRef: '1RD231',amount: 123123,balance: 123123,supplier: 'Turkish Airline',action: 'cancelled',date: '9/29/2023'},
  ]
  return (
    <div className='flex flex-col gap-4 !text-primary/60 '>
      <div className='flex justify-between items-center gap-4 flex-wrap'>
        <div>
          <SetupThreshold />
        </div>
        <div className='flex gap-5 items-center'>
          <FilterCalendar />
          <FileDownloadOutlined color='primary' className='cursor-pointer' />
        </div>
      </div>
      <hr />
      <div className='flex justify-between flex-wrap'>
        <div className='flex flex-col gap-3 mb-4'>
          <div className='inline-block self-start'>
            <Button1>Top-up Balance</Button1>
          </div>
          <div className='tooltip'>In test mode your balance is unlimited. It is topped-off automatically as you spend it.</div>
          <div className='tooltip error'>You don't have enought amount in your balance. Please top-up.</div>
        </div>
        <div>
          <div className='card p-4 rounded-lg text-right'>
            <h5>Current Balance <span className='text-primary/50'>(NGN)</span></h5>
            <h4 className='text-theme1'>100,000,000.00</h4>
          </div>
        </div>
      </div>
      <CustomTable rows={data} columns={columns} />
    </div>
  )
}

function SetupThreshold() {
  const [open,setOpen] = useState(false);
  return (
    <div>
      <Button1 
        onClick={() => setOpen(true)}
        className='btn-theme-light !shadow-none !lowercase !text-gray-500'>Set-up low balance threshold</Button1>
      <Modal1 open={open} setOpen={setOpen}>
        <div className='p-4 flex flex-col gap-6 max-w-[800px]'>
          <h4>Setup lowbalance threshold</h4>
          <TextInput label='Low balance threshold (ngn)' 
            tooltip='When your Miles balance reaches this value or below, all administrators in your organization will receive a low balance email. You should configure a threshold that will allow you to top up your balance on time.'
            InputProps={{
              endAdornment: 'NGN'
            }}
           />
        </div>
        <div className='flex gap-2 p-4'>
          <Button1 className='btn-theme-light'>Cancel</Button1>
          <Button1>Save Changes</Button1>
        </div>
      </Modal1>
    </div>
  )
}