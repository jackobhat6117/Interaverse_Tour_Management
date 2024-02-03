import { useEffect, useState } from "react";
import Collapse from "../../mini/Collapse";
import { Slider} from "@mui/material";


export default function FilterTime({returnData,clear}) {
  const [departureTime,setDepartureTime] = useState([0,1440]);
  const [arrivalTime,setArrivalTime] = useState([0,1440]);
  // const [selectedValue,setSelectedValue] = useState('Departure');

  useEffect(() => {
    // setSelectedValue('Departure')
    setDepartureTime([0,1440])
    setArrivalTime([0,1440])
  },[clear])
  
  const formatTime = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    // console.log(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };


  function handleDeparture(val) {
    try {
      let from = formatTime(val[0]);
      let to = formatTime(val[1]);
      setDepartureTime(val);
      let arrivalFrom = formatTime(arrivalTime[0])
      let arrivalTo = formatTime(arrivalTime[1])

      returnData({departureTime: [from,to],arrivalTime: [arrivalFrom,arrivalTo]})
      // returnData({departureTime: [from,to],arrivalTime: [arrivalFrom,arrivalTo],selectedValue})
    } catch(ex) {}
  }
  function handleReturn(val) {
    try {
      let from = formatTime(val[0]);
      let to = formatTime(val[1]);
      setArrivalTime(val);
      let depFrom = formatTime(departureTime[0])
      let depTo = formatTime(departureTime[1])
      returnData({arrivalTime: [from,to],departureTime: [depFrom,depTo]})
      // returnData({arrivalTime: [from,to],departureTime: [depFrom,depTo],selectedValue})
    } catch(ex) {}
  }
  // function handleTab(val) {
  //   try {
  //     setSelectedValue(val);
  //     let depFrom = formatTime(departureTime[0])
  //     let depTo = formatTime(departureTime[1])
  //     let arrivalFrom = formatTime(arrivalTime[0])
  //     let arrivalTo = formatTime(arrivalTime[1])

  //     returnData({arrivalTime: [arrivalFrom,arrivalTo],departureTime: [depFrom,depTo],selectedValue: val})
  //   } catch(ex) {}
  // }
  return (
    <Collapse show label={<h5>Time</h5>}>
      {/* <Tabs value={selectedValue} indicatorColor='primary' textColor='primary'
       variant='scrollable'
       onChange={(ev,val) => handleTab(val)}
       scrollButtons={false}
       className='shadow-md'>
        <Tab label="Departure" value='Departure' />
        <Tab label="Return" value='Return' />
      </Tabs> */}
      <div>
        <h6>Departure</h6>
        <p>All Day</p>
        <Slider defaultValue={[0,1440]}
         value={departureTime}
        //  aria-labelledby="range-slider"
        //  marks={marks}
         onChange={(ev,value) => handleDeparture(value)}
         min={0}
         step={15}
         max={1440}
         getAriaValueText={formatTime}
         color='primary' size='small' />
        <div className='flex justify-between gap-4'>
          <span>{formatTime(departureTime[0])}</span>
          <span>{formatTime(departureTime[1])}</span>
        </div>
      </div>
      <div>
        <h6>Arrival</h6>
        <p>All Day</p>
        <Slider defaultValue={[0,1440]}
         value={arrivalTime}
        //  aria-labelledby="range-slider"
        //  marks={marks}
         onChange={(ev,value) => handleReturn(value)}
         min={0}
         step={15}
         max={1440}
         getAriaValueText={formatTime}
         color='primary' size='small' />
        <div className='flex justify-between gap-4'>
          <span>{formatTime(arrivalTime[0])}</span>
          <span>{formatTime(arrivalTime[1])}</span>
        </div>
      </div>
    </Collapse>
  )
}
