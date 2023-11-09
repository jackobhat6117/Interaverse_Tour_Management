import React from 'react'
import BreadCrumb from '../../components/DIsplay/Nav/BreadCrumb'
import { Link } from 'react-router-dom'
import SearchInput from '../../components/form/SearchInput'
import Card from '../../components/DIsplay/Card'
import Icon from '../../components/HOC/Icon'
import Button1 from '../../components/form/Button1'
import StepsCheck from '../../components/ProfileSurvey/New/StepsCheck'
import socialMediaIcon from '../../assets/icons/socialMediaMobile.png'
import { Tab, Tabs } from '@mui/material'


export default function LearnSupport() {
  return (
    <div>
      <div className='w-full px-md shadow-sm bg-secondary border-b'>
        <Tabs variant="scrollable" value={0} className="font-bold" 
          TabIndicatorProps={{sx: {height: '4px'}}}>
            <Tab label='Support' data-link="/" icon={<Icon icon='material-symbols-light:contact-support-outline' className='text-theme1 ' />} iconPosition="start" className='!capitalize md:flex-1 !whitespace-nowrap' />
        </Tabs>
      </div>

      <div className='pd-md'>
        <div className=''>
          <BreadCrumb>
            <Link to={'/'}>Welcome</Link>
            <Link to='/welcome/learn'>Learn about miles</Link>
            <Link to='/welcome/pricing'>Pricing</Link>
            <b>Support</b>
          </BreadCrumb>
        </div>


        <div className='flex flex-col gap-6 items-center'>
          <div className='flex flex-col gap-10 py-10 my-12'>
            <h1 className='font-black'>How can we help you?</h1>
            <SearchInput placeholder='Start typing your search' className='shadow-lg !rounded-full !p-2' 
              InputProps={{
                classes: {
                  notchedOutline: '!border-none'
                },
              }}
            />
          </div>

          <div className='flex flex-wrap md:flex-nowrap gap-4 py-10'>
            {cards.map((obj,i) => (
              <Card obj={obj} key={i} />
            ))}
          </div>

          <div className='flex flex-col gap-4'>
            <h4 className='py-2'>Frequently asked questions</h4>
            {questions.map((obj,i) => (
              <StepsCheck obj={obj} i={i} complete={true} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const questions = [
  {title: "Is your travel technology adaptable to my business's unique requirements?",
    description: "Yes, our solutions are customizable to meet the specific needs of your business. We work closely with you to understand your requirements and tailor our technology accordingly."},
  {title: "Do you provide support and maintenance for your travel technology solutions?",
    description: "Do you provide support and maintenance for your travel technology solutions?"},
  {title: "What is the pricing structure for your travel technology solutions?",
    description: "Pricing can vary depending on the specific solution and customization required. We offer competitive pricing models and can provide a detailed quote after understanding your needs."},
  {title: " Do you provide training for our staff to use your technology effectively?",
    description: "Yes, we offer training and onboarding services to ensure that your team can use our technology efficiently and maximize its benefits."},
  {title: "How can your travel technology solutions benefit my travel agency or business?",
    description: "Our solutions can help you automate booking processes, manage inventory, enhance customer engagement, increase sales, and provide a seamless online experience for your customers."},
]

const cards = [
  {
    icon: <div className='min-h-[50px]'><Icon icon='bi:chat-dots-fill' /></div>,title: 'Live Chat',
    description: 'Need help with a purchase, or just want to chat with a friendly representative, our live chat is here to provide instant support.',
    footer: <div className='inline-block'>
      <Button1>Start live chat</Button1>
    </div>
  },
  {
    icon: <div className='min-h-[50px]'><Icon icon='bi:chat-dots-fill' /></div>,title: 'Contact details',
    description: 'Need help with a purchase, or just want to chat with a friendly representative, our live chat is here to provide instant support.',
    footer: <div className='flex gap-3 justify-between text-primary/50'>
      <div className='bg-primary/[5%] rounded-md p-3'><Icon icon='subway:call-2' /></div>
      <div className='bg-primary/[5%] rounded-md p-3'><Icon icon='mdi:email-arrow-right' /></div>
      <div className='bg-primary/[5%] rounded-md p-3'><Icon icon='material-symbols:chat' /></div>
    </div>
  },
  {
    icon: <div className='min-h-[50px]'><img alt='' src={socialMediaIcon} className='w-10 h-10' /></div>,title: 'Social Media',
    description: 'Need help with a purchase, or just want to chat with a friendly representative, our live chat is here to provide instant support.',
    footer: <div className='flex gap-3 justify-between text-primary/50'>
      <div className='bg-primary/[5%] rounded-md p-3'><Icon icon='mdi:instagram' /></div>
      <div className='bg-primary/[5%] rounded-md p-3'><Icon icon='mdi:facebook' /></div>
      <div className='bg-primary/[5%] rounded-md p-3'><Icon icon='mdi:twitter' /></div>
      <div className='bg-primary/[5%] rounded-md p-3'><Icon icon='mdi:linkedin' /></div>
    </div>
  },
]
