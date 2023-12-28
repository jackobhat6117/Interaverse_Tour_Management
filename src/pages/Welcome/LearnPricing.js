import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button1 from '../../components/form/Button1'
import Icon from '../../components/HOC/Icon'
import { formatMoney } from '../../features/utils/formatMoney'
import ScreenViewObserver from '../../components/animation/ScreenViewObserver'
import { def } from '../../config'


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
export default function LearnPricing() {
  const [animStyles,setAnimStyles] = useState({
    breakdown: 'invisible',features: 'invisible',feature: 'invisible'
  })

  const memoPrices = React.useMemo(() => prices.map(obj => obj),[])
  
  return (
    <div>
      <div className='pd-md'>

        <div className='flex flex-col gap-6 items-center'>
          <div className='flex flex-col gap-5 py-10 my-10 text-center items-center animate-fade-in'>
            <h1 className='font-black slide-down'>Explore our plans</h1>
            <p className='max-w-[600px] text-lg'>
              Discover the best pricing plan for your travel business. All plans include our  selling platform, 
              Booking  Management Dashboard, Order confirmations, Automatic Ticketing and Email Messaging features.
            </p>
          </div>

          <div className='flex gap-4 sm:w-[500px] w-full max-w-full justify-center flex-wrap'>
            <div className='flex-1'>
              <Button1 className='' variant='outlined'>Monthly</Button1>
            </div>
            <div className='flex-1'>
              <Button1 className=''>Annually</Button1>
            </div>
          </div>

          <div className='flex flex-wrap sm:flex-nowrap snap-x snap-mandatory snap-always overflow-x-auto max-w-full gap-4 py-6'>
            {pricePlans.map((obj,i) => (
              <PricePlanCard obj={obj} key={i} />
            ))}
          </div>

          <div className='flex flex-col justify-center min-h-screen'>
            <ScreenViewObserver 
              onScreenViewCallBack={() => setAnimStyles(s => ({...s,features: 'slide-down !duration-1000'}))} 
              offScreenViewCallBack={() => setAnimStyles(s => ({...s,features: ''}))} 
              className={`flex flex-col self-center`}
              >
              <div className={`flex flex-col py-10 self-center min-h-[60vh] justify-center ${animStyles.features}`}>
                <b>Features</b>
                <h3 className={``}>Features Included In all plans</h3>
              </div>
            </ScreenViewObserver>
            <div className='flex-wrap  gap-8  flex justify-center '>
              {features.map((obj,i) => <FeatureDisp i={i} key={i} obj={obj} />)}
            </div>
          </div>

          <div className='flex flex-col justify-center min-h-screen'>
            <ScreenViewObserver 
              onScreenViewCallBack={() => setAnimStyles(s => ({...s,breakdown: 'slide-out slide-slow !duration-1000'}))} 
              offScreenViewCallBack={() => setAnimStyles(s => ({...s,breakdown: ''}))} 
              className={`flex flex-col gap-10 py-10 self-center min-h-[60vh] justify-center`}
            >
              <b>breakdown</b>
              <h3 className={`${animStyles.breakdown}`}>Pricing breakdown for<br /> all of miles products</h3>
            </ScreenViewObserver>
            {memoPrices.map((obj,i) => (
              <PriceBreakdown obj={{...obj,color: ['#cc661155','#11cc7755','#5511ff55'][i%3]}} key={i} />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

function PricePlanCard({obj}) {
  const CheckElem = (props) => (
    <div className='flex gap-2'>
      <Icon icon='lucide:check-circle' className='p-1' />
      {props.children}
    </div>
  )
  return (
    <div className={`border-t-8 flex flex-col border snap-center min-w-[300px]`} style={{borderColor: obj.color}}>
      <div className='p-3 flex flex-col gap-2'>
        <h4>{obj.title}</h4>
        <p className='min-h-[5rem]'>{obj.description}</p>
      </div>
      <div className={`flex flex-col gap-2 p-3 text-primary/50`}  style={{backgroundColor: obj.color+"44"}}>
        Fee
        <div className='flex gap-2 items-end'>
          <h3>{obj.fee}</h3>
          / Month
        </div>
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

const FeatureDisp = React.memo(({obj,i}) => {
  const [anim,setAnim] = useState('invisible')
  return (
<ScreenViewObserver
  onScreenViewCallBack={() => setAnim('zoom-in !duration-1000')} 
  offScreenViewCallBack={() => setAnim('')}   
>
  <div
  className={`text-center inline-block flex flex-col gap-3 py-4 w-[250px] ${anim} ${'duration-'+(i * 100 * 2)}`}
  >
  <h5 className='flex-1'>{obj?.title}</h5>
  {obj?.description}
  </div>
</ScreenViewObserver>
)}
,(p,n) => JSON.stringify(p) === JSON.stringify(n))

const PriceBreakdown = React.memo(({obj}) => {
  const [style,setStyle] = useState({breaks: 'invisible'})
  // console.log('price breakdown loaded',style)
  const RowDisp = ({obj:{title,description,prices},className}) => (
    <div className={`flex justify-between gap-4 items-center border-b py-4  ${style.breaks} ${className}`}>
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
  const handleInView = () => setStyle(s => ({...s,breaks: 'slide-out'}))
  const handleOffView = () => setStyle(s => ({...s,breaks: ''}))
  return (
    <ScreenViewObserver
      onScreenViewCallBack={handleInView}
      offScreenViewCallBack={handleOffView}
      className='flex flex-col snap-start'
    >
      <div className={'border-l-8 p-4 flex justify-between gap-4 items-center bg-primary/5  '} style={{borderColor: obj.color}}
      >
        <div className='flex flex-col gap-2'>
          {obj.icon}
          <h5>{obj.packageName}</h5>
        </div>
        <div className='flex items-end'>
          <Link to={obj.link}>Learn more about {obj.packageName}...</Link>
        </div>
      </div>
      <div
        className='p-5'
      >
        {obj.order && <RowDisp obj={{
          title: 'Order',
          description: 'This fee is charged monthly for every confirmed order.',
          prices: [{price: formatMoney(obj.order),subText: 'per order'}]
        }} className={`duration-200`} />}
        {obj.contentManagment && <RowDisp obj={{
          title: 'Managed Content',
          description: 'This fee is charged monthly for every confirmed order.',
          prices: [{price: obj.contentManagment+'%',subText: 'per total order volume'}]
        }} className={`duration-400`} />}
        {obj.ancillaries && <RowDisp obj={{
          title: 'Ancillaries',
          description: 'This fee is charged monthly for every confirmed order.',
          prices: [{price: formatMoney(obj.ancillaries),subText: 'per paid ancillary'}]
        }} className={`duration-600`} />}
        {obj.excessSearchFee && <RowDisp obj={{
          title: 'Excess Search Fee',
          description: 'This fee is charged monthly for every confirmed order.',
          prices: [{price: formatMoney(obj.excessSearchFee),subText: 'per excess search'}]
        }} className={`duration-1000`} />}
        {obj.subscription && <RowDisp obj={{
          title: 'Subscription',
          description: 'This fee is charged monthly and includes up to 50k links generated.',
          prices: [{price: formatMoney(obj.subscription),subText: 'per order'}]
        }} className={`duration-800`} />}
        {obj.transaction && <RowDisp obj={{
          title: 'Transaction',
          description: 'Only pay this if using our Payments API. Fee is per card transaction.',
          prices: obj.transaction.map(obj => ({price: obj.price+'%',subText: 'per '+obj.label+' transaction'}))
        }} className={`duration-${1000}`} />}
      </div>
    </ScreenViewObserver>
  )
}, (p,n) => {
  return JSON.stringify(p) === JSON.stringify(n)})

const pricePlans = [
  {title: 'Starter',description: 'APIs to components - everything you need to build your travel experience.',
    fee: def.currency+'0',
    features: ['Start selling instantly','Earn airline commissions','Issue tickets with our authority','Issue tickets with our authority','Change name, date and re-issue ','No upfront payment','$3 ticketing fee','$2 Ancillaries fee'],
    color: '#2DA771',
    footer: <Button1>Start your 30 day free trial</Button1>},
  {title: 'Growth',description: 'APIs to components - everything you need to build your travel experience.',
    fee: def.currency+' 50,000',
    features: ['All starter features','Use own PCC / Office ID','Use your own IATA accreditation','Accept payment directly','Get your own selling website','$500 one-time setup fee applies*'],
    color: '#1E61DC',
    footer: <Button1>Start your 30 day free trial</Button1>},
  {title: 'Enterprise',description: 'Get a full custom implementation done by our dedicate team.',
    fee: 'Contact us',
    features: ['Eerything in pay as you go plan','Enterprice level pricing','Volume discount','Tailored monetisation strategy support','Dedicated technical support','Use your own IATA accreditation'],
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