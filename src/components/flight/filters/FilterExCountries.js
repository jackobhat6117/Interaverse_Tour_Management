import { useState } from "react";
import Collapse from "../../mini/Collapse";
import { def } from "../../../config";
import CountriesInput from "../../form/CountriesInput";

export default function FilterExCountries({returnData}) {
  const [countries,setCountries] = useState([
    {name:'Egypt',alpha: 'EG',value: false},
    {name:'Ethiopia', alpha: 'ET',value: false},
    {name:'Ghana', alpha: 'GH',value: false},
  ])
  // useEffect(() => {
  //   if(returnData)
  //     returnData(luggage);
  // },[luggage,returnData])

  function handleChange(val) {
    if(!val.name)
      return false;
    
    if(!countries.find(d => d.name === val.name))
      setCountries([...countries,{name: val.name,alpha: val.alpha2,value: true}])

    returnData(countries);
  }
  function handleCheck(val,i) {
    let temp = [...countries];
    temp[i].value = val;
    setCountries(temp);

    returnData(countries)
  }
  return (
    <Collapse show label={<h5>Exclude countires</h5>}>
    <p>Please select any countries you do not want to travel through on your journey.</p>
      {/* <input className='flex-1 min-w-[40px] !outline-none' type='text' placeholder='Search here' /> */}
      {/* <SearchIcon className='cursor-pointer text-primary scale-75' /> */}
    <CountriesInput label={"Country"} onChange={handleChange} />
    {countries.map((obj,i) => (
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
