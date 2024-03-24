import { RadioGroup as MuiRadioGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RadioInput from './RadioInput';
import { func, string } from 'prop-types';

RadioGroup.protoTypes = {
  options: string.isRequired,
  render: func,
  value: string,
  onChange: func,
}
export default function RadioGroup(props) {
  const {className,radioClass,options:gotOpt,onChange,value,render} = props;
  const [selected,setSelected] = useState(value||'');
  const [options,setOptions] = useState(gotOpt)

  useEffect(() => {
    if(gotOpt) {
      setOptions(gotOpt)
    } 
    setSelected(value || '')
  },[gotOpt,value])

  function handleChange(val) {
    setSelected(val);
    onChange && onChange(val);
  }
  return (
    // <RadioGroup options={[{label: 'asf',value: 'asdf'}]} render={({label,value}) => <div>{value}</div>}
    <MuiRadioGroup onChange={(ev) => handleChange(ev.target.value)} value={selected}>
      <div className={` ${className}`}>
        {options?.map((obj,i) => {
          return (
          <RadioInput required={props?.required} key={i} value={obj?.value} checked={selected?.toString() === obj?.value?.toString()} className={radioClass}>
            {render && !obj.render ? 
              render(obj) 
              : obj.render ?
                obj.render(obj)
                :
                <div>{obj?.label}</div>
            }
          </RadioInput>
        )})}
      </div>
    </MuiRadioGroup>
  )
}
