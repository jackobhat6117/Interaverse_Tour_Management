import React, { useEffect, useState } from 'react'
import Checkbox from '../forms/Checkbox'


export default function ProductTypes({data,returnData}) {
  const [selectedValues, setSelectedValues] = useState(data?.interestedIn || []);

  useEffect(() => {
    selectedValues.length && returnData &&
    returnData({...data,interestedIn: selectedValues})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedValues])

  const handleChange = (event) => {
    const { value } = event.target;
    let newval;
    setSelectedValues((prevSelectedValues) => {
      if (prevSelectedValues.includes(value)) {
        newval = prevSelectedValues.filter((val) => val !== value);
      } else {
        newval = [...prevSelectedValues, value];
      }
      return newval;
    });

    // returnData({...data,interestedIn: newval})

    console.log('selected: ',selectedValues,newval)
  };
  return (
    <div className='flex flex-col gap-4 items-center'>
      <h4 className='text-center'>What products are you interested in selling?</h4>
      <p className=''>Sharing this information will enhance your experience without any restrictions on feature access.</p>
      <div className='flex flex-wrap gap-4 justify-between self-stretch py-4'>
        <Checkbox name='type' checked={selectedValues.includes('Flight')} onChange={handleChange} value='Flight'>Flight</Checkbox>
        <Checkbox name='type' checked={selectedValues.includes('Stay')} onChange={handleChange} value='Stay'>Stay</Checkbox>
        <Checkbox name='type' checked={selectedValues.includes('Tour')} onChange={handleChange} value='Tour'>Tour</Checkbox>
        <Checkbox name='type' checked={selectedValues.includes('Protection')} onChange={handleChange} value='Protection'>Protection</Checkbox>
      </div>
    </div>
  )
}
