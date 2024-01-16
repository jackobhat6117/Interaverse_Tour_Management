import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScreenViewObserver from "../animation/ScreenViewObserver";

export default function Card({obj,className,elem}) {
  const [animStyle,setAnimStyle] = useState('invisible');
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(obj.link);  
  }
  // const Wrapper = elem || 'div'
  return (
    <ScreenViewObserver className={`flex flex-1 flex-col gap-4 justify-end items-start 
      cursor-pointer text-start min-w-[200px] min-h-[250px] border 
      bg-secondary rounded-md p-6 hover:backdrop-shadow-md shadow-primary ${className} ${animStyle}`}
      onScreenViewCallBack={() => setAnimStyle('zoom-in')}
      offScreenViewCallBack={() => setAnimStyle('invisible')}
      onClick={handleNavigate}
    >
      <div className='flex flex-col gap-2'>
        <div>{obj.icon}</div>
        <div>{obj.title}</div>
      </div>
      <p className="flex-1">{obj.description}</p>
      <div className="w-full">{obj.footer}</div>
    </ScreenViewObserver>
  )
}