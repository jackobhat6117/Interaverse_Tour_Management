import React from 'react'
import BreadCrumb from '../../components/DIsplay/Nav/BreadCrumb'
import { Link } from 'react-router-dom'
import Button1 from '../../components/form/Button1'
import Icon from '../../components/HOC/Icon'
import { Tab, Tabs } from '@mui/material'


export default function LearnPricing() {
  return (
    <div>
      <div className='w-full px-md shadow-sm bg-secondary border-b'>
        <Tabs variant="scrollable" value={0} className="font-bold" 
          TabIndicatorProps={{sx: {height: '4px'}}}>
            <Tab label='Pricing' data-link="/" icon={
              <div className='flex justify-center items-center  w-5 h-5 rounded-full border border-theme1'>
                <Icon icon='tabler:currency-naira' className='text-theme1 ' />
              </div>
            } iconPosition="start" className='!capitalize md:flex-1 !whitespace-nowrap' />
        </Tabs>
      </div>

      <div className='pd-md'>
        <div className=''>
          <BreadCrumb>
            <Link to={'/'}>Welcome</Link>
            <Link to='/welcome/support'>Support</Link>
            <Link to='/welcome/learn'>Learn</Link>
            <b>Pricing</b>
          </BreadCrumb>
        </div>


        <div className='flex flex-col gap-6 items-center'>
          <div className='flex flex-col gap-5 py-10 my-10 text-center items-center'>
            <h1 className='font-black'>Pay for what matters</h1>
            <p className='max-w-[600px] text-lg'>Create your ideal travel itinerary by selecting and paying for the specific services and features that suit your preferences.</p>
          </div>

          <div className='flex gap-4 min-w-[500px] max-w-full'>
            <Button1 className='' variant='outlined'>Monthly</Button1>
            <Button1 className=''>Annually</Button1>
          </div>

          <div className='flex overflow-x-auto gap-4 py-6'>
            {pricePlans.map((obj,i) => (
              <PricePlanCard obj={obj} key={i} />
            ))}
          </div>

          <div className='flex flex-col justify-center min-h-screen'>
            <div className='flex flex-col py-10 self-center'>
              <b>Features</b>
              <h3>Features Included In all plans</h3>
            </div>
            <div className='flex-wrap  gap-8  flex justify-center '>
              {features.map((obj,i) => (
                <div className='text-center inline-block flex flex-col gap-3 py-4 w-[250px]'>
                  <h5 className='flex-1'>{obj.title}</h5>
                  {obj.description}
                </div>
              ))}
            </div>
          </div>

          <div className='flex flex-col justify-center min-h-screen'>
            <div className='flex flex-col gap-10 py-10 self-center'>
              <b>breakdown</b>
              <h3>Pricing breakdown for<br /> all of miles products</h3>
            </div>
            {prices.map((obj,i) => (
              <PriceBreakdown obj={obj} key={i} />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

function PricePlanCard({obj}) {
  const style = {
    bg: 'bg-'+(obj.color)+'/5',
    border: `border-t-${obj.color}`
  }
  const CheckElem = (props) => (
    <div className='flex gap-2'>
      <Icon icon='lucide:check-circle' className='p-1' />
      {props.children}
    </div>
  )
  return (
    <div className={`border-t-8 ${style.border} flex flex-col border`}>
      <div className='p-3 flex flex-col gap-2'>
        <h4>{obj.title}</h4>
        <p>{obj.description}</p>
      </div>
      <div className={`${style.bg} flex flex-col gap-2 p-3 text-primary/50`}>
        Fee
        <h3>{obj.fee}</h3>
      </div>
      <div className='flex flex-col gap-4 flex-1 p-3'>
        <b>Key Features</b>
        {obj.features.map((feature,i) => (
          <CheckElem key={i}>{feature}</CheckElem>
        ))}
      </div>
      <div className='p-3'>
        {obj.footer}
      </div>
    </div>
  )
}

function PriceBreakdown({obj}) {
  const RowDisp = ({obj:{title,description,prices}}) => (
    <div className='flex justify-between gap-4 items-center border-b py-4'>
      <div className='flex flex-col gap-2'>
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
      {prices.map((obj,i) => (
        <div className='flex flex-col gap-2 items-end' key={i}>
          {obj.price}
          <small>{obj.subText}</small>
        </div>
      ))}
    </div>
  )
  return (
    <div className='flex flex-col'>
      <div className='border-l-8 p-4 flex justify-between gap-4 items-center bg-primary/5'>
        <div className='flex flex-col gap-2'>
          {obj.icon}
          <h5>{obj.packageName}</h5>
        </div>
        <div className='flex items-end'>
          <Link to={obj.link}>Learn more about {obj.packageName}...</Link>
        </div>
      </div>
      <div className='p-5'>
        {obj.order && <RowDisp obj={{
          title: 'Order',
          description: 'This fee is charged monthly for every confirmed order.',
          prices: [{price: obj.order,subText: 'per order'}]
        }} />}
        {obj.contentManagment && <RowDisp obj={{
          title: 'Managed Content',
          description: 'This fee is charged monthly for every confirmed order.',
          prices: [{price: obj.contentManagment+'%',subText: 'per total order volume'}]
        }} />}
        {obj.ancillaries && <RowDisp obj={{
          title: 'Ancillaries',
          description: 'This fee is charged monthly for every confirmed order.',
          prices: [{price: obj.ancillaries,subText: 'per paid ancillary'}]
        }} />}
        {obj.excessSearchFee && <RowDisp obj={{
          title: 'Excess Search Fee',
          description: 'This fee is charged monthly for every confirmed order.',
          prices: [{price: obj.excessSearchFee,subText: 'per excess search'}]
        }} />}
        {obj.subscription && <RowDisp obj={{
          title: 'Subscription',
          description: 'This fee is charged monthly and includes up to 50k links generated.',
          prices: [{price: obj.subscription,subText: 'per order'}]
        }} />}
        {obj.transaction && <RowDisp obj={{
          title: 'Transaction',
          description: 'Only pay this if using our Payments API. Fee is per card transaction.',
          prices: obj.transaction.map(obj => ({price: obj.price+'%',subText: 'per '+obj.label+' transaction'}))
        }} />}
      </div>
    </div>
  )
}
const prices = [
  {packageName: 'Flights',order: 5000,contentManagment: 1,ancillaries: 2500,excessSearchFee: 100,
    link: '',
    icon: <img src='' alt='' />},
  {packageName: 'Stays',order: 5000,contentManagment: 1,excessSearchFee: 100,
    link: '',
    icon: <img src='' alt='' />},
  {packageName: 'Tours',order: 5000,contentManagment: 1,ancillaries: 2500,excessSearchFee: 100,
    link: '',
    icon: <img src='' alt='' />},
  {packageName: 'Protection',order: 5000,contentManagment: 1,
    link: '',
    icon: <img src='' alt='' />},
  {packageName: 'Links',subscription: 50000,
    link: '',
    icon: <img src='' alt='' />},
  {packageName: 'Payments',transaction: [{label: 'local',price: 3},{label: 'international',price: 4}],
    link: '',
    icon: <img src='' alt='' />},
]

const pricePlans = [
  {title: 'Pay as you go',description: 'APIs to components - everything you need to build your travel experience.',
    fee: 'Zero Upfront',
    features: ['Start selling instantly','No upfront payment','Email based technical support'],
    color: '#2DA771',
    footer: <Button1>Start your 30 day free trial</Button1>},
  {title: 'Pay as you go',description: 'APIs to components - everything you need to build your travel experience.',
    fee: 'Zero Upfront',
    features: ['Start selling instantly','No upfront payment','Email based technical support'],
    color: '#1E61DC',
    footer: <Button1>Start your 30 day free trial</Button1>},
  {title: 'Contact us',description: 'APIs to components - everything you need to build your travel experience.',
    fee: 'Contact us',
    features: ['Eerything in pay as you go plan','Enterprice level pricing','Volume discount',
      'Tailored monetisation strategy support',
      'Dedicated technical support',
      'Use your own IATA accreditation'
    ],
    color: '#6A59D1',
    footer: <Button1>Contact our sales team</Button1>},
]

const features = [
  {title: 'Advanced selling platform',description: 'Manage your customers, bookings and orders from an easy to use dashboard.'},
  {title: 'Instant ticketing',description: 'Issue tickets instantly using our ticketing authority once payment is made.'},
  {title: 'Booking management',description: 'Manage all bookings seamlessly. Edit and cancel any booking made on platform'},
  {title: 'Branded email notifications & reminders',description: 'Send emails, trip updates, and turn on automated payment reminder emails with customizable templates.'},
  {title: 'Ancillaries',description: 'Manage your customers, bookings and orders from an easy to use dashboard.'},
  {title: 'Deals & commissions',description: 'Enjoy deals, discounts and commission from airlines instantly once order is confirmed.'},
  {title: 'Ticket management',description: 'Re-issue tickets, void and refund issued tickets.'},
  {title: 'Multiple suppliers',description: 'Access offers from multiple suppliers and the best deals.'},
]