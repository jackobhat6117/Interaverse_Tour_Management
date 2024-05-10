import { useEffect, useState } from "react";
import Collapse from "../../mini/Collapse";
import AirlinesInput from "../../form/AirlinesInput";
import { useSearchParams } from "react-router-dom";
import Icon from "../../HOC/Icon";

export default function FilterAirlines({returnData,orgi,clear}) {
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
  const [searchParam] = useSearchParams();
  const segIndex = searchParam.get('path') || 0


  useEffect(() => {
    setAirlines(airlines => airlines.map(obj => ({...obj,value: false})))
  },[clear])

  useEffect(() => {
    if(orgi) {
      let counts = {};
      let airlineObjs = orgi.flatMap((obj, i) =>
        [obj?.segments?.at(segIndex)]?.flatMap((seg, j) => seg?.flights?.map((flight,k) => {
          let count = counts[`${flight.marketingCarrier}-${i}-${j}-${k}`]
          counts[`${flight.marketingCarrier}-${i}-${j}-${k}-${flight.carrierName?.toLowerCase()}`] = (count || 0) + 1;
          return flight;
        }
      ))).flat();
      const flightCounts = {};
      
      const notConnectors = Object.entries(counts)?.filter(([key,_]) => key.split('-')[3] === '0')?.map(arr => arr?.at(0)?.split('-')?.at(4))
      
      for (const key in counts) {
        const [airline, flightIndex] = key.split('-');
        const airlineFlightKey = `${airline}-${flightIndex}`;
        flightCounts[airlineFlightKey] = (flightCounts[airlineFlightKey] || 0) + 1;
      }
      
      const airlineCounts = {};
      
      for (const key in flightCounts) {
        const airline = key.split('-')[0];
        airlineCounts[airline] = (airlineCounts[airline] || 0) + 1;
      }

      const getMore = (carrierName) => {
        let res = {}

        if(!notConnectors?.includes(carrierName?.toLowerCase()))
          res.carrier = true;

        return res;
      }

      airlineObjs = [...new Set(airlineObjs.map(obj => JSON.stringify({name: obj?.carrierName?.toLowerCase(),id: obj?.marketingCarrier,value: false,...getMore(obj?.carrierName)})))]
      setAirlines(airlineObjs.map(obj => {
        let airlineObj = JSON.parse(obj)
        airlineObj['count'] = airlineCounts[airlineObj.id]
        return airlineObj
      }))
    }

    //eslint-disable-next-line
  },[orgi])
  
  // console.log(airlines)

  function handleChange(val) {
    if(val === null) return false;
    
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
    <div className="max-h-screen overflow-y-auto flex flex-col gap-4 pr-2">
      {airlines?.sort((a,b) => a?.name?.localeCompare(b.name))?.map((obj,i) => (
        <label key={i} className='flex gap-4 justify-between w-full cursor-pointer'>
          <span className='flex gap-2 w-full items-center'>
            <input name='xcountries' checked={obj.value} onChange={(ev) => handleCheck(ev.target.checked,i)} type='checkbox' />
            <span className="flex-1 capitalize">{obj.name} ({obj?.count})</span>
            {obj?.carrier ? 
              <span title='Connecting Airline'><Icon icon='streamline:airport-plane-transit' className='text-blue-500 !w-5 !h-5' /></span>
            :null}
          </span>
        </label>
      ))}
    </div>
  </Collapse>
)
}
