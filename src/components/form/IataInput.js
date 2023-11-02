import React, { useEffect, useState } from 'react'
import { InputAdornment, TextField } from '@mui/material';
import FetcherInput from '../mini/FetcherInput';
import getIATAData from '../../controllers/Flight/getIATAData';


export default function IataInput({val,returnData,label,icon,className}) {
  const [IATA,setIATA] = useState([]);
  const [data,setData] = useState(val || "")
  
  useEffect(() => {
    if(val)
      setData(val)
  },[val])

  async function handleChange(val) {
    getIata(val);
    setData(val);
    handleReturn(val);
  }
  function handleReturn(val) {
    if(returnData)
      returnData(val);
  }
  
  async function getIata(val) {
    if(val === '') return false;
    const res = await getIATAData(val);
    if(res.return)
      setIATA(res.data);
  }

  const filterOptions = (options, inputValue) => {
    const inputValueLowerCase = inputValue.toLowerCase();
    return options.filter(
      (option) =>
        option.iata.toLowerCase().startsWith(inputValueLowerCase) ||
        option.city.toLowerCase().startsWith(inputValueLowerCase) ||
        option.name.toLowerCase().startsWith(inputValueLowerCase) ||
        option.state.toLowerCase().startsWith(inputValueLowerCase)
    );
  };


  return (
    <FetcherInput className={'min-w-[200px] '+className}
      options={IATA}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.iata
      }
      filterOptions={(options,{inputValue}) => filterOptions(options,inputValue)}
      value={data} size='small'
      onInputChange={(ev,newVal) => handleChange(newVal)}
      onChange={(ev,newVal) => handleReturn(newVal)}
      
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
            <h4>{opt.iata}</h4>
            <small className='!whitespace-nowrap !text-ellipsis !block' title={opt.name}>{opt.name}</small>
          </div>
        )
      }}
    />
  )
}
