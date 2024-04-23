import React, { useEffect, useRef } from 'react'
// import loadingBar from '../../assets/json/loading-bar.json';
import Plane from '../../assets/json/Plane.json';
import Lottie from 'lottie-web';

export default function LoadingBar({config={},className,duration,message}) {
  const animationContainer = useRef(null);
  const animationInstance = useRef(null);
  // const initTime = (new Date()).getMilliseconds();

  useEffect(() => {
    animationInstance.current = Lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: Plane,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
      ...config
    })

    if(duration) {
      // const animationDuration = animationInstance.current.getDuration();
      // animationInstance.current.setSpeed(animationDuration / duration);

      // const desiredDuration = 10; // Desired duration in seconds
      // const animationDuration = animationInstance.current.getDuration(); // Convert animation duration to seconds
      // const speed = animationDuration !== 0 ? desiredDuration / animationDuration : 1;

      // animationInstance.current.setSpeed(speed);
    }

    return () => {
      if (animationInstance.current) {
        animationInstance.current.destroy();
      }
    };
  },[config,duration])

  return (
    <div className='flex flex-col text-center gap-2 items-center justify-center'>
      <div ref={animationContainer} className={'h-[125px] max-w-full w-[200px] flex items-center justify-center '+className}></div>
      {message ? 
        <div className='flex flex-wrap gap-2 items-center'>
          {message}
        </div>
      :null}
    </div>
  )
}
