import { RadioGroup as MuiRadioGroup } from '@mui/material'
import React, { useState } from 'react'
import RadioInput from './RadioInput';
import { func, string } from 'prop-types';

RadioGroup.protoTypes = {
  options: string.isRequired,
  render: func,
  value: string,
  onChange: func,
}
export default function RadioGroup(props) {
  const {className,options,onChange,value,render} = props;
  const [selected,setSelected] = useState(value||'');

  function handleChange(val) {
    onChange && onChange(val);
    setSelected(val);
  }
  return (
    // <RadioGroup options={[{label: 'asf',value: 'asdf'}]} render={({label,value}) => <div>{value}</div>}
    <MuiRadioGroup onChange={(ev) => handleChange(ev.target.value)} value={selected}>
      <div className={` ${className}`}>
        {options.map((obj,i) => (
          <RadioInput value={obj?.value} checked={selected === obj?.value}>
            {render && !obj.render ? 
              render(obj) 
              : obj.render ?
                obj.render(obj)
                :
                <div>{obj?.label}</div>
            }
          </RadioInput>
        ))}
      </div>
    </MuiRadioGroup>
  )
}
