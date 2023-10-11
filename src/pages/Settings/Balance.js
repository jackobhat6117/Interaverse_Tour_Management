import React, { useEffect, useState } from 'react'
import Button1 from '../../components/forms/Button1'
import { FileDownloadOutlined } from '@mui/icons-material'
import CustomTable from '../../components/Table/CustomTable'
import { alertType } from '../../data/constants'
import Modal1 from '../../components/DIsplay/Modal/Modal1'
import TextInput from '../../components/forms/TextInput'
import FilterCalendar from '../../components/forms/FilterCalendar'
import getWallet from '../../controllers/settings/wallet/getWallet'
import topupWallet from '../../controllers/settings/wallet/topupWallet'
import { useSnackbar } from 'notistack'
import setLowBalanceThreshold from '../../controllers/settings/wallet/setLowBalanceThreshold'


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
  const [balanceData,setBalanceData] = useState({balance: 0});

  useEffect(() => {
    load();
  },[])

  async function load() {
    const res = await getWallet();
    if(res.return) {
      setBalanceData(res?.data);
    }
  }
  return (
    <div className='flex flex-col gap-4 !text-primary/60 '>
      <div className='flex justify-between items-center gap-4 flex-wrap'>
        <div className='w-full sm:w-auto'>
          <SetupThreshold reload={load} />
        </div>
        <div className='w-full sm:w-auto flex justify-end'>
          <div className='flex gap-5 items-center'>
            <FilterCalendar />
            <FileDownloadOutlined color='primary' className='cursor-pointer' />
          </div>
        </div>
      </div>
      <hr />
      <div className='flex justify-between flex-wrap'>
        <div className='flex flex-col gap-3 mb-4'>
          <div className='inline-block self-start'>
            <TopupBalance reload={load} />
          </div>
          <div className='tooltip'>In test mode your balance is unlimited. It is topped-off automatically as you spend it.</div>
          {balanceData?.lowBalanceThreshold > balanceData.balance &&
            <div className='tooltip error'>You are running low on funds. To avoid service disruption, please top-up.</div>
          }
        </div>
        <div>
          <div className='card p-4 rounded-lg text-right'>
            <h5>Current Balance <span className='text-primary/50'>(NGN)</span></h5>
            <h4 className='text-theme1'>{balanceData.balance}</h4>
          </div>
        </div>
      </div>
      <CustomTable rows={data} columns={columns} />
    </div>
  )
}

function TopupBalance({reload}) {
  const [open,setOpen] = useState(false);
  const [data,setData] = useState({amount: 0})
  const [loading,setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  async function handleTopup() {
    setLoading(true);
    const res = await topupWallet(data)
    setLoading(false);
    if(res.return) {
      const newWindow = window.open(res?.data?.data?.authorization_url,'_blank');
      
      const intervalId = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(intervalId); // Stop checking
          handleClose(); // Call your close handler function
        }
      }, 1000);
      
      function handleClose() {
        setOpen(false)
        enqueueSnackbar('Successful',{variant: 'success'})
        reload && reload();
      }
    } else enqueueSnackbar(res.msg,{variant: 'error'})
  }
  return (
    <div>
      <Button1
        onClick={() => setOpen(true)}
      >Top-up Balance</Button1>
      <Modal1 open={open} setOpen={setOpen}>
        <div className='p-4 flex flex-col gap-6 max-w-[800px]'>
          <h4>Top-up balance</h4>
          <TextInput label='Amount' 
            value={data.amount}
            onChange={(ev) => setData({...data,amount: ev.target.value})}
            InputProps={{
              endAdornment: 'NGN'
            }}
           />
        </div>
        <div className='flex gap-2 p-4'>
          <Button1 className='btn-theme-light' onClick={() => setOpen(false)}>Cancel</Button1>
          <Button1 loading={loading} onClick={handleTopup}>Save Changes</Button1>
        </div>
      </Modal1>
    </div>
  )
}

function SetupThreshold({reload}) {
  const [open,setOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  const [amount,setAmount] = useState();
  const {enqueueSnackbar} = useSnackbar();

  async function handleSubmit(ev) {
    ev.preventDefault();

    setLoading(true);
    const res = await setLowBalanceThreshold({amount});
    if(res.return) {
      enqueueSnackbar('Successful',{variant: 'success'})
      setOpen(false);
      reload && reload();
    } else enqueueSnackbar(res.msg,{variant: 'error'})
    setLoading(false);
  }
  return (
    <div>
      <Button1 
        onClick={() => setOpen(true)}
        className='!light-bg sm:!bg-secondary !w-full sm:!w-auto !shadow-none !lowercase !text-gray-500'>Set-up low balance threshold</Button1>
      <Modal1 open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit} className='p-4 flex flex-col gap-6 max-w-[800px]'>
          <h4>Set-Up lowbalance threshold</h4>
          <TextInput label='Low balance threshold (ngn)' 
            value={amount}
            onChange={(ev) => setAmount(ev.target.value)}
            tooltip='When your Miles balance reaches this value or below, all administrators in your organization will receive a low balance email. You should configure a threshold that will allow you to top up your balance on time.'
            InputProps={{
              endAdornment: 'NGN'
            }}
           />
          <div className='flex gap-2 p-4'>
            <Button1 className='btn-theme-light' onClick={() => setOpen(false)}>Cancel</Button1>
            <Button1 loading={loading} type='submit'>Save Changes</Button1>
          </div>
        </form>
      </Modal1>
    </div>
  )
}