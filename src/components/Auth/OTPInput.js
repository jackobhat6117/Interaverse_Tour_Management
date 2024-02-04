import React, { useEffect, useRef, useState } from 'react'
import { clone } from '../../features/utils/objClone';

export default function OTPInput(props) {
  const {n=6,onChange,callback,...restProps} = props;
  const [value,setValue] = useState([...Array(n)]);
  const inputRefs = useRef([...Array(n)])

  useEffect(() => {
    if(value?.every(val => val && val !==''))
      onChange(value.join(''))
  },[value,onChange])

  function handleValue(ev,i=0) {
    const val = ev.target.value;
    const temp = clone(value);
    temp[i] = val;
    
    if(val!=='' && i+1 < inputRefs?.current.length)
      inputRefs.current[i+1].focus();

    setValue(temp);
  }
  function handleBackspace(ev,i=0) {
    const temp = clone(value);
    
    if(ev.key === 'Backspace') {
      temp[i] = "";
  
      if(i-1 >= 0)
        inputRefs.current[i-1].focus();

      setValue(temp);
    } 

    if(value?.every(val => val && val !==''))
      callback && callback(value.join(''))
  }
  return (
    <div className='flex gap-2 w-full max-w-[400px]'>
      {value.map((val,i) => (
        <div className='flex-1'>
          <input type='text' 
            {...restProps}
            key={i} value={val||''} maxLength={1} tabIndex={i+1} 
            ref={(el) => inputRefs.current[i] = el} 
            onKeyUp={(ev) => handleBackspace(ev,i)}
            onChange={(ev) => handleValue(ev,i)}
            className='border border-primary/20 rounded-lg w-full h-[50px] p-1 sm:p-3 text-[20px] text-center'
          />
        </div>
      ))}
    </div>
  )
}
