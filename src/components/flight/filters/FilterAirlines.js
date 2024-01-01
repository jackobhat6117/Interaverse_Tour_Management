import { useEffect, useState } from "react";
import Collapse from "../../mini/Collapse";
import AirlinesInput from "../../form/AirlinesInput";

export default function FilterAirlines({returnData,orgi}) {
  const [airlines,setAirlines] = useState([
    // {
    //   "name": "Ethiopian Airlines",
    //   "id": "ET",
    //   "value": false
    // },
    // {
    //   "name": "Brussels Airlines",
    //   "id": "SN",
    //   "value": false
    // }
  ])

  useEffect(() => {
    if(orgi) {
      let airlineObjs = orgi.map(obj => obj.segments)?.flat()?.map(obj => obj.flights)?.flat()
      airlineObjs = [...new Set(airlineObjs.map(obj => JSON.stringify({name: obj.carrierName,id: obj.marketingCarrier,value: false})))]
      setAirlines(airlineObjs.map(obj => JSON.parse(obj)))
    }
  },[orgi])


  function handleChange(val) {
    if(val === null) return setAirlines(val);;
    
    let filtered = [...airlines];
    if(!airlines.find(d => d.name === val.name))
      filtered = ([...airlines,{name: val.name,id: val.id,value: true}])

    setAirlines(filtered);
    // console.log(val);
    returnData(filtered);
  }
  function handleCheck(val,i) {
    let temp = [...airlines];
    temp[i].value = val;
    setAirlines(temp);

    returnData(airlines)
  }
  return (
    <Collapse show label={<h5>Airlines</h5>}>
    <AirlinesInput option={airlines} label={"Search here"} returnData={handleChange} />
    {airlines.map((obj,i) => (
      <label key={i} className='flex gap-4 justify-between'>
        <span className='flex gap-2'>
          <input name='xcountries' checked={obj.value} onChange={(ev) => handleCheck(ev.target.checked,i)} type='checkbox' />
          <span>{obj.name}</span>
        </span>
      </label>
    ))}
  </Collapse>
)
}
