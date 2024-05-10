import React from 'react';
import webhookImage from '../../../assets/images/Webhook.png';


export default function LearnAboutWebhook({callback,...props}) {
    return (
      <div className='flex flex-col gap-5'>
        <h5 className=''>API</h5>
        <div className='relative  '>
          <img alt='' src={webhookImage} className='w-full h-full object-cover' />
        </div>
        <div className='flex flex-col gap-4'>
          <b>Discover Real-time Updates with Our Webhook Feature</b>
          <div>
            Stay ahead of the curve and receive instant notifications about booking events with our powerful webhook feature. Whether you're a travel agency, tour operator, or technology partner, our webhook functionality ensures that you're always informed about critical events in the booking process.
          </div>
          <b>
            Key Benefits:
          </b>
          <ol className='flex flex-col gap-2 list-decimal ml-4' type='1'>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Instant Notifications:</b> 
                Receive real-time notifications about booking events directly to your server or application. Whether it's a new booking, reservation update, or cancellation, our webhook delivers instant updates, keeping you informed every step of the way.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Automated Processes:</b> 
                Streamline your workflow and automate tasks with webhook triggers. Use webhook notifications to trigger actions such as sending confirmation emails, updating inventory, or syncing data with external systems, saving you time and effort.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Enhanced Customer Experience:</b> 
                Provide a seamless and responsive experience for your customers by keeping them informed about their bookings in real-time. With webhook notifications, you can send timely updates and alerts to your customers, ensuring a smooth and hassle-free experience.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Improved Visibility:</b> 
                Gain insights into booking activity and trends with webhook notifications. Monitor booking events, track customer behavior, and analyze performance metrics to optimize your business operations and drive growth.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Flexible Configuration: </b> 
                Customize webhook settings to meet your specific requirements. Choose which events you want to receive notifications for, define the format and delivery method of notifications, and configure webhook endpoints to seamlessly integrate with your systems.
              </div>
            </li>
          </ol>
          <b>How It Works:</b>
          <ol className='flex flex-col gap-2 list-decimal ml-4' type='1'>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Setup Webhook:</b> 
                Configure webhook endpoints in your application to receive notifications from our API. Simply provide the URL of your webhook endpoint and specify the events you want to receive notifications for.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Receive Notifications:</b> 
                Whenever a relevant booking event occurs, our API sends a POST request to your webhook endpoint with details about the event. Receive the notification payload and process it according to your business logic.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Take Action:</b> 
                Use webhook notifications to trigger actions in your application or backend systems. Whether it's updating records, sending notifications, or performing automated tasks, webhook notifications empower you to take timely action based on booking events.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Monitor and Analyze:</b> 
                Monitor webhook activity and analyze the impact of booking events on your business. Gain insights into customer behavior, booking trends, and system performance to optimize your processes and drive business growth.
              </div>
            </li>
          </ol>
        </div>
        {callback && callback(props)}
      </div>
    )
  }
  