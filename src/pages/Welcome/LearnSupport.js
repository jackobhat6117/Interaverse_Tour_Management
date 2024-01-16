import React, { useEffect, useState } from 'react'
import SearchInput from '../../components/form/SearchInput'
import Card from '../../components/DIsplay/Card'
import Icon from '../../components/HOC/Icon'
import Button1 from '../../components/form/Button1'
import socialMediaIcon from '../../assets/icons/socialMediaMobile.png'
import Collapsible from '../../components/DIsplay/Collapsible'
import ScreenViewObserver from '../../components/animation/ScreenViewObserver'
import getFAQs from '../../controllers/FAQ/getFAQs'
import { Link } from 'react-router-dom'
import liveChat from '../../assets/icons/Live Chat.svg'
import phoneBook from '../../assets/icons/Phone Book.svg'


export default function LearnSupport() {
  const [animStyle,setAnimStyle] = useState({header: 'invisible'})
  const [openedQ,setOpenedQ] = useState();
  const [FAQloading,setFAQLoading] = useState(false);
  const [questions,setQuestions] = useState([])

  useEffect(() => {
    loadFAQS();
  },[])

  async function loadFAQS() {
    setFAQLoading(true);
    const res = await getFAQs();
    if(res.return) {
      setQuestions(res.data?.data?.data || [])
    } 
    setFAQLoading(false); 
  }

  return (
    <div>
      <div className='pd-md'>
        {/* <div className=''>
          <BreadCrumb>
            <Link to={'/'}>Welcome</Link>
            <Link to='/welcome/learn'>Learn about miles</Link>
            <Link to='/welcome/pricing'>Pricing</Link>
            <b>Support</b>
          </BreadCrumb>
        </div> */}


        <div className='flex flex-col gap-6 items-center'>
          <ScreenViewObserver className='flex flex-col gap-10 py-10 my-12'
            onScreenViewCallBack={() => setAnimStyle(s => ({...s,header: 'slide-down'}))}
            // offScreenViewCallBack={() => setAnimStyle(s => ({...s,header: ''}))}
          >
            <h1 className={`font-black text-center slide-down`}>How can we help you?</h1>
            <SearchInput placeholder='Start typing your search' className='shadow-lg !rounded-full !p-2' 
              InputProps={{
                classes: {
                  notchedOutline: '!border-none'
                },
              }}
            />
          </ScreenViewObserver>

          <div className='flex flex-wrap md:flex-nowrap gap-4 py-10'>
            {cards.map((obj,i) => (
              <Card obj={obj} key={i} elem={ScreenViewObserver} className={`duration-${(i+1)*2*100}`} />
            ))}
          </div>

          <div className='flex flex-col gap-4'>
            <h4 className='py-2'>Frequently asked questions</h4>
            {FAQloading ? 
              <div className='border-theme1 flex justify-center'>
                <div className='load'></div>
              </div>
            : !questions.length ? 
              <div className='flex justify-center'>
                No questions
              </div>
            :null}
            {questions.map((obj,i) => (
              <div className='flex flex-wrap gap-4 p-4 rounded-md border items-center cursor-pointer' key={i}>
                <Collapsible value={openedQ === i} callback={(opened) => opened && setOpenedQ(i)}
                  header={
                    <div className='flex gap-4'>
                      <div className='bg-primary/[5%] rounded-md p-4 hidden sm:flex items-center justify-center'>{i+1}</div>
                      <div className='flex flex-col justify-center gap-2 flex-1 text-left min-w-[200px]'>
                        {obj.question}
                      </div>
                    </div>
                  }>
                  <p className='py-4 sm:pl-[53px] pr-[30px] leading-[1.7rem]'>{obj.answer}</p>
                </Collapsible>
              </div>
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
    icon: <img src={liveChat} className='h-[50px]' alt='' />,title: 'Live Chat',
    description: 'Need help with a purchase, or just want to chat with a friendly representative, our live chat is here to provide instant support.',
    footer: <div className='inline-block'>
      <Button1>Start live chat</Button1>
    </div>
  },
  {
    icon: <img src={phoneBook} className='h-[40px]' alt='' />,title: 'Contact details',
    description: "We're here to listen, assist, and engage with you, ensuring your inquiries and feedback are handled promptly and professionally.",
    footer: <div className='flex gap-3 justify-between text-primary/50'>
      <div className='bg-primary/[5%] rounded-md p-3'><Icon icon='subway:call-2' /></div>
      <div className='bg-primary/[5%] rounded-md p-3'><Icon icon='mdi:email-arrow-right' /></div>
      <div className='bg-primary/[5%] rounded-md p-3'><Icon icon='material-symbols:chat' /></div>
    </div>
  },
  {
    icon: <img alt='' src={socialMediaIcon} className='w-10 h-10' />,title: 'Social Media',
    description: 'Stay updated on the latest news, exciting promotions, and engaging content.',
    footer: <div className='flex gap-3 justify-between text-primary/50'>
      <Link to='https://instagram.com/IntraverseHQ' className='bg-primary/[5%] rounded-md p-3'><Icon icon='mdi:instagram' /></Link>
      <Link to='https://facebook.com/IntraverseHQ' className='bg-primary/[5%] rounded-md p-3'><Icon icon='mdi:facebook' /></Link>
      <Link to='https://twitter.com/IntraverseHQ' className='bg-primary/[5%] rounded-md p-3'><Icon icon='fa6-brands:square-x-twitter' /></Link>
      <Link to='https://linkedin/IntraverseHQ' className='bg-primary/[5%] rounded-md p-3'><Icon icon='mdi:linkedin' /></Link>
    </div>
  },
]
