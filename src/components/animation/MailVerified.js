import React, { useEffect, useRef } from 'react'
import mailVerified from '../../assets/json/successful-email-envelope.json'
import Lottie from 'lottie-web';

export default function MailVerified({config={},className}) {
  const animationContainer = useRef(null);

  useEffect(() => {
    const animation = Lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: mailVerified,
      ...config
    })

    return () => animation.destroy()
  },[config])

  return (
    <div ref={animationContainer} className={'h-[200px] '+className}></div>
  )
}
