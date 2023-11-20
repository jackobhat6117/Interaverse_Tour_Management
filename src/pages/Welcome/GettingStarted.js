import React from 'react'
import Icon from '../../components/HOC/Icon'
import Button1 from '../../components/form/Button1'
import Card from '../../components/DIsplay/Card'
import {ReactComponent as RocketIcon} from '../../assets/icons/Group 11487.svg'
import {ReactComponent as ScheduleIcon} from '../../assets/icons/Group 11493.svg'
import {ReactComponent as FreeTrialIcon} from '../../assets/icons/FreeTrial.svg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function GettingStarted() {
  const {user} = useSelector(state => state.user.userData)
  const navigate = useNavigate();
  
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
  const startCards = [
    {title: 'Activate business',description: 'Submit your business details to start selling live travel products',
      link: '/welcome/',
      icon: <RocketIcon />,
      active: user?.detail?.isProfileComplete,
      render: () => (
        <Button1 onClick={() => navigate('/welcome/')} 
          className={`${user?.detail?.requestVerification ? '!bg-primary/60':''}`}
        >{user?.detail?.requestVerification ? 'Update business' : 'Activate business'}</Button1>
      )
    },
    {title: 'Schedule training',description: 'Learn what you can do with our platform  and APIs.',
      link: '/welcome',
      icon: <ScheduleIcon />,
      active: user?.detail?.requestVerification,
    },
    {title: 'Start free trial',description: 'Start your 30-days free trial with all features enabled.',
      link: '/welcome',
      icon: <FreeTrialIcon />,
      active: false
    },
  ]

  return (
    <div className='flex flex-col gap-10 pd-md bg-theme1/5'>
      <div className='flex flex-col gap-6 items-center'>
        <h4 className='slide-down'>Welcome to Intraverse</h4>
        <p>Your business has not been activated</p>
      </div>
      <div className='flex justify-center gap-6 flex-wrap md:flex-nowrap'>
        {startCards.map((obj,i) => (
          <StartCard key={i} obj={obj} />
        ))}
      </div>
      <div className='flex gap-6 flex-wrap md:flex-nowrap py-10 my-10'>
        {cards.map((card,i) => 
          <Card obj={card} key={i} className={`duration-${(i+1)*2*100}`} />
        )}
      </div>
    </div>
  )
}

function StartCard({obj}) {
  const navigate = useNavigate();

  return (
    <div className='card p-10 flex flex-col gap-4 text-center max-w-[300px]'>
      <div className='flex items-center justify-center'>
        {obj.icon}
      </div>
      <p className='flex-1'>{obj.description}</p>
      {
        obj?.render ? obj?.render() :
          <Button1 onClick={() => navigate(obj.link)} disabled={obj.active ? false : true}>{obj.title}</Button1>
      }
    </div>
  )
}