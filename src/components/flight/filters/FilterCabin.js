import { useEffect, useState } from "react";
import Collapse from "../../mini/Collapse";
import { def } from "../../../config";
import { formatMoney } from "../../../features/utils/formatMoney";
import { clone } from "../../../features/utils/objClone";

export default function FilterCabin({returnData,cats,orgi}) {
  const [cabin,setCabin] = useState([
    {name:'All',label: 'Any',value: 0},
    {name:'ECONOMY',label: 'Economy class',value: 0},
    {name:'PREMIUM',label: 'Premium economy',value: 0},
    {name:'BUSINESS',label: 'Bussiness class',value: 0},
    {name:'FIRST_SUPERSONIC',label: 'First Class',value: 0},
  ])
  const [selectedValue,setSelectedValue] = useState('');

  // useEffect(() => {
  //   if(returnData)
  //     returnData(luggage);
  // },[luggage,returnData])

  useEffect(() => {
    let temp = clone(cabin);
    
    temp.map(data => {
      cats.cheapest && cats.cheapest.find(i => {
        try {    
          let segments = orgi[i] && orgi[i].segments && orgi[i].segments[0]
          if(segments && (data.name === "All" || (segments.cabin.toUpperCase() === data.name))) {
            data.value = orgi[i].farePrice.fareTotal
            return true;
          }
        } catch(ex) {}
        return false
      })
      return data
    })
    setCabin(temp)
  },[orgi])


  function handleChange(val) {
    setSelectedValue(val)
    returnData(cabin.find(d => d.name === val));
  }
  return (
    <Collapse show label={<h5>Cabin</h5>}>
      {cabin.map((data,i) => (
        <label key={i} className='flex gap-4 justify-between cursor-pointer'>
          <span className='flex gap-2'>
            <input name='cabin' type='radio' value={data.name} checked={selectedValue === data.name} onChange={(ev) => handleChange(ev.target.value)} />
            <span>{data.label}</span>
          </span>
          {formatMoney(data.value)}
        </label>
      ))}
    </Collapse>
  )
}
