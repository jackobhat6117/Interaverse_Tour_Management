import React, { useState } from 'react'
import ScreenViewObserver from '../animation/ScreenViewObserver';

export default function BlogDisplay(props) {
  const {obj} = props;
  const [animate,setAnimate] = useState(false);

  const handleInScreenView = () => setAnimate(true)
  const handleOffScreenView = () => setAnimate(false)
  return (
    <ScreenViewObserver onScreenViewCallBack={handleInScreenView} offScreenViewCallBack={handleOffScreenView}
      className={`card p-4 rounded-md border shadow flex flex-col gap-4 text-start max-w-[350px] ${animate?'swing-in-top-fwd ':''}`}
    >
      <div className='bg-primary/10 rounded-md w-full h-[200px]'>

      </div>
      
      {obj.readTime ? <span className='text-theme1'>{obj.readTime} mins read</span>:null}
      <h5>{obj.title}</h5>
      <p>{obj.description}</p>

      <div className='flex gap-4 items-center text-xs'>
        <div className='w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center'></div>
        {obj?.user?.name}
        <div className='w-2 h-2 rounded-full bg-primary/20'></div>
        {obj.date}
      </div>
    </ScreenViewObserver>
  )
}
