import React, { createContext, useState } from 'react'
import TableFilter from '../../components/Table/TableFilter'
import CreateOrder from './CreateOrder'
import Button1 from '../../components/forms/Button1'
import SelectInput from '../../components/forms/SelectInput'
import { MenuItem } from '@mui/material'
import CalendarInput1 from '../../components/forms/CalendarInput1'
import CustomTable from '../../components/Table/CustomTable'
import { alertType } from '../../data/constants'
import CustomMenu from '../../components/utils/CustomMenu'
import { Icon } from '@iconify/react'
import AddBags from './AddBags'
import AddSeats from './AddSeats'
import CancelOrder from './cancelOrder'


const ActionContext = createContext();

function StatusCol({params}) {
  const status = params.value || '';

  const Menu = (props) => {
    const {className,label,value,showFor,hideFor,...extraProps} = props;
    const ShowerClass = showFor?.includes(value?.toLowerCase() || value) ? '' : !showFor ? '' : '!hidden'
    const hiderClass = !hideFor?.includes(value?.toLowerCase() || value) ? '' : !hideFor ? '' : '!hidden'
    
    return (
      <MenuItem className={`${className} ${ShowerClass} ${hiderClass}`} value={value} {...extraProps} >{label || value}</MenuItem>
    )
  }

  return (
    <div className='flex justify-between items-center gap-2 w-full '>
      <span className={`${alertType[status]}`}>{status}</span>
      <CustomMenu element={(
        <label className='block p-2 px-4 cursor-pointer'>
          <Icon icon={'pepicons-pop:dots-y'} />
        </label>
      )}>
        <ActionContext.Consumer>
          {({bags,seats,cancel}) => (
            <div className='flex flex-col bg-secondary rounded-lg p-2'>
              <Menu value={status} label='View Order' />
              <Menu value={status} label='Make Payment' showFor={['confirmed']} />
              <Menu value={status} label='Issue Ticket' showFor={['confirmed']} className='!btn disabled' />
              <Menu value={status} label='Manage Ticket' showFor={['confirmed']} />
              <Menu value={status} label='Add Seats' hideFor={['confirmed']} onClick={seats.open} />
              <Menu value={status} label='Add Bags' hideFor={['confirmed']} onClick={bags.open} />
              <Menu value={status} label='Confirm Payment' showFor={['pending','on hold']} />
              <Menu value={status} label='Edit PNR' hideFor={['confirmed']} />
              <Menu value={status} label='Hold Order' hideFor={['confirmed']} />
              <Menu value={status} label='Cancel Order' className='!bg-red-500 !text-white !rounded-md' onClick={cancel.open}/>
            </div>
          )}
        </ActionContext.Consumer>
      </CustomMenu>
    </div>
  )
}


export default function OrdersData({data,setData}) {
  const tempObj = {
    date: '22, Jan',name: 'John Doe',provider: 'gb Travels',type: ['Flight','Tour','Stay'][parseInt(Math.random()*3)],amount: 234900,
    commission: '4900',
    updatedDate: '5:30, 24/24/24',
    bookRef: parseInt(Math.random()*99999),
    status: ['confirmed','pending','on hold','cancelled','expired'][parseInt(Math.random()*5)]
  }
  const [openAddBags,setOpenAddBags] = useState(false);
  const [openAddSeats,setOpenAddSeats] = useState(false);
  const [openCancelOrder,setOpenCancelOrder] = useState(false);

  const filterOptions = [
    {label: 'All',value: 'ALL',count: 293},
    {label: 'Flights',value: 'FLIGHTS',count: 190},
    {label: 'Stays',value: 'Stays',count: 90},
    {label: 'Tours',value: 'Tours',count: 30},
  ]

  const columns = [
    {field: 'date',headerName: 'Created Date'},
    {field: 'id',headerName: 'ID'},
    {field: 'name',headerName: 'Name'},
    {field: 'provider',headerName: 'Provider'},
    {field: 'updatedDate',headerName: 'Activity Date'},
    {field: 'amount',headerName: 'Amount'},
    {field: 'commission',headerName: 'Commission'},
    {field: 'bookRef',headerName: 'Book Ref'},
    {field: 'status',headerName: 'Status',minWidth: 160,
      renderCell: (params) => (
        <StatusCol params={params} addBags={() => setOpenAddBags(true)} addSeats={() => setOpenAddSeats(true)} />
      )
    },
  ]

  return (
    <div className='pd-md flex-1 flex flex-col gap-1'>
      <div className='flex gap-4 justify-between flex-wrap items-center'>
        <div className='flex gap-4 items-center justify-between md:justify-start flex-1 max-w-full'>
          <h5>Orders</h5>
          <TableFilter options={filterOptions} value={'ALL'} />
        </div>
        <CreateOrder label='Create new order' handleReturn={() => setData([...data,tempObj])} />
      </div>
      <hr />
      <div className='flex gap-4 justify-between items-center flex-wrap'>
        <div className='flex gap-2 btn-theme-light'>+ <span>Filter</span></div>
        <div className='flex gap-2'>
          <button className='btn-theme-light'>Needs review</button>
          <button className='btn-theme-light'>On hold</button>
        </div>
        <div className='flex gap-2 items-center'>
          <Button1 variant='text' className='capitalize'>Export</Button1>
          <div className='flex gap-2 items-center light-bg rounded-md p-2'>
            <SelectInput defaultValue='Weekly' size='small' label=''>
              <MenuItem>Hourly</MenuItem>
              <MenuItem value='Weekly'>Weekly</MenuItem>
              <MenuItem>Monthly</MenuItem>
              <MenuItem>Yearly</MenuItem>
            </SelectInput>
            <CalendarInput1 />
          </div>
        </div>
      </div>
      <hr />
      <ActionContext.Provider value={{
        bags: {openAddBags,setOpenAddBags,open: () => setOpenAddBags(true)},
        seats: {openAddSeats,setOpenAddSeats,open: () => setOpenAddSeats(true)},
        cancel: {openCancelOrder,setOpenCancelOrder,open: () => setOpenCancelOrder(true)}
      }}>
        <CustomTable rows={data} columns={columns} />
      </ActionContext.Provider>

      <AddBags open={openAddBags} setOpen={setOpenAddBags} />
      <AddSeats open={openAddSeats} setOpen={setOpenAddSeats} />
      <CancelOrder open={openCancelOrder} setOpen={setOpenCancelOrder} />

    </div>
  )
}
