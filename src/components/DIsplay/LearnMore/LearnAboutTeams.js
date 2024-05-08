import React from 'react';
import TeamImage from '../../../assets/images/Team.png';


export default function LearnAboutTeams({callback,...props}) {
    return (
      <div className='flex flex-col gap-5'>
        <div className='relative h-[160px] '>
          <img alt='' src={TeamImage} className='w-full h-full object-cover' />
          <h5 className='text-secondary absolute top-[calc(50%-10px)] px-10'>Team</h5>
        </div>
        <div className='flex flex-col gap-4'>
          <b>Unlock Seamless Collaboration with Our Team Feature</b>
          <div>
            Empower your team to achieve more together with our robust Team feature. Collaborate effortlessly, streamline communication, and boost productivity like never before.
          </div>
          <b>
            Key Benefits:
          </b>
          <ol className='flex flex-col gap-2 list-decimal ml-4' type='1'>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Centralized Collaboration:</b> 
                Bring your team together in one place. Share files, exchange ideas, and work on projects collaboratively in real-time.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Flexible User Management:</b> 
                Easily add or remove team members as your organization grows. Assign roles and permissions to control access and ensure security.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Enhanced Productivity:</b> 
                Say goodbye to endless email chains and scattered documents. With our Team feature, your team can stay organized, focused, and productive from anywhere.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Seamless Integration:</b> 
                Integrate with your favorite tools and workflows. Connect project management, communication, and productivity apps to streamline your workflow.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Secure and Reliable:</b> 
                Rest assured knowing your data is safe and protected. Our advanced security features ensure that your team's sensitive information remains confidential.
              </div>
            </li>
          </ol>
          <b>How It Works:</b>
          <ol className='flex flex-col gap-2 list-decimal ml-4' type='1'>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Invite Your Team:</b> 
                Easily invite team members to join your account. Simply send an invitation link or email, and they'll be ready to collaborate in no time.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Collaborate Effortlessly:</b> 
                Assign tasks, and communicate with your team members in real-time. Our intuitive interface makes collaboration simple and effective.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Manage Your Team:</b> 
                Control access and permissions with ease. Assign roles and stay in control of your team's access to features and data.
              </div>
            </li>
          </ol>
        </div>
        {callback && callback(props)}
      </div>
    )
  }
  