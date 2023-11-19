import { useNavigate } from "react-router-dom";
import Icon from "../../HOC/Icon";
import ScreenViewObserver from "../../animation/ScreenViewObserver";
import { useState } from "react";

export default function StepsCheck({i,obj,complete,link}) {
  const navigate = useNavigate();
  const [animStyle,setAnimStyle] = useState('invisible');

  function handleNavigate() {    
    link && navigate(link)
  }
  return (
    <ScreenViewObserver className={`flex flex-wrap gap-4 p-4 rounded-md border items-center cursor-pointer duration-${(i+1)*2*100} ${animStyle}`} onClick={handleNavigate}
      onScreenViewCallBack={() => setAnimStyle('slide')}
      offScreenViewCallBack={() => setAnimStyle('invisible')}
    >
      <div className='bg-primary/[5%] rounded-md p-4 hidden sm:flex items-center justify-center'>{i+1}</div>
      <div className='flex flex-col gap-2 flex-1 text-left min-w-[200px]'>
        {obj.title}
        <p>{obj.description}</p>
      </div>
      <div className='w-10 h-10 flex justify-center items-center rounded-full bg-primary/10'>
        <Icon icon='game-icons:check-mark' className={`${complete?'text-theme1':'text-primary/20'}`} />
      </div>
    </ScreenViewObserver>
  )
}