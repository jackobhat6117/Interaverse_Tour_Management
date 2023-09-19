import { Button, MenuItem } from '@mui/material';
import { BarElement, Chart, CategoryScale, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Link } from 'react-router-dom'
import SelectInput from '../../components/forms/SelectInput';
import { CalendarMonth } from '@mui/icons-material';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const options = {
    responsive: true,
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 3,
        grid: {
          display: false
        },
        // ticks: {
        //   min: 0,
        //   max: 10000000,
        //   stepSize: 600000
        // }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxTicksLimit: 5,
        }
      }
    },
    plugins: {
      legend: {
        display: false,
        position: 'top',
      }
    },
  }
  const datas = [
    {date: '2023-03-09T12:00:00-06:30',orders: 10,editedtotalPrice: 0},
    {date: '2023-03-15T12:00:00-06:30',orders: 0,editedtotalPrice: 0},
    {date: '2023-03-21T12:00:00-06:30',orders: 230,editedtotalPrice: 0},
    {date: '2023-03-27T12:00:00-06:30',orders: 0,editedtotalPrice: 0},
    {date: '2023-04-02T12:00:00-06:30',orders: 40,editedtotalPrice: 0},
    {date: '2023-04-05T12:00:00-06:30',orders: 0,editedtotalPrice: 0},
  ]
  const obj = {
    flights: [...datas],
    stays: [...datas],
    tours: [...datas]
  }

  const data = {
    // labels: datas.map((d) => moment(d.date).format('MM DD')),
    labels: datas.map((d) => new Date(d.date).toLocaleString('default',{day: 'numeric',month: 'short'})),
    datasets: Object.entries(obj).map(([key,objs],i) => {
      return {
        label: key,
        data: objs.map((d) => d.orders*(i*10+1)),
        barThickness: 40,
        backgroundColor: ['#844AF9','#FFA500','#2970F8'][i%3],
        borderWidth: 1,
        pointRadius: 1
      }
    })
    // datasets: [
    //   {
    //     label: 'Total ',
    //     data: datas.map((d) => d.editedtotalPrice),
    //     // borderColor: theme?.palette?.primary?.main || '#1362FC',
    //     barThickness: 4,
    //     borderWidth: 2,
    //     pointRadius: 1,
    //     tension: 0.4,
    //     // backgroundColor: theme?.palette?.primaryLight?.main || '#1362FCaa',
    //   }
    // ]
  }


  
  return (
    <div className='pd-md flex flex-col gap-4'>
      <div className='flex gap-6 flex-wrap'>
        <div className='flex-1 flex gap-1 whitespace-nowrap'>
          Welcome back,
          <b>Chinemena</b>
        </div>
        <div className='flex-1 flex gap-4 justify-stretch'>
          <Link className='btn whitespace-nowrap' to="/">Create a new order</Link>
          <Link className='btn whitespace-nowrap' to="/">View orders needing review</Link>
          <Link className='btn whitespace-nowrap' to="/">View pending orders</Link>
        </div>
      </div>
      <div className='flex items-center justify-between gap-4'>
        <h5>Revenu Analytics</h5>
        <div className='flex gap-2'>
          <Button variant='text font-bold'>Export</Button>
          <div className='bg-primary/10 p-2 rounded-md flex items-center gap-2'>
            <SelectInput size='small' label={''} className='bg-secondary'>
              <MenuItem>Weekly</MenuItem>
              <MenuItem>Monthly</MenuItem>
              <MenuItem>Yearly</MenuItem>
              <MenuItem>All</MenuItem>
            </SelectInput>
            <div>
              <span className='whitespace-nowrap'>1st Jul - 31st Jul </span>
              <CalendarMonth className='text-xs' size='small' />
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap gap-4 items-center'>
        <div className='flex-1 rounded-md bg-gradient-to-r from-[#1E61DC] to-[#062759] p-3 flex flex-col gap-1 text-secondary'>
          <span>Total</span>
          <span>10,234,900</span>
        </div>
        <div className='flex-1 rounded-md light-bg p-3 flex flex-col gap-1'>
          <span>Flights</span>
          <span>10,234,900</span>
        </div>
        <div className='flex-1 rounded-md light-bg p-3 flex flex-col gap-1'>
          <span>Stays</span>
          <span>10,234,900</span>
        </div>
        <div className='flex-1 rounded-md light-bg p-3 flex flex-col gap-1'>
          <span>Tours</span>
          <span>10,234,900</span>
        </div>
      </div>
      <div className='flex flex-wrap gap-4'>
        <div className='light-bg flex-1 p-4'>
          <Bar options={options} data={data}  />
        </div>
      </div>
    </div>
  )
}
