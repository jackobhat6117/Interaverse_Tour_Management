import React from 'react'
import rocket from '../../../assets/icons/rocket.svg'
import rocketGear from '../../../assets/icons/Gear.svg'
import Icon from '../../HOC/Icon'
import { useSelector } from 'react-redux'
import Button1 from '../../form/Button1'
import Card from '../../DIsplay/Card'
import StepsCheck from './StepsCheck'
import checkProfileComplete from '../../../features/profile/checkProfileComplete'
import { useNavigate } from 'react-router-dom'
import success from '../../../assets/icons/success.svg'

export default function ProfileStatusCheck() {
  const {user} = useSelector(state => state.user.userData)  
  const data = checkProfileComplete(user);
  const navigate = useNavigate();
  

  const list = [
    {label: 'Business Detail',title: 'Submit business information',description: 'please tell us a little about your travel business to serve you better',complete: true},
    {label: 'Legal Entity',title: 'Submit legal entity',description: 'As a regulated travel technology company, we would need  your business registration information.',complete: false},
    {label: 'Key Contact',title: 'Submit representative information',description: 'A business representative is either an owner, director or shareholder of your business.',complete: false},
  ]
  list.map(obj => {
    return obj.complete = data?.findIndex(d => (d.label === obj.label) && d.complete) >= 0
  })
  const complete = list.every(obj => obj.complete);
  console.log(list,data)

  const cards = [
    {title: 'Support',description: 'Find answers to some of the most frequently asked questions about Intraverse.',
      link: '/welcome/support',
      icon: <Icon icon='material-symbols-light:contact-support' />, footer: <Button1 variant='outlined'>Continue</Button1>},
    {title: 'Learn about Miles',description: 'Discover all the features of our flagship product and the tools to grow your business.',
      link: '/welcome/learn',
      icon: <Icon icon='iconoir:learning' />, footer: <Button1 variant='outlined'>Continue</Button1>},
    {title: 'Pricing',description: 'We only make money when you are happy using our platform',
      link: '/welcome/pricing',
      icon: <Icon icon='tabler:currency-naira' />, footer: <Button1 variant='outlined'>View Pricing</Button1>},
  ]
  return (
    <div className='flex flex-col gap-10 pd-md'>
      <div className='flex flex-wrap md:flex-nowrap gap-6 items-center justify-between w-full'>
        <div className='flex w-1/2 flex-col justify-between self-start gap-4'>
          {/* <h4 className='w-full py-4 text-start slide-out duration-600 '>
            Welcome back, {user.firstName} {user.lastName}
          </h4> */}
          <div className=' flex justify-center sticky top-0 z-20'>
            <img src={rocket} alt='rocket' className='z-20 h-[500px]  xtranslate-y-[100px]  hidden md:block' />
          </div>
          <div className='relative z-10'>
            <img src={rocketGear} alt='' className='z-10 hidden md:block translate-y-[80px]' />
          </div>
        </div>
        <div className='flex flex-col gap-4 max-w-[800px] text-start overflow-x-clip'>
          {user?.detail?.requestedVerification ? 
            <div className='border flex gap-3 rounded-md bg-theme1/20'>
              <div className='w-[100px] flex-0 bg-bubble rounded-md'>
                <img src={success} alt='' className='px-5 -translate-y-1/2' />
              </div>
              <div className='flex-1 flex flex-col gap-4 p-4'>
                <h4 className=''>Under Review</h4>
                <small>We're reviewing your business activation request! Please expect feedback at your email address within 24 hours.</small>
              </div>
            </div>
          :null}
          <h5 className='py-4'>Activate business on Intraverse</h5>
          {list.map((obj,i) => (
            <StepsCheck i={i} key={i} obj={obj} complete={obj.complete} link={`/profile?${obj.complete?'step=5&edit='+(i+1):'step='+(i+1)}`} />
          ))}
        </div>
      </div>
      <div className='rounded-md relative'>
        <div className='bg-frame xbg-theme1/50 p-4 rounded-md flex justify-end min-h-[60px]'>
          <img src={rocket} alt='rocket' className='bottom-[10%] left-2 h-[90px] absolute md:hidden' />
          {!user?.detail?.requestedVerification ? 
            <div>
              <Button1 tooltip={!complete && 'Complete your profile to activate your account'} 
                onClick={() => navigate('/profile?step=5')}
                className={`flex ${complete ? '!bg-secondary' : '!bg-secondary/20 !cursor-not-allowed'} !px-6 !text-primary`} 
                disabled={!complete}>Activate my business</Button1>
            </div>
          :null}
        </div>
      </div>
      <div className='flex gap-6 flex-wrap md:flex-nowrap'>
        {cards.map((card,i) => 
          <Card obj={card} key={i} className={`duration-${(i+1)*2*100}`} />
        )}
      </div>
    </div>
  )
}
