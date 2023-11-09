import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../../components/HOC/Icon'
import { Tab, Tabs } from '@mui/material'
import BreadCrumb from '../../../components/DIsplay/Nav/BreadCrumb'
import MilesForFlights from './MilesForFlights'


export default function LearnMiles() {
  return (
    <div>
      <div className='w-full px-md shadow-sm bg-secondary border-b'>
        <Tabs variant="scrollable" value={0} className="font-bold" 
          TabIndicatorProps={{sx: {height: '4px'}}}>
            <Tab label='Learn More' data-link="/" icon={
              <div className='flex justify-center items-center  w-5 h-5 rounded-full border border-theme1'>
                <Icon icon='tabler:currency-naira' className='text-theme1 ' />
              </div>
            } iconPosition="start" className='!capitalize md:flex-1 !whitespace-nowrap' />
        </Tabs>
      </div>

      <div className=''>
        <div className='pd-md'>
          <BreadCrumb>
            <Link to={'/'}>Welcome</Link>
            <Link to='/welcome/support'>Support</Link>
            <Link to='/welcome/pricing'>Pricing</Link>
            <b>Learn More</b>
          </BreadCrumb>
        </div>


        <div className='flex flex-col items-center'>
          <div className='flex flex-col gap-5 py-10 my-10 items-center text-center pd-md'>
            <h1 className='font-black'>Everything you need to know</h1>
            <p className='max-w-[600px] text-lg'>Create your ideal travel itinerary by selecting and paying for the specific services and features that suit your preferences.</p>
          </div>

          {columns.map((component,i) => (
            React.cloneElement(component,{className: `min-h-screen flex w-full pd-md ${i%2 ? '':'bg-primary/10 flex-row-reverse '}`})
          ))}

        </div>
      </div>
    </div>
  )
}

const columns = [
  <MilesForFlights />,
  <MilesForFlights />,
]