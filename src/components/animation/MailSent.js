import React, { useEffect, useRef } from 'react'
import mailSent from '../../assets/json/mail-send.json'
import Lottie from 'lottie-web';

export default function MailSent({config={},className}) {
  const animationContainer = useRef(null);

  useEffect(() => {
    const animation = Lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: mailSent,
      ...config
    })

    return () => animation.destroy()
  },[config])

  return (
    <div ref={animationContainer} className={'h-[200px] '+className}></div>
  )
}
