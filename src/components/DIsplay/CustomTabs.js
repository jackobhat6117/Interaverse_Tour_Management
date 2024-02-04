import React, { useState } from 'react'

export default function CustomTabs({options,defaultValue}) {
  const [value,setValue] = useState(defaultValue);
  return (
    <div className='flex overflow-hidden overflow-x-auto'>
      {options.map((obj,i) => (
        <span key={i}
          className={` cursor-pointer
            ${(value && (value === obj.value)) ? 'bg-theme1 text-white ':''} 
            ${i === 0 ? 'rounded-l-lg':''} 
            ${i === options.length -1 ? 'rounded-r-lg':''} border border-primary/20 flex-1 min-w-[120px] p-1 px-3 text-center`}
          onClick={() => setValue(obj.value)}
        >{obj.label}</span>
      ))}
    </div>
  )
}
