import React from 'react'
import rocket from '../../../assets/images/launching-a-rocket-over-gear.png'
import Icon from '../../HOC/Icon'
import { useSelector } from 'react-redux'
import Button1 from '../../form/Button1'
import Card from '../../DIsplay/Card'
import StepsCheck from './StepsCheck'
import checkProfileComplete from '../../../features/profile/checkProfileComplete'
import { useNavigate } from 'react-router-dom'

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
      <div className='flex flex-wrap md:flex-nowrap gap-6 items-end justify-between w-full'>
        <div className='flex flex-col justify-between gap-4'>
          <h4 className='w-full py-4 text-start slide-out duration-600'>
            Welcome back, {user.firstName} {user.lastName}
          </h4>
          <img src={rocket} alt='rocket' className='z-10 translate-y-[120px] hidden md:block' />
        </div>
        <div className='flex flex-col gap-4 max-w-[800px] text-start'>
          <h5 className='py-4'>Activate business on Intraverse</h5>
          {list.map((obj,i) => (
            <StepsCheck i={i} key={i} obj={obj} complete={obj.complete} link={'/profile?step='+(i+1)} />
          ))}
        </div>
      </div>
      <div className='bg-black rounded-md relative '>
        <div className='bg-theme1/50 p-4 rounded-md flex justify-end'>
          <img src={rocket} alt='rocket' className='bottom-[0%] left-2 h-[100px] absolute md:hidden' />
          <div>
            <Button1 title={!complete && 'Complete your profile to activate your account'} 
              onClick={() => navigate('/profile?step=5')}
              className={`flex ${complete ? '!bg-secondary' : '!bg-secondary/20 !cursor-not-allowed'} !px-6 !text-primary`} 
              disabled={!complete}>Activate my business</Button1>
          </div>
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
