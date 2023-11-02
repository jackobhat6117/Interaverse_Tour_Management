import { LuggageOutlined, LuggageRounded } from "@mui/icons-material";
import { useState } from "react";
import IncDec from "../../mini/IncDec";

export default function FilterTravelLuggage({returnData}) {
  const [luggage,setLuggage] = useState([
    {label: 'Cabin baggage',icon: <LuggageRounded className='sqr4' />,value: 0},
    {label: 'Checked baggage',icon: <LuggageOutlined className='sqr4' />,value: 0},
  ])

  // useEffect(() => {
  //   if(returnData)
  //     returnData(luggage);
  // },[luggage,returnData])

  function handleChange(val,i) {
    let temp = [...luggage];
    temp[i].value = val;
    setLuggage(temp);
    returnData(temp);
  }
  return (
    <div className='flex flex-col gap-3'>
      <h4>Bags</h4>
      {luggage.map((obj,i) => (
        <div key={i} className='flex gap-2 flex-nowrap items-center'>
          {obj.icon}
          <div className='flex-1 flex justify-between'>
            <div className='flex flex-col'>
              {obj.label}
            </div>
            <IncDec value={obj.value} min={0} returnData={(val) => handleChange(val,i)} />
          </div>
        </div>
      ))}
    </div>
  )
}
