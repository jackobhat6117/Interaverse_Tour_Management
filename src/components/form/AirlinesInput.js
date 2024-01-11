import React, { useState } from 'react'
import { InputAdornment, TextField } from '@mui/material';
import FetcherInput from '../mini/FetcherInput';
import getAirlineCodes from '../../controllers/Flight/getAirlines';

export default function AirlinesInput({val,returnData,option,label,icon,multiple}) {
  const [ariline,setAriline] = useState([]);
  const [data,setData] = useState(val || "")

  // option?.map(val => {
  //   let airlines = [];
  //   getAriline(val.id,(data) => (
  //     airlines = [...data]
  //   ))
  //   console.log('----------')
  //   return console.log(airlines)
  // })
  
  async function handleChange(val) {
    if(!val || val.length === 0)
      return returnData && returnData(null)
    getAriline(val);
    setData(val);
  }
  function handleReturn(val) {
    // console.log(' ---',val)
    if(returnData)
      returnData(val);
  }
  
  async function getAriline(val,callback) {
    if(val === '') return false;
    const res = await getAirlineCodes(val);
    if(res.return)
      if(!callback)
        setAriline(res.data?.data);
      else callback(res.data?.data)
  }

  const filterOptions = (options, inputValue) => {
    const inputValueLowerCase = inputValue.toLowerCase();
    return options.filter(
      (option) =>
        option.name.toLowerCase().startsWith(inputValueLowerCase) ||
        option.id.toLowerCase().startsWith(inputValueLowerCase)
    );
  };


  return (
    <FetcherInput className='min-w-[200px]'
      options={ariline}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.name
      }
      filterOptions={(options,{inputValue}) => filterOptions(options,inputValue)}
      value={data} size='small'
      onInputChange={(ev,newVal) => handleChange(newVal)}
      onChange={(ev,newVal) => handleReturn(newVal)}
      // multiple
      renderInput={(params) => (
        <TextField {...params} label={label}
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
            <h4>{opt.id}</h4>
            <small className='!whitespace-nowrap !text-ellipsis !block' title={opt.name}>{opt.name}</small>
          </div>
        )
      }}
    />
  )
}
