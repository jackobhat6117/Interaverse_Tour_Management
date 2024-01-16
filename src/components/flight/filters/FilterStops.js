import { useEffect, useState } from "react";
import Collapse from "../../mini/Collapse";
import { clone } from "../../../features/utils/objClone";
import { formatMoney } from "../../../features/utils/formatMoney";

export default function FilterStops({returnData,orgi,cats}) {
  const [stops,setStops] = useState([
    {name:'',lt:3,label: 'Any',value: 0},
    {name:'nonstop',lt: 1,gt: -1,label: 'Nonstop (direct)',value: 0},
    {name:'<=1',lt: 2,gt: 0,label: 'Up to 1 stops',value: 0},
    {name:'<=2',lt: 3,gt: 1,label: 'Up to 2 stops',value: 0},
  ])
  const [selectedValue,setSelectedValue] = useState('');
  const [allowOverNightStops,setAllowOverNightStops] = useState(false);

  // useEffect(() => {
  //   if(returnData)
  //     returnData(luggage);
  // },[luggage,returnData])
  useEffect(() => {
    let temp = clone(stops);
    
    temp.map(data => {
      cats.cheapest && cats.cheapest.find(i => {
        try {    
          let segments = orgi[i] && orgi[i].segments
          if(segments && segments.every(item => (item.numberOfStops < data.lt))) {
            
            data.value = orgi[i].farePrice.fareTotal
            return true;
          }
        } catch(ex) {}
        return false
      })
      return data
    })
    // console.log('new stops: ',temp)
    setStops(temp)
    //eslint-disable-next-line
  },[orgi])


  function handleChange(val) {
    setSelectedValue(val)
    returnData({data: stops.find(d => d.name === val),allowOv: allowOverNightStops});
  }
  function handleCheck(val) {
    setAllowOverNightStops(val);
    returnData({data: stops.find(d => d.name === selectedValue),allowOv: val});
  }
  return (
    <Collapse show label={<h5>Stops</h5>}>
      {stops.map((data,i) => (
        <label key={i} className='flex gap-4 justify-between'>
          <span className='flex gap-2'>
            <input name='stops' type='radio' value={data.name} onChange={(ev) => handleChange(ev.target.value)} />
            <span>{data.label}</span>
          </span>
          {data.value ? formatMoney(data.value) : '-'}
        </label>
      ))}
      <label className="flex gap-2 py-3 cursor-pointer">
        <input type='checkbox' checked={allowOverNightStops} onChange={(ev) => handleCheck(ev.target.checked)} />
        <p>Allow overnight stopovers</p>
      </label>
    </Collapse>
  )
}
