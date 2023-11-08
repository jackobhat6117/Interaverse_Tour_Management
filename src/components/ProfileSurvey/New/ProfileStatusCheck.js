import React from 'react'
import rocket from '../../../assets/images/launching-a-rocket-over-gear.png'
import Icon from '../../HOC/Icon'
import { useSelector } from 'react-redux'
import Button1 from '../../form/Button1'
import { useNavigate } from 'react-router-dom'

export default function ProfileStatusCheck({data}) {
  const {user} = useSelector(state => state.user.userData)

  const list = [
    {label: 'Business Detail',title: 'Submit business information',description: 'please tell us a little about your travel business to serve you better',complete: true},
    {label: 'Legal Entity',title: 'Submit legal entity',description: 'As a regulated travel technology company, we would need  your business registration information.',complete: false},
    {label: 'Key Contact',title: 'Submit representative information',description: 'A business representative is either an owner, director or shareholder of your business.',complete: false},
    {label: 'Training',title: 'Schedule team training',description: 'Select a date you would prefer for us to start your training to better understand how to use our platform.',complete: false},
  ]
  list.map(obj => {
    return obj.complete = data.findIndex(d => (d.label === obj.label) && d.complete) >= 0
  })
  console.log(list,data)

  const cards = [
    {title: 'Support',description: 'Find answers to some of the most frequently asked questions about Intraverse.',
      icon: <Icon icon='material-symbols-light:contact-support' />, footer: <Button1 variant='outlined'>Continue</Button1>},
    {title: 'Learn about Miles',description: 'Discover all the features of our flagship product and the tools to grow your business.',
      icon: <Icon icon='iconoir:learning' />, footer: <Button1 variant='outlined'>Continue</Button1>},
    {title: 'Pricing',description: 'We only make money when you are happy using our platform',
      icon: <Icon icon='tabler:currency-naira' />, footer: <Button1 variant='outlined'>View Pricing</Button1>},
  ]
  return (
    <div className='flex flex-col gap-10 py-6'>
      <div className='flex gap-6 items-end justify-between w-full'>
        <div className='flex flex-col justify-between gap-4'>
          <h4 className='w-full p-4 text-start'>
            Welcome back, {user.firstName} {user.lastName}
          </h4>

          <img src={rocket} alt='rocket' className='translate-y-[120px]' />
        </div>
        <div className='flex flex-col gap-4 max-w-[800px] text-start'>
          <h5 className='py-4'>Activate business on Intraverse</h5>
          {list.map((obj,i) => (
            <StepsCheck i={i} key={i} obj={obj} complete={obj.complete} />
          ))}
        </div>
      </div>
      <div className='bg-black rounded-md'>
        <div className='bg-theme1/50 p-4 flex justify-end'>
          <div>
            <Button1>Continue</Button1>
          </div>
        </div>
      </div>
      <div className='flex gap-6 flex-wrap md:flex-nowrap'>
        {cards.map((card,i) => 
          <Card obj={card} key={i} />
        )}
      </div>
    </div>
  )
}

function Card({obj}) {
  return (
    <div className='flex flex-1 flex-col gap-4 justify-end items-start text-start min-w-[200px] min-h-[250px] border bg-secondary rounded-md p-6'>
      <div className='flex flex-col gap-2'>
        <div>{obj.icon}</div>
        <div>{obj.title}</div>
      </div>
      <p>{obj.description}</p>
      <div>{obj.footer}</div>
    </div>
  )
}

function StepsCheck({i,obj,complete}) {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate('/profile?step='+(i+1))
  }
  return (
    <div className='flex gap-4 p-4 rounded-md border items-center cursor-pointer' onClick={handleNavigate}>
      <div className='bg-primary/[5%] rounded-md p-4 flex items-center justify-center'>{i+1}</div>
      <div className='flex flex-col gap-2 flex-1 text-left'>
        {obj.title}
        <p>{obj.description}</p>
      </div>
      <div className='w-10 h-10 flex justify-center items-center rounded-full bg-primary/10'>
        <Icon icon='game-icons:check-mark' className={`${complete?'text-theme1':'text-primary/20'}`} />
      </div>
    </div>
  )
}