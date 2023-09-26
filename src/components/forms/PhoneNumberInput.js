import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Autocomplete, FormControl, FormGroup, InputAdornment, InputLabel, TextField } from '@mui/material';
import {countries} from 'country-data';

export default function PhoneNumberInput({value,onChange,label,className,disabled,required}) {
  const option = countries.all.filter((country) => country.status === 'assigned');
  let code = "234";
  let phone = "";
  const [open,setOpen] = useState(false);
  const sqRef = useRef(null);
  const phoneRef = useRef(null);

  try {
    code = value.split('-')[0] || code;
  } catch(ex) {}
  try {
    phone = value.split('-')[1] || "";
    phone = phone.replace(/\D/g,'')
  } catch(ex) {}

  const returnDef = useCallback((val) => onChange && onChange(val),[onChange])
  useEffect(() => {
    returnDef(code+"-"+phone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function handleChange(newVal) {
    setOpen(false);
    try {
      let cod = newVal || code;
      onChange(cod.replace('+','')+"-"+phone);
    } catch(ex) {}
  }
  return (
    <div className={'relative text-[15px] '+className}>
    <FormControl variant='outlined' className='!border-primary/20 hover:!border-primary !rounded-md !flex !nowrap !p-2 ' sx={{border: 1}} required={required}>
      <InputLabel shrink className='bg-secondary font-bold !px-2 -ml-2' >{label !== null ? label : 'Phone Number'} </InputLabel>
      <div className='flex'>
      <input className='w-[50px] !p-2 cursor-pointer' disabled={disabled}
        name='phoneCode'
        value={"+"+(code||'234')}
        tabIndex={0}
        onChange={() => true}
        onFocus={() => {setOpen(true); setTimeout(() => {sqRef.current && sqRef.current.focus()},100)}} />
      <input className='flex-1 !border-0' name='phone' ref={phoneRef} disabled={disabled}
        placeholder='912341234'
        value={phone||""}
        maxLength={10}
        tabIndex={0}
        onChange={(ev) => {
          try {
            onChange(code+"-"+ev.target.value)
          } catch(ex) {throw ex}
        }}
        size='small' label={label || 'Enter phone number'} 
        />
      </div>
    </FormControl>
    <FormGroup className={' z-10 absolute top-0 left-0 !bg-secondary drop-shadow p-4 -my-4 w-full border border-primary/20 z-2 '+(open ? ' ': ' !hidden ')}>
      <FormControl variant='outlined'>
      <InputLabel shrink className='bg-secondary px-2' >Country </InputLabel>
      <Autocomplete className='min-w-[200px]'
        onBlur={() => {setOpen(false);phoneRef?.current?.focus()}}
        noOptionsText='No data'
        disableClearable
        freeSolo
        options={option}
        getOptionLabel={(option) =>
          typeof option === 'string' ? option : option.name
        }
        // value={'+'+code}
        onChange={(ev,newVal) => handleChange(newVal.countryCallingCodes[0])}
        // onInputChange={(ev,newVal) => handleChange(newVal)}
        renderInput={(params) => (
          <TextField {...params} size='small' inputRef={sqRef}
            InputProps={{
              ...params.InputProps,
              type: 'search',
              startAdornment: (
                <InputAdornment position='start'>
                  
                </InputAdornment>
              )
            }}
            InputLabelProps={{
              shrink: true,
            }} />
        )}
        renderOption={(props,opt) => {
          return (
            <div {...props}
              // onClick={() => handleChange(opt.countryCallingCodes)}
             className='flex flex-col !p-2 !cursor-pointer' style={{padding: 10,cursor: 'pointer'}}>
              <h5>{opt.countryCallingCodes}</h5>
              <small className='!whitespace-nowrap !text-ellipsis !block' title={opt.name}>{opt.name}</small>
            </div>
          )
        }}
      />


      </FormControl>
    </FormGroup>
    </div>
  )
}
