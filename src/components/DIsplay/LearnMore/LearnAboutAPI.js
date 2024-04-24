import React from 'react';
import APIImage from '../../../assets/images/API.png';


export default function LearnAboutAPI({callback,...props}) {
    return (
      <div className='flex flex-col gap-5'>
        <h5 className=''>API</h5>
        <div className='relative  '>
          <img alt='' src={APIImage} className='w-full h-full object-cover' />
        </div>
        <div className='flex flex-col gap-4'>
          <b>Unlock Endless Possibilities with Our API Feature</b>
          <div>
            Experience the power of seamless integration and unparalleled customization with our API (Application Programming Interface) feature. Whether you're a travel agency, tour operator, or technology partner, our API empowers you to innovate and elevate your travel booking experience like never before.
          </div>
          <b>
            Key Benefits:
          </b>
          <ol className='flex flex-col gap-2 list-decimal ml-4' type='1'>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Seamless Integration:</b> 
                Seamlessly integrate our robust API into your existing systems and workflows. Whether you're building a custom travel website, mobile app, or internal booking platform, our API makes integration a breeze.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Real-time Data Access:</b> 
                Access up-to-date travel data, including flights, hotels, car rentals, and activities, in real-time. Our API provides comprehensive access to a vast inventory of travel options, ensuring that your customers always have access to the latest information.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Customizable Solutions:</b> 
                Tailor the travel booking experience to match your brand and unique requirements. With our API, you have the flexibility to customize everything from search filters and booking flows to payment options and user interfaces.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Enhanced User Experience:</b> 
                Delight your customers with a seamless and intuitive booking experience. Our API allows you to create user-friendly interfaces, personalized recommendations, and interactive booking tools that keep travelers coming back for more.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Scalability and Reliability:</b> 
                Scale your business with confidence knowing that our API is built for reliability and scalability. Whether you're handling a few bookings or millions of transactions, our infrastructure can handle the load, ensuring a smooth experience for your users.
              </div>
            </li>
          </ol>
          <b>How It Works:</b>
          <ol className='flex flex-col gap-2 list-decimal ml-4' type='1'>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>API Integration:</b> 
                Integrate our API into your platform using our comprehensive documentation and developer resources. Our RESTful API is easy to integrate with any programming language or framework, allowing you to get up and running quickly.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Access Travel Data:</b> 
                Gain access to our extensive inventory of travel options, including flights, hotels, car rentals, and activities, through our API endpoints. Retrieve real-time availability, pricing, and booking information to power your applications and services.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Customize Your Solution:</b> 
                Customize every aspect of the travel booking experience to match your brand and specifications. From designing bespoke user interfaces to implementing unique booking flows, the possibilities are endless with our flexible API.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Test and Deploy:</b> 
                Test your integration in a sandbox environment before deploying it to production. Our developer tools and testing environments make it easy to ensure that your integration is working seamlessly before going live.
              </div>
            </li>
          </ol>
        </div>
        {callback && callback(props)}
      </div>
    )
  }
  