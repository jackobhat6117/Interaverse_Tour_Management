import { useEffect, useState } from "react";
import Collapse from "../../mini/Collapse";
import { formatMoney } from "../../../features/utils/formatMoney";
import { clone } from "../../../features/utils/objClone";


const init = [
  {name:'All',otherName: 'Economy',label: 'Any',value: 0},
  {name:'ECONOMY',otherName: 'Economy',label: 'Economy class',value: 0},
  {name:'PREMIUM',otherName: 'PremiumEconomy',ternaryName: 'PREMIUM_ECONOMY',label: 'Premium economy',value: 0},
  {name:'BUSINESS',otherName: 'Business',label: 'Bussiness class',value: 0},
  {name:'FIRST_SUPERSONIC',otherName: 'FirstClass',label: 'First Class',value: 0},
]
export default function FilterCabin({returnData,cats,orgi,clear}) {
  const [cabin,setCabin] = useState(init)
  const [selectedValue,setSelectedValue] = useState('');

  useEffect(() => {
    setSelectedValue('')
  },[clear])
  // console.log(orgi,cabin)

  useEffect(() => {
    let temp = clone(cabin);
    
    temp.map(data => {
      cats.cheapest && cats.cheapest.find(i => {
        try {
          if(data.name === 'All' || orgi[i]?.segments[0].flights?.every(obj => ([data.name,data.otherName,data.ternaryName].includes(obj.cabin)))) {
            data.value = orgi[i].totalAmount
            return true;
          }
          // let segments = orgi[i] && orgi[i].segments && orgi[i].segments[0]
          // if(segments && (data.name === "All" || (segments.cabin.toUpperCase() === data.name))) {
          //   data.value = orgi[i].farePrice.fareTotal
          //   return true;
          // }
        } catch(ex) {}
        return false
      })
      return data
    })
    setCabin(temp)
    //eslint-disable-next-line
  },[orgi,cats])


  function handleChange(val) {
    setSelectedValue(val)
    returnData(cabin.find(d => d.name === val));
  }
  return (
    <Collapse show label={<h5>Cabin</h5>}>
      <form onSubmit={(ev) => ev?.preventDefault()} className="flex flex-col gap-3">
        {cabin.map((data,i) => (
          <label key={i} className='flex gap-4 justify-between cursor-pointer'>
            <span className='flex gap-2'>
              <input name='cabin' type='radio' value={data.name} checked={selectedValue === data.name} onChange={(ev) => handleChange(ev.target.value)} />
              <span>{data.label}</span>
            </span>
            {data.value ? formatMoney(data.value) : '-'}
          </label>
        ))}
      </form>
    </Collapse>
  )
}
