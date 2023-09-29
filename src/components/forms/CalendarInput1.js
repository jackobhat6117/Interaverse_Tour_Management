import { CalendarMonth } from '@mui/icons-material'
import { Popover } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function CalendarInput1() {
  // const [date,setDate] = useState();
  const [anchorEl,setAnchorEl] = useState();

  function handleClick(ev) {
    setAnchorEl(ev.currentTarget)
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });

  const handleDayClick = (day) => {

    // console.log('day: ',JSON.stringify(day),typeof(JSON.stringify(day)))
    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: day, end: null });
    } else if (selectedRange.start && !selectedRange.end) {
      if (day >= selectedRange.start) {
        setSelectedRange({ ...selectedRange, end: day });
      } else {
        setSelectedRange({ start: day, end: selectedRange.start });
      }
    }
  };

  const modifiers = {
    selected: { from: selectedRange.start, to: selectedRange.end },
  };

  // console.log(selectedRange)

  return (
    <div >
      <div className='flex items-center gap-2 cursor-pointer relative ' onClick={handleClick}  aria-describedby={id}>
        <span className='whitespace-nowrap'>
          {moment(selectedRange?.start || new Date()).format('Do MMM')} - {moment(selectedRange?.end || new Date()).format('Do MMM')}
        </span>
        <CalendarMonth className='text-xs text-theme1' size='small' />
      </div>
      <Popover id={id} anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}
       placement='bottom-end'
       anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
       }}
       transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
       }}>
        <DayPicker mode='single' numberOfMonths={2}
          selected={selectedRange.start} modifiers={modifiers} onDayClick={handleDayClick} 
          // onSelect={(val) => setDate(val)}
           />
      </Popover>
    </div>
  )
}
