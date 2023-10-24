import React from 'react'
import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import {countries} from 'country-data';

export default function CountriesInput({value,onChange,label,icon,className,required}) {
  const option = countries.all.filter((country) => country.status === 'assigned');

  function handleChange(newVal) {
    console.log('country change: ',newVal)
    if(onChange)
      onChange(newVal);
  }
  return (
    <Autocomplete className={'min-w-[200px] '+className}
    noOptionsText='No data'
    disableClearable
    freeSolo
    options={option}
    getOptionLabel={(option) =>
      typeof option === 'string' ? option : option.name
    }
    value={value}
    onChange={(ev,newVal) => handleChange(newVal)}
    onInputChange={(ev,newVal) => handleChange(newVal)}
    renderInput={(params) => (
      <TextField {...params} required={required} value='test' label={label || "Nationality"} size='small'
        InputProps={{
          ...params.InputProps,
          type: 'search',
          startAdornment: (
            <InputAdornment position='start'>
              {icon}
            </InputAdornment>
          )
        }}
        InputLabelProps={{
          shrink: true,
        }} />
    )}
    renderOption={(props,opt) => {
      return (
        <div {...props} className='flex flex-col !p-2 !cursor-pointer' style={{padding: 10,cursor: 'pointer'}}>
          <h4>{opt.alpha2}</h4>
          <small className='!whitespace-nowrap !text-ellipsis !block' title={opt.name}>{opt.name}</small>
        </div>
      )
    }}
  />
  )
}
