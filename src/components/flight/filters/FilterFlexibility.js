import { useEffect, useState } from "react";
import Collapse from "../../mini/Collapse";
import { clone } from "../../../features/utils/objClone";
import { formatMoney } from "../../../features/utils/formatMoney";

export default function FilterFlexibility({returnData,orgi,cats}) {
  const [flexibility,setFlexibility] = useState([
    {
      "name": "Any",
      "value": 0
    },
    {
      "name": "Refundable",
      "value": 0
    },
    {
      "name": "Non-Refundable",
      "value": 0
    },
  ])

  // useEffect(() => {
  //   if(returnData)
  //     returnData(luggage);
  // },[luggage,returnData])
  // console.log(orgi)
  useEffect(() => {
    let temp = clone(flexibility);
    
    temp.map(data => {
      cats.cheapest && cats.cheapest.find(i => {
        try {    
          let segments = orgi[i] && orgi[i].segments
          let refundable = segments?.every(segment => segment.flights?.every(flight => flight?.amenities?.find(amen => amen.description === 'REFUNDS')))
          if(data.name === 'Refundable' && refundable) {
            data.value = orgi[i].farePrice.fareTotal
            return true;
          } else if(data.name === 'Non-Refundable' && !refundable) {
            data.value = orgi[i].farePrice.fareTotal
            return true;
          }
        } catch(ex) {}
        return false
      })
      return data
    })
    // console.log('new stops: ',temp)
    setFlexibility(temp)
    //eslint-disable-next-line
  },[orgi])


  function handleChange(val) {
    returnData(flexibility.find(d => d.name === val));
  }
  return (
    <Collapse show label={<h5>Flexibility</h5>}>
      {flexibility.map((data,i) => (
        <label key={i} className='flex gap-4 justify-between'>
          <span className='flex gap-2'>
            <input name='flexibility' type='radio' value={data.name} onChange={(ev) => handleChange(ev.target.value)} />
            <span>{data.name}</span>
          </span>
          {data.value ? formatMoney(data.value) : '-'}
        </label>
      ))}
    </Collapse>
  )
}
