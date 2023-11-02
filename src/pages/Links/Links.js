import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'


const OptionsPanel = createContext();
export default function Links() {
  const [options,setOptions] = useState([]);
  
  function addOption(obj) {
    setOptions(options => [...options,obj])
  }
  return (
    <OptionsPanel.Provider value={{options,subscribe:addOption}}>
      <div className='pd-md flex gap-2'>
        <div className='flex-1'>
          <Controller options={options}/>
        </div>
        <div className='flex-1'>
          <Template subscribe={addOption} />
        </div>
      </div>
    </OptionsPanel.Provider>
  )
}

function Controller({options}) {
  return (
    <div className=' flex flex-col gap-2'>
      {options.map((obj,i) => (
        <div key={i} className=''>
          {obj.label}
          {obj.options?.map((option,i) => (
            <div className='bg-secondary border rounded-md p-2 my-1' onClick={() => {option?.callback()}}>{option.label}</div>
          ))}
        </div>
      ))}
    </div>
  )
}

const Header = ({type}) => {
  const [initFlag,setInitFlag] = useState(true);

  let initClass = 'w-full p-2 px-6 flex gap-4 justify-between';
  const [className,setClassName] = useState(initClass)
  const options = useContext(OptionsPanel);


  useEffect(() => {
    if(initFlag) {
      initialize();
    }
    setInitFlag(false);
    //eslint-disable-next-line
  },[initFlag])

  const initialize = useCallback(() => {
    options?.subscribe({
      label: 'Header Type',
      options: [
        {label: 'Header One (Default)',callback: changeColor},
        {label: 'Header Two',callback:() => setClassName('w-full p-2 px-6 flex gap-4 ')},
      ]
    })
    //eslint-disable-next-line
  },[options])

  function changeColor() {
    setClassName(initClass)
  }

  return (
    <div className={className}>
      <div>Logo</div>
      <div>
        <span>Home</span>
        <span>About</span>
        <span>Contact</span>
      </div>
    </div>
  )
}

function Template({subscribe}) {
  const [initFlag,setInitFlag] = useState(true);

  useEffect(() => {
    if(initFlag)
      setInitFlag(false);
  },[initFlag])

  return (
    <div className='border '>
      <Header initFlag={initFlag} />
    </div>
  )
}