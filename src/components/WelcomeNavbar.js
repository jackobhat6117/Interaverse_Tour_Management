import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function WelcomeNavbar() {

  return (
    <div className='flex flex-col min-h-screen '>
      <Header />
      <div className='bg-secondary flex flex-col h-full flex-1'>
        <Outlet />
      </div>
    </div>
  )
}
