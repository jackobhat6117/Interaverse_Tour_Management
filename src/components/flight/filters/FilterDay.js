import { useState } from "react";
import Collapse from "../../mini/Collapse";
import { Tab, Tabs } from "@mui/material";

export default function FilterDay({returnData}) {
  const [selectedValue,setSelectedValue] = useState('Departure');
  const [day,setDay] = useState();


  function handleReturn(val) {
    try {
      setDay(val);

      returnData({day: val,selectedValue})
    } catch(ex) {}
  }
  function handleTab(val) {
    try {
      setSelectedValue(val);

      returnData({day,selectedValue: val})
    } catch(ex) {}
  }
  return (
    <Collapse show label={<h5>Day</h5>}>
    <div>
      <Tabs indicatorColor='secondary' textColor='secondary'
      value={selectedValue}
      onChange={(ev,val) => handleTab(val)}
      variant='scrollable'
      scrollButtons={false}
      className='shadow-md'>
        <Tab value='Departure' label="Departure" />
        <Tab value='Return' label="Return" />
      </Tabs>

      <div className='flex gap-3 py-4'>
        <div className={`circle !w-7 !h-7 overflow-hidden cursor-pointer ${day==='Monday'?' bg-theme1 ':' bg-gray-300 '}`} onClick={() => handleReturn('Monday')}>M</div>
        <div className={`circle !w-7 !h-7 overflow-hidden cursor-pointer ${day==='Tuesday'?' bg-theme1 ':' bg-gray-300 '}`} onClick={() => handleReturn('Tuesday')}>T</div>
        <div className={`circle !w-7 !h-7 overflow-hidden cursor-pointer ${day==='Wednesday'?' bg-theme1 ':' bg-gray-300 '}`} onClick={() => handleReturn('Wednesday')}>W</div>
        <div className={`circle !w-7 !h-7 overflow-hidden cursor-pointer ${day==='Thursday'?' bg-theme1 ':' bg-gray-300 '}`} onClick={() => handleReturn('Thursday')}>T</div>
        <div className={`circle !w-7 !h-7 overflow-hidden cursor-pointer ${day==='Friday'?' bg-theme1 ':' bg-gray-300 '}`} onClick={() => handleReturn('Friday')}>F</div>
        <div className={`circle !w-7 !h-7 overflow-hidden cursor-pointer ${day==='Saturday'?' bg-theme1 ':' bg-gray-300 '}`} onClick={() => handleReturn('Saturday')}>S</div>
        <div className={`circle !w-7 !h-7 overflow-hidden cursor-pointer ${day==='Sunday'?' bg-theme1 ':' bg-gray-300 '}`} onClick={() => handleReturn('Sunday')}>S</div>
      </div>
    </div>
  </Collapse>
      // <Collapse show label={<h5>Time</h5>}>
    //   <Tabs value={selectedValue} indicatorColor='secondary' textColor='secondary'
    //    variant='scrollable'
    //    onChange={(ev,val) => handleTab(val)}
    //    scrollButtons={false}
    //    className='shadow-md'>
    //     <Tab label="Departure" value='Departure' />
    //     <Tab label="Return" value='Return' />
    //   </Tabs>
    //   <div>
    //     <h6>Departure</h6>
    //     <p>All Day</p>
    //     <Slider defaultValue={[0,1440]}
    //      value={departureTime}
    //     //  aria-labelledby="range-slider"
    //     //  marks={marks}
    //      onChange={(ev,value) => handleDeparture(value)}
    //      min={0}
    //      step={15}
    //      max={1440}
    //      getAriaValueText={formatTime}
    //      color='secondary' size='small' />
    //     <div className='flex justify-between gap-4'>
    //       <span>{formatTime(departureTime[0])}</span>
    //       <span>{formatTime(departureTime[1])}</span>
    //     </div>
    //   </div>
    //   <div>
    //     <h6>Arrival</h6>
    //     <p>All Day</p>
    //     <Slider defaultValue={[0,1440]}
    //      value={arrivalTime}
    //     //  aria-labelledby="range-slider"
    //     //  marks={marks}
    //      onChange={(ev,value) => handleReturn(value)}
    //      min={0}
    //      step={15}
    //      max={1440}
    //      getAriaValueText={formatTime}
    //      color='secondary' size='small' />
    //     <div className='flex justify-between gap-4'>
    //       <span>{formatTime(arrivalTime[0])}</span>
    //       <span>{formatTime(arrivalTime[1])}</span>
    //     </div>
    //   </div>
    // </Collapse>
  )
}
