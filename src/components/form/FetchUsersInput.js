import React, { useEffect, useState } from 'react'
import { Autocomplete, InputAdornment, TextField } from '@mui/material';
// import { getUsers } from '../../controllers/user/getUsers';
import { Add } from '@mui/icons-material';

export default function FetchUsersInput({from,value,onChange,label,shrink,enableNew}) {
  const [option,setOption] = useState(from || []);

  useEffect(() => {
    setOption([]);
  },[label])
  useEffect(() => {
    if(from)
      setOption(from)
  },[from])

  useEffect(() => {
    if(option[0] !== 'Add User' && enableNew)
      setOption(['Add User',...option])
  },[option,enableNew])

  function handleChange(newVal) {
    onChange(newVal);
    // console.log('user: ',newVal)
  }
  async function fetchUser(val) {
    if(val.length > 1 || from) return false;
    // let q = {
    //   q: val,
    //   type: label.toString().toUpperCase() || '',
    //   // limit: 100,
    // }
    // const res = await getUsers((new URLSearchParams(q)).toString());
    // if(res.return)
      // setOption(res.data);
      // setOption(res.data.filter((obj,ind) => ind === res.data.findIndex(o => o.id === obj.id)));
  }
  const filterOptions = (options, inputValue) => {
    const inputValueLowerCase = inputValue.toLowerCase();
    let temp = options.slice(enableNew ? 1 : 0).filter(
      (option) =>
        option.firstName.toLowerCase().startsWith(inputValueLowerCase) ||
        (option.apiUserData && option.apiUserData.companyName.toLowerCase().startsWith(inputValueLowerCase)) ||
        (option.email && option.email.toLowerCase().startsWith(inputValueLowerCase)) ||
        (option.lastName && option.lastName.toLowerCase().startsWith(inputValueLowerCase)) ||
        (option.lastName && (option.firstName+" "+option.lastName).toLowerCase().startsWith(inputValueLowerCase))
    );
    if(enableNew)
      return [options[0],...temp]
    else return temp;
  };

  return (
    <Autocomplete className='min-w-[200px]'
    noOptionsText='No data'
    disableClearable
    freeSolo
    options={option}
    filterOptions={(options, { inputValue }) =>
      filterOptions(options, inputValue)
    }
    getOptionLabel={(option) =>
      typeof option === 'string' ? option : option.firstName+" "+option.lastName
    }
    value={value}
    onChange={(ev,newVal) => handleChange(newVal)}
    onInputChange={(ev,newVal) => fetchUser(newVal)}
    renderInput={(params) => (
      <TextField {...params} label={"Search "+(label || " User")} size='small'
        InputProps={{
          ...params.InputProps,
          type: 'search',
          startAdornment: (
            <InputAdornment position='start'>
              
            </InputAdornment>
          )
        }}
        InputLabelProps={{
          shrink: shrink !== null ? shrink : true,
        }} />
    )}
    renderOption={(props,opt) => {
      if(opt === 'Add User')
        return <div {...props} key={'add_new'} className='p-2 flex gap-2 cursor-pointer sticky top-0 bg-secondary !m-0'>
          <Add />
          Add New Passenger
        </div>
      let agencyName = "";
      try {
         agencyName = opt.apiUserData.companyName;
      } catch(ex) {}
      return (
        <div {...props} key={opt.id} className='flex flex-col !p-2 !cursor-pointer' style={{padding: 10,cursor: 'pointer'}}>
          <h4>{opt.firstName} {opt.lastName}</h4>
          {agencyName !== "" ? (
            <small>{agencyName}</small>
          ): (
            <small>{opt.email}</small>
          )}
          {/* <h4>{opt.alpha2}</h4> */}
          {/* <small className='!whitespace-nowrap !text-ellipsis !block' title={opt.name}>{opt.name}</small> */}
        </div>
      )
    }}
  />
  )
}
