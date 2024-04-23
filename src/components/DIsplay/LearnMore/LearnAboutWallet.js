import React from 'react';
import WalletImage from '../../../assets/images/Wallet.png';


export default function LearnAboutWallet({callback,...props}) {
    return (
      <div className='flex flex-col gap-5'>
        <div className='relative h-[160px] '>
          <img alt='' src={WalletImage} className='w-full h-full object-cover' />
          <h5 className='absolute top-[calc(50%-10px)] px-10'>Wallet</h5>
        </div>
        <div className='flex flex-col gap-4'>
          <b>Introducing Our Wallet Feature: Your Key to Seamless Travel Payments</b>
          <div>
          Unlock convenience and flexibility with our innovative Wallet feature. Whether you're a frequent traveler, travel agency, or corporate traveler, our digital wallet streamlines the payment process, making travel booking easier than ever.
          </div>
          <b>
            Key Benefits:
          </b>
          <ol className='flex flex-col gap-2 list-decimal ml-4' type='1'>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Centralized Payment Hub:</b> 
                Say goodbye to juggling multiple payment methods and currencies. Our Wallet feature allows you to store funds securely in one centralized location, simplifying the payment process for all your travel bookings.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Budget Management:</b> 
                Take control of your travel expenses with our budgeting tools. Set spending limits, track your transactions in real-time, and stay on top of your travel budget with ease.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Exclusive Rewards and Offers:</b> 
                Enjoy special perks and discounts when you use your Wallet for bookings. From cashback rewards to exclusive member-only deals, maximize your savings and get more out of your travel experience.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Secure Transactions:</b> 
                Rest assured knowing that your funds are safe and secure. Our Wallet feature utilizes advanced encryption technology to protect your financial information and prevent unauthorized access.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Load Funds:</b> 
                Add funds to your Wallet using your preferred payment method - whether it's a credit card, debit card, or bank transfer. Your funds will be instantly available for use on future bookings.
              </div>
            </li>
          </ol>
          <b>How It Works:</b>
          <ol className='flex flex-col gap-2 list-decimal ml-4' type='1'>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Book with Ease:</b> 
                When you're ready to book your next trip, simply select "Pay with Wallet" at checkout. Your payment will be processed instantly, allowing you to confirm your booking in seconds.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Track Transactions:</b> 
                Monitor your spending and track your transactions effortlessly within the Wallet interface. View your transaction history, check your balance, and stay informed about your travel expenses at a glance.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Top-Up Anytime:</b> 
                Running low on funds? No problem. Top up your Wallet anytime, anywhere to ensure you always have enough funds for your upcoming travel bookings.
              </div>
            </li>
          </ol>
        </div>
        {callback && callback(props)}
      </div>
    )
  }
  