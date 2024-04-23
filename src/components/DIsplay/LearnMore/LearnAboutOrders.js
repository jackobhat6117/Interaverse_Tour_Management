import React from 'react';
import FlightsImage from '../../../assets/images/FlightOrder.png';


export default function LearnAboutOrders({callback,...props}) {
    return (
      <div className='flex flex-col gap-5'>
        <div className='relative h-[160px] '>
          <img alt='' src={FlightsImage} className='w-full h-full object-cover' />
          <h5 className='text-secondary absolute top-[calc(50%-10px)] px-10'>Orders</h5>
        </div>
        <div className='flex flex-col gap-4'>
          <b>Simplify Travel Booking with Our Order Feature</b>
          <div>
            Experience hassle-free booking and streamlined order management with our cutting-edge Order feature. Whether you're a travel agency, tour operator, or individual traveler, our intuitive platform makes booking your next adventure a breeze.
          </div>
          <b>
            Key Benefits:
          </b>
          <ol className='flex flex-col gap-2 list-decimal ml-4' type='1'>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Effortless Booking Process:</b> 
                Say goodbye to complicated booking forms and lengthy checkout processes. With our Order feature, you can book flights, accommodations, tours, and more in just a few clicks.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Customizable Booking Options:</b> 
                Tailor your travel experience to match your preferences and budget. Choose from a wide range of destinations, accommodations, and activities to create your dream itinerary.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Real-time Availability:</b> 
                Instantly access up-to-date availability and pricing information for flights, hotels, and activities. Say goodbye to overbookings and last-minute cancellations with our reliable booking system.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Secure Payment Processing:</b> 
                Rest assured knowing that your payments are safe and secure. Our encrypted payment gateway ensures that your financial information is protected throughout the booking process.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>24/7 Customer Support:</b> 
                Need assistance with your booking? Our dedicated customer support team is here to help. Whether you have questions about your itinerary or need to make changes to your booking, we're just a click away.
              </div>
            </li>
          </ol>
          <b>How It Works:</b>
          <ol className='flex flex-col gap-2 list-decimal ml-4' type='1'>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Search and Select:</b> 
                Browse our extensive collection of flights, hotels, and activities to find the perfect options for your trip. Filter results by price, location, and amenities to narrow down your choices.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Book with Ease:</b>
                Once you've found your ideal itinerary, simply click "Book Now" to proceed to the checkout. Review your booking details, select any additional options or upgrades, and complete your reservation securely.
              </div>
            </li>
            <li>
              <div>
                <b className='font-bold text-primary pr-2'>Manage Your Orders:</b>
                Access your booking details anytime, anywhere. View your itinerary, make changes to your booking, or contact our support team for assistance with just a few clicks.
              </div>
            </li>
          </ol>
        </div>
        {callback && callback(props)}
      </div>
    )
  }
  