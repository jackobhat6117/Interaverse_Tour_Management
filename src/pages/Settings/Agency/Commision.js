import React, { useEffect, useState } from 'react'
import FilterCalendar from '../../../components/forms/FilterCalendar'
import TableFilter from '../../../components/Table/TableFilter';
import SearchInput from '../../../components/forms/SearchInput';
import Button1 from '../../../components/forms/Button1';
import CustomTable from '../../../components/Table/CustomTable';
import getCommissionTransactions from '../../../controllers/Flight/Commission/getTransactions';

export default function CommissionSettings() {
  const [commissionFor,setCommissionFor] = useState('Flights');

  useEffect(() => {
    load();
  },[])

  async function load() {
    const res = await getCommissionTransactions();
    if(res.return) {
      console.log(res.data)
    }
  }

  let objs = [
    {label: "Today's earnings",inc: 5,price: '10,000'},
    {label: "Last 7 days",inc: 15,price: '23,450'},
    {label: "Last 30 days",inc: 15,price: '23,450'},
    {label: "Overall",inc: 15,price: '12,345,000'},
  ];
  const filterOptions = [
    {value: 'All',count: 293},
    {value: 'Flights',count: 10},
    {value: 'Stays',count: 10},
    {value: 'Tours',count: 10},
  ]
  const columns = [
    {field: 'sn',headerName: 'SN',flex: 1},
    {field: 'provider',headerName: 'Provider',flex: 1},
    {field: 'type',headerName: 'Type',flex: 1},
    {field: 'id',headerName: 'ID',flex: 1},
    {field: 'amount',headerName: 'Amount',flex: 1},
    {field: 'commission',headerName: 'Commission',flex: 1},
    {field: 'date',headerName: 'Date Created',flex: 1},
  ]
  let data = [
    {sn: '1',provider: 'gb Travels',type: 'tour',id: 'ord_000A9123FW3aCqq6c',amount: '234,234',commission: '4,900',date: '22/12/99'},
    {sn: '2',provider: 'Carry Go',type: 'tour',id: 'ord_000A9123FW3aCqq6d',amount: '234,234',commission: '4,900',date: '22/12/99'},
    {sn: '3',provider: 'Master Goals',type: 'tour',id: 'ord_000A9123FW3aCqq5c',amount: '234,234',commission: '4,900',date: '22/12/99'},
    {sn: '4',provider: 'gb Travels',type: 'tour',id: 'ord_000A9123FW3aCq446c',amount: '234,234',commission: '4,900',date: '22/12/99'},
    {sn: '5',provider: 'gb Travels',type: 'tour',id: 'ord_000A9123FW3aCGq6c',amount: '234,234',commission: '4,900',date: '22/12/99'},
    {sn: '6',provider: 'gb Travels',type: 'tour',id: 'ord_000A9123FW3aqBq6c',amount: '234,234',commission: '4,900',date: '22/12/99'},
  ]
  return (
    <div className='content-max-w flex flex-col gap-5'>
      <div className='flex gap-3 flex-wrap'>
        <button onClick={() => setCommissionFor('Flights')}
          className={`flex p-3 px-5 items-center min-w-[120px] justify-center gap-2 ${commissionFor === 'Flights' ? '!btn':'!btn-theme-light'} `}
        >
          Flights
        </button>
        <button onClick={() => setCommissionFor('Stays')}
          className={`flex p-3 px-5 items-center min-w-[120px] justify-center gap-2 ${commissionFor === 'Stays' ? '!btn':'!btn-theme-light'} `}
        >
          Stays
        </button>
        <button onClick={() => setCommissionFor('Tours')}
          className={`flex p-3 px-5 items-center min-w-[120px] justify-center gap-2 ${commissionFor === 'Tours' ? '!btn':'!btn-theme-light'} `}
        >
          Tours
        </button>
      </div>

      <div className='flex items-center justify-between gap-4'>
        <h4 className='text-primary/40'>Commission Overview</h4>
        <div>
          <FilterCalendar />
        </div>
      </div>
      <div className='flex gap-2 overflow-hidden overflow-x-auto'>
        {objs.map((obj,i) => (
          <Stats data={obj} />
        ))}
      </div>
      <TableFilter value={'All'} options={filterOptions} />
      <div className='flex flex-wrap gap-4 items-center justify-between'>
        <div className='text-primary/40'>Filter</div>
        <div className='min-w-[70%]'>
          <SearchInput />
        </div>
        <div className=''>
          <Button1 variant='text'>EXPORT</Button1>
        </div>
      </div>
      <CustomTable columns={columns} rows={data} />
    </div>
  )
}

function Stats({data}) {
  return (
    <div className='p-4 flex flex-col items-end bg-[#2DA771]/10 rounded-lg flex-1'>
      <div className='flex gap-3 whitespace-nowrap'>
        <p>{data.label}</p>
        <p className='!text-green-500'>+{data.inc}%</p>
      </div>
      <h4>{data.price}</h4>
    </div>
  )
}