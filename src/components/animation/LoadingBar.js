import React, { useEffect, useRef } from 'react'
import loadingBar from '../../assets/json/loading-bar.json';
import Lottie from 'lottie-web';

export default function LoadingBar({config={},className,duration}) {
  const animationContainer = useRef(null);
  const animationInstance = useRef(null);
  // const initTime = (new Date()).getMilliseconds();

  useEffect(() => {
    animationInstance.current = Lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: loadingBar,
      // rendererSettings: {
      //   preserveAspectRatio: 'xMidYMid slice',
      // },
      ...config
    })

    if(duration) {
      const animationDuration = animationInstance.current.getDuration();
      animationInstance.current.setSpeed(animationDuration / duration);

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
    <div ref={animationContainer} className={'h-[100px] '+className}></div>
  )
}
