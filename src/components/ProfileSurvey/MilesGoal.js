import React, { useEffect, useState } from 'react'
import RadioInput from '../forms/RadioInput'
import { RadioGroup } from '@mui/material'
import TextInput from '../forms/TextInput';


let goals = [
  {value: 'Creating and managing flight bookings with a dashboard'},
  {value: 'Building a travel product with use of the API'},
  {value: 'Investigating API providers to find the one for me'},
  {value: 'Managing business and operations'},
  {custom:true,value: '',label: 'Others (please specify)'},
]
export default function MilesGoal({data,returnData}) {
  const [goal,setGoal] = useState(data.goalsWithMiles || '');

  goals.map(obj => {
    if(obj.value === goal)
      obj['active'] = true;
    else obj['active'] = false;
    return true;
  })

  function handleChange(val,i) {
    if(i)
      goals[i]['value'] = val;
    setGoal(val);
    returnData({goalsWithMiles: val})
  }
  return (
    <div className='flex flex-col gap-4 items-center'>
      <h4 className='text-center'>What's your goal with Miles?</h4>
      <p className=''>Sharing this information will enhance your experience without any restrictions on feature access.</p>
      <RadioGroup name='milesGoal' value={goal} onChange={(ev) => handleChange(ev.target.value)} className='flex flex-col gap-4 justify-between self-stretch py-4'>
        {goals.map((obj,i) => (
          <CustomRadio key={i} data={obj} selected={obj.active} onChange={(val) => handleChange(val,i) } />
        ))}
      </RadioGroup>
    </div>
  )
}

const TextInputMemo = React.memo(TextInput);

const CustomRadio = React.memo(({data,selected,onChange}) => {
  const [value,setValue] = useState(data?.value);

  useEffect(() => {
    setValue(data?.value)
  },[data,selected])

  function handleChange(val) {
    setValue(val)
    onChange && onChange(val)
  }
  return (
    <div>
      <RadioInput checked={selected} value={value}>{data.label || data.value}</RadioInput>
      {data.custom && selected ? 
        <TextInputMemo label={''} value={value} onChange={(ev) => handleChange(ev.target.value)} placeholder="What's your goal" />
      :null}

    </div>
  )
})