import { ChildCareOutlined, ChildFriendlyOutlined, Person } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import IncDec from "../../mini/IncDec";
import { def } from "../../../config";

export default function FilterTravelPassengers({returnData,q,oneLine,value}) {
  const init = [
    {
      name: 'adult',
      label: <div className='flex flex-wrap gap-2'><b> Adult</b> <small className='whitespace-nowrap'>(Over 11)</small> </div>,
      icon: <Person className='sqr4' />,
      value: parseInt(q && q.adults) || 1
    },
    {
      name: 'child',
      label: <div className='flex flex-wrap gap-2'><b> Child</b> <small className='whitespace-nowrap'>(2 - 11)</small></div>,
      icon: <ChildCareOutlined className='sqr4' />,
      value: parseInt(q && q.children) || 0
    },
    {
      name: 'infant',
      label: <div className='flex flex-wrap gap-2'><b> Infant</b> <small className='whitespace-nowrap'>(Under 2)</small></div>,
      icon: <ChildFriendlyOutlined className='sqr4' />,
      value: parseInt(q && q.infants) || 0
    },
  ]
  const [passenger,setPassenger] = useState(init)


  const handleReturnData = useCallback((passenger) => {
    if(returnData)
      returnData(passenger);
  },[returnData])

  useEffect(() => {
    if(value) {
      setPassenger(value);
    }
    //eslint-disable-next-line
  },[])

  useEffect(() => {
    if(passenger)
      handleReturnData(passenger)

    //eslint-disable-next-line
  },[passenger])

  function handleChange(val,i) {
    let temp = [...passenger];
    temp[i].value = val;
    setPassenger(temp);
  }

  return (
    <div className={`flex ${oneLine ? ' gap-6 grow items-center max-w-full overflow-x-auto ' : ' flex-col gap-3 '} `}>
      <h4 className='font-bold'>Travelers</h4>
      {passenger.map((obj,i) => (
        <div className='flex flex-col'>
          <div key={i} className={`flex gap-2 flex-nowrap items-center ${oneLine ? ' flex-1 px-4 border-r border-primary/20 ' : ''}`}>
            {obj.icon}
            <div className='flex-1 flex justify-between gap-4 '>
              <div className='flex flex-col items-start justify-center' >
                {obj.label}
                <div className=''>
                  {obj.farePrice ? def.currency:null}{obj?.farePrice ? obj?.farePrice : null}
                </div>
              </div>
              <IncDec min={0} value={obj.value} returnData={(val) => handleChange(val,i)} />
            </div>
          </div>
        </div>      
      ))
      }

    </div>
  )
}
