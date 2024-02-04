import { useEffect, useState } from "react";
import Collapse from "../../mini/Collapse";


export default function FilterDay({returnData,clear}) {
  // const [selectedValue,setSelectedValue] = useState('Departure');
  const [day,setDay] = useState();

  useEffect(() => {
    setDay();
    // setSelectedValue('Departure')
  },[clear])

  function handleReturn(val) {
    let value = val;
    try {
      if(day === val)
        value = null;

      setDay(value);

      returnData({day: value})
      // returnData({day: value,selectedValue})
    } catch(ex) {}
  }
  // function handleTab(val) {
  //   try {
  //     setSelectedValue(val);

  //     returnData({day,selectedValue: val})
  //   } catch(ex) {}
  // }
  return (
    <Collapse show label={<h5>Day</h5>}>
    <div>
      {/* <Tabs indicatorColor='primary' textColor='primary'
      value={selectedValue}
      onChange={(ev,val) => handleTab(val)}
      variant='scrollable'
      scrollButtons={false}
      className='shadow-md'>
        <Tab value='Departure' label="Departure" />
        <Tab value='Return' label="Return" />
      </Tabs> */}

      <div className='flex gap-3 py-4'>
        <div className={`rounded-full flex items-center justify-center !w-7 !h-7 overflow-hidden cursor-pointer ${day==='Monday'?' bg-theme1 ':' bg-gray-300 '}`} onClick={() => handleReturn('Monday')}>M</div>
        <div className={`rounded-full flex items-center justify-center !w-7 !h-7 overflow-hidden cursor-pointer ${day==='Tuesday'?' bg-theme1 ':' bg-gray-300 '}`} onClick={() => handleReturn('Tuesday')}>T</div>
        <div className={`rounded-full flex items-center justify-center !w-7 !h-7 overflow-hidden cursor-pointer ${day==='Wednesday'?' bg-theme1 ':' bg-gray-300 '}`} onClick={() => handleReturn('Wednesday')}>W</div>
        <div className={`rounded-full flex items-center justify-center !w-7 !h-7 overflow-hidden cursor-pointer ${day==='Thursday'?' bg-theme1 ':' bg-gray-300 '}`} onClick={() => handleReturn('Thursday')}>T</div>
        <div className={`rounded-full flex items-center justify-center !w-7 !h-7 overflow-hidden cursor-pointer ${day==='Friday'?' bg-theme1 ':' bg-gray-300 '}`} onClick={() => handleReturn('Friday')}>F</div>
        <div className={`rounded-full flex items-center justify-center !w-7 !h-7 overflow-hidden cursor-pointer ${day==='Saturday'?' bg-theme1 ':' bg-gray-300 '}`} onClick={() => handleReturn('Saturday')}>S</div>
        <div className={`rounded-full flex items-center justify-center !w-7 !h-7 overflow-hidden cursor-pointer ${day==='Sunday'?' bg-theme1 ':' bg-gray-300 '}`} onClick={() => handleReturn('Sunday')}>S</div>
      </div>
    </div>
  </Collapse>
  )
}
