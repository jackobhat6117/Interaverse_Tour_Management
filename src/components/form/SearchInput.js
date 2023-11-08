import { TextField } from '@mui/material'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Search } from '@mui/icons-material'
import { alertType } from '../../data/constants'


SearchInput.propTypes = {
  label: PropTypes.string,
  placeHolder: PropTypes.string,
  exampleview: PropTypes.bool,
  searchview: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
}
export default function SearchInput(props) {
  const {exampleview,searchview} = props;
  const [exampleOpen,setExampleOpen] = useState(false);
  const [resultOpen,setResultOpen] = useState(false);
  const [value,setValue] = useState(props.value || '');

  function handleChange(ev) {
    let val = ev.target.value;
    setValue(val);
    props.onChange && props.onChange(val);
    
    if(val?.length === 0) {
      setResultOpen(false)
      setExampleOpen(true);
    }
    else {
      setExampleOpen(false);
      setResultOpen(true)
    }
  }

  function handleBlur() {
    setExampleOpen(false)
    setResultOpen(false);
  }

  function handleExample(ev) {
    let val = ev.target.value;
    if(val?.length === 0)
      setExampleOpen(true);
    else setExampleOpen(false);

  }

  return (
    <div className={`w-full relative z-[80]`}>
      <TextField className='w-full bg-secondary rounded-md ' size='small' 
        // label={<div className='font-bold' >
        //     {props.label || 'Search'}
        // </div>}
        value={value}
        placeholder='Search'
        InputProps={{
          endAdornment: <Search />
        }}
        
        {...props}

        onFocus={handleExample}
        onChange={handleChange}
        onBlur={handleBlur}
        // InputLabelProps={{
          //   shrink: true,
          // }}
      />
      {exampleview ? 
        <ExampleHandle open={exampleOpen} />
      :null}
      {searchview ? 
        <SearchHandle open={resultOpen} />
      :null}
    </div>
  )
}

function SearchHandle({open}) {
  let limit = 5;
  let data = [
    {time: 'Today, 11:30am',status: 'confirmed',PNR: '2VBE4W',extra: 'LOS - IST | $123,123 | Okafar Chiemena'},
    {time: 'Today, 11:30am',status: 'confirmed',PNR: '2VBE4W',extra: 'LOS - IST | $123,123 | Okafar Chiemena'},
    {time: '12 July 2023, 2:30pm',status: 'cancelled',PNR: '2VBE4W',extra: 'LOS - IST | $123,123 | Okafar Chiemena'},
    {time: '14 July 2023, 2:30pm',status: 'pending',PNR: '2VBE4W',extra: 'LOS - IST | $123,123 | Okafar Chiemena'},
    {time: '12 July 2023, 2:30pm',status: 'past',PNR: '2VBE4W',extra: 'LOS - IST | $123,123 | Okafar Chiemena'},
  ]

  return (
    <div className={`absolute w-full bg-secondary rounded-b-md my-2 shadow-md border ${data?.length && open ? ' flex flex-col ':' hidden '}`}>
      <span className=' p-2 px-4 bg-primary/10'>Search results: 
        <span className='text-primary/70 px-2'>
          Showing {Math.min(limit,data.length)} of {data.length} matches
        </span>
      </span>
      <div className='p-4 flex flex-col gap-3 max-h-[80vh] overflow-y-auto'>
        {data.map((obj,i) => {
          let alertClass = alertType[obj.status] || 'error';
          return (
          <div key={i} className='flex flex-col bg-primary bg-opacity-5 p-4'>
            <div className='flex gap-2 flex-wrap items-center justify-between'>
              <small>{obj.time}</small>
              <small className={`${alertClass}`}>{obj.status}</small>
            </div>
            <h4>{obj.PNR}</h4>
            <div>
              {obj.extra}
            </div>
          </div>
        )})}
      </div>
    </div>
  )
}
function ExampleHandle({open}) {
  return (
    <div className={`absolute w-full bg-secondary rounded-b-md my-2 shadow-md border ${open ? ' flex flex-col ':' hidden '}`}>
      <span className='text-primary/70 p-2 bg-primary/10'>Search examples</span>
      <div className='px-4 py-2 flex flex-col gap-4'>
        <div className='flex gap-4 items-center'>
          <div className='light-bg p-3 rounded-md flex items-center justify-center '><Search /></div>
          <div className='flex gap-2 flex-wrap items-center'>
            <h6>ABCDEF</h6>
            <p className='text-primary/50'>Search by booking reference or other identifier</p>
          </div>
        </div>
        <div className='flex gap-4 items-center'>
          <div className='light-bg p-3 rounded-md flex items-center justify-center '><Search /></div>
          <div className='flex gap-2 flex-wrap items-center'>
            <h6>LOS</h6>
            <p className='text-primary/50'>Search by airport or city codes</p>
          </div>
        </div>
        <div className='flex gap-4 items-center'>
          <div className='light-bg p-3 rounded-md flex items-center justify-center '><Search /></div>
          <div className='flex gap-2 flex-wrap items-center'>
            <h6>Okafor Chiemena</h6>
            <p className='text-primary/50'>Search by passenger name</p>
          </div>
        </div>
        <div className='flex gap-4 items-center'>
          <div className='light-bg p-3 rounded-md flex items-center justify-center '><Search /></div>
          <div className='flex gap-2 flex-wrap items-center'>
            <h6>Okafor Chiemena, LOS, JFK</h6>
            <p className='text-primary/50'>Combine multiple search terms</p>
          </div>
        </div>
      </div>
    </div>
  )
}