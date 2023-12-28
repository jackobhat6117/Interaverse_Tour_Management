import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types'


const ScreenViewObserver = (props) => {
  const componentRef = useRef(null);
  const {children,...restProps} = props;
  const [inView,setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { bottom, top } = entry.boundingClientRect;
          const { innerHeight } = window;

          if (entry.isIntersecting && (bottom >= innerHeight || (bottom <= innerHeight && top >= 0))) {
            // The component is in the viewport
            handleComponentInView();
            setInView(true)
          } 
          else if(top > 0) {
            setInView(false)
            handleComponentOffView();  
          }
        });
      },
      { threshold: props.threshold || 0.5 } // Adjust the threshold value as needed
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    const curRef = componentRef.current
    // Cleanup the observer when the component is unmounted
    return () => {
      if (curRef) {
        observer.unobserve(curRef);
      }
    };

    //eslint-disable-next-line
  }, []);

  const handleComponentInView = () => {
    // Handle the event when the component is in view
    props.onScreenViewCallBack && props.onScreenViewCallBack(inView)
  };
  const handleComponentOffView = () => {
    // Handle the event when the component is in view
    props.offScreenViewCallBack && props.offScreenViewCallBack(inView);
  };

  return React.cloneElement(<div {...restProps}>{children}</div>,{ref: componentRef})
  // return <div ref={componentRef}>{props.children}</div>;
};

ScreenViewObserver.propTypes = {
  onScreenViewCallBack: PropTypes.func,
  offScreenViewCallBack: PropTypes.func,
  threshold: PropTypes.number
}

export default ScreenViewObserver;