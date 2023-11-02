import React, { useState } from 'react'
import { def } from '../../config'
import Button1 from '../form/Button1'


export default function FareOptions({handleReturn}) {
  const [options] = useState([...Array(6)])
  const [selected,setSelected] = useState();

  function handleSelect(i) {
    handleReturn && handleReturn(options[i])
  }
  return (
    <div className='flex flex-col gap-2 p-4 max-w-[1000px]'>
      <h4>Select your prefered fare options</h4>
      <div className='flex gap-4 flex-wrap'>
        {options.map((obj,i) => (
          <FareOption key={i} activate={() => setSelected(i)} selected={selected===i} select={() => handleSelect(i)} />
        ))}
      </div>
    </div>
  )
}

export function FareOption({selected,select,activate}) {
  const initStyle = {
    bg: 'bg-theme1/10',
  }
  const [style,setStyle] = useState(initStyle)
  let data = {
    title: 'ECONOMY',
    subTitle: 'Economy lightbag',
    flexibility: [
      {label: 'No data on change',value: false},
      {label: 'No data on refunds',value: false},
      {label: 'Hold on time: (12h)',value: true},
    ],
    bags: [
      {label: 'No carry-on bags',value: false},
      {label: 'Includes 1 checked bag',value: true}
    ],
    totalAmount: 239900
  }

  function handleStyle(ev) {
    ev?.stopPropagation();

    setStyle({...style,bg: 'bg-primary text-secondary'})
    // select && select()
    activate && activate();
  }
  return (
    <div className={`min-w-[300px] flex-1 flex flex-col border rounded-md border-primary/20 overflow-hidden ${selected?' border-primary/100 !border-[3px] ':''} `} onClick={handleStyle}>
      {selected?<small className='bg-primary text-white p-2 block'>Selected</small>:null}
      <div className=' p-4 flex-1 flex flex-col gap-3'>
        <div>
          <p>{data.title}</p>
          <div>{data.subTitle}</div>
        </div>
        <hr />
        <h6>Flexibility</h6>
        <div className='flex flex-col gap-1'>
          {data.flexibility.map((obj,i) => (
            <p className='flex gap-2 items-center'>
              <div className='border w-3 h-3 flex justify-center items-center p-2'>{obj.value?'':'X'}</div>
              <span>{obj.label}</span>
            </p>
          ))}
        </div>
        <h6>Bags</h6>
        <div className='flex flex-col gap-1'>
          {data.bags.map((obj,i) => (
            <p className='flex gap-2 items-center'>
              <div className='border w-3 h-3 flex justify-center items-center p-2'>{obj.value?'':'X'}</div>
              <span>{obj.label}</span>
            </p>
          ))}
        </div>
      </div>
      <div className={` p-4 flex flex-col gap-4 ${selected?'bg-primary text-secondary':'bg-theme1/10'} `}>
        <div className='flex gap-4'>
          <p className='!text-inherit'>Total amount for one traveler</p>
          <h4>{def.currency}{data.totalAmount}</h4>
        </div>
        <Button1 onClick={select}>Select Fare</Button1>
      </div>
    </div>
  )
}