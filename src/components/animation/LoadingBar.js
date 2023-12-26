import React, { useEffect, useRef } from 'react'
import loadingBar from '../../assets/json/loading-bar.json';
import Lottie from 'lottie-web';

export default function LoadingBar({config={},className,progress}) {
  const animationContainer = useRef(null);

  useEffect(() => {
    const animation = Lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: loadingBar,
      // rendererSettings: {
      //   preserveAspectRatio: 'xMidYMid slice',
      // },
      duration: 100000,
      ...config
    })

    return () => animation.destroy()
  },[config])

  return (
    <div ref={animationContainer} className={'h-[200px] '+className}></div>
  )
}
