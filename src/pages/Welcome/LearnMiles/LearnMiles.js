import React from 'react'
import MilesForFlights from './MilesForFlights'
import MilesForStays from './MilesForStays'
import MilesForTours from './MilesForTours'
import MilesForLinks from './MilesForLinks'
import BlogDisplay from '../../../components/DIsplay/BlogDisplay'


export default function LearnMiles() {
  return (
    <div>

      <div className=''>
        {/* <div className='pd-md'>
          <BreadCrumb>
            <Link to={'/'}>Welcome</Link>
            <Link to='/welcome/support'>Support</Link>
            <Link to='/welcome/pricing'>Pricing</Link>
            <b>Learn More</b>
          </BreadCrumb>
        </div> */}


        <div className='flex flex-col items-center'>
          <div className='flex flex-col gap-5 py-10 my-10 items-center text-center pd-md'>
            <h1 className='font-black slide-down'>Everything you need to know</h1>
            <p className='max-w-[600px] text-lg'>Create your ideal travel itinerary by selecting and paying for the specific services and features that suit your preferences.</p>
          </div>

          {columns.map((component,i) => (
            React.cloneElement(component,{className: `min-h-screen flex w-full pd-md items-center ${i%2 ? '':'bg-primary/10 flex-row-reverse '}`})
          ))}

          <div className='flex flex-col justify-center items-center text-center gap-5 py-10 min-h-screen pd-md'>
            <h3>Our Blogs</h3>
            <p>See our latest blog posts capturing our endeavours</p>
            <div className='py-10 flex gap-10 justify-center flex-wrap'>
              {blogs.map((obj,i) => (
                <BlogDisplay obj={obj} key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const blogs = [
  {title: 'Travel Wellness: How to Stay Healthy and Energized on the Road',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Ut enim ad minim veniam...',
    user: {name: 'Rachel singh'},
    date: '29th August, 2023',
    readTime: 12,
  },
  {title: 'Travel Wellness: How to Stay Healthy and Energized on the Road',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Ut enim ad minim veniam...',
    user: {name: 'Rachel singh'},
    date: '29th August, 2023',
    readTime: 12,
  },
  {title: 'Travel Wellness: How to Stay Healthy and Energized on the Road',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Ut enim ad minim veniam...',
    user: {name: 'Rachel singh'},
    date: '29th August, 2023',
    readTime: 12,
  },
  {title: 'Travel Wellness: How to Stay Healthy and Energized on the Road',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Ut enim ad minim veniam...',
    user: {name: 'Rachel singh'},
    date: '29th August, 2023',
    readTime: 12,
  },
  {title: 'Travel Wellness: How to Stay Healthy and Energized on the Road',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Ut enim ad minim veniam...',
    user: {name: 'Rachel singh'},
    date: '29th August, 2023',
    readTime: 12,
  },
  {title: 'Travel Wellness: How to Stay Healthy and Energized on the Road',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Ut enim ad minim veniam...',
    user: {name: 'Rachel singh'},
    date: '29th August, 2023',
    readTime: 12,
  },
]

const columns = [
  <MilesForFlights />,
  <MilesForStays />,
  <MilesForTours />,
  <MilesForLinks />,
]