import { Autocomplete } from '@mui/material'
import React from 'react'

export default function FetcherInput(props) {
  const {options,value,className} = props;
  return (
    <div className={className}>
      <Autocomplete 
        noOptionsText='No data'
        disableClearable
        // getOptionLabel={(option) =>
        //   typeof option === 'string' ? option : option.iata
        // }
        freeSolo
        filterOptions={(x) => x}
        {...props}
        

        options={options}
        value={value} size='small'
      />
    </div>
  )
}
