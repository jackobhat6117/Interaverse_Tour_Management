import { CalendarMonth } from '@mui/icons-material'
import { Popover } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { clone } from '../../features/utils/objClone';
import Button1 from './Button1';

export default function CalendarInput1({value,label,className,multiple,onChange}) {
  // const [date,setDate] = useState();
  const [anchorEl,setAnchorEl] = useState();

  function handleClick(ev) {
    setAnchorEl(ev.currentTarget)
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;


  let dateInit = value;
  if(Array.isArray(dateInit)) {
    dateInit = {start: value[0] || '',end: value[1] || ''}
  } else if(typeof(dateInit) === 'string')
    dateInit = {start: dateInit}
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null,...dateInit });


  useEffect(() => {
    let start = moment(selectedRange.start).toString();
    let end = moment(selectedRange.end).toString();
    if(selectedRange.start || selectedRange.end) {
      onChange && onChange({start,end})
    }

    //eslint-disable-next-line
  },[selectedRange])
  const handleDayClick = (day) => {
    let newDate = clone(selectedRange);
    // console.log('day: ',JSON.stringify(day),typeof(JSON.stringify(day)))
    if (!selectedRange.start || (selectedRange.start && selectedRange.end) || !multiple) {
      newDate = ({ start: day, end: null });
    } else if (selectedRange.start && !selectedRange.end) {
      if (day >= selectedRange.start) {
        newDate = ({ ...selectedRange, end: day });
      } else {
        newDate = ({ start: day, end: selectedRange.start });
      }
    }
    setSelectedRange(newDate)
  };

  const modifiers = {
    selected: !multiple ? selectedRange.start : { from: selectedRange.start, to: selectedRange.end },
  };


  // console.log(selectedRange)

  return (
    <div >
      <fieldset className={'flex items-center justify-between gap-2 cursor-pointer bg-secondary relative '+(label?' border border-primary/30 rounded-sm p-[14px] ':'')+className} onClick={handleClick}  aria-describedby={id}>
        <legend className={`${label ? 'px-2':''} text-xs absolute -top-2 bg-inherit text-primary/70 whitespace-nowrap max-w-[80%] overflow-hidden `}>{label || ''}</legend>
        {/* <FormLabel component={'legend'}>{label || ''}</FormLabel> */}
        <span className='whitespace-nowrap'>
          {moment(selectedRange?.start || new Date()).format('Do MMM')}
          {multiple ? (
            - moment(selectedRange?.end || new Date()).format('Do MMM')
          ):null}
        </span>
        <CalendarMonth className='text-xs text-theme1' size='small' />
      </fieldset>
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
        <DayPicker mode='single' numberOfMonths={multiple ? 2 : 1}
          selected={selectedRange.start} modifiers={modifiers} onDayClick={handleDayClick} 
          // onSelect={(val) => setDate(val)}
           />
        <div className='flex justify-end p-2'>
          <Button1 className='!w-auto !py-[2px] sm:!py-[2px]' onClick={() => setAnchorEl(null)}>Close</Button1>
        </div>
      </Popover>
    </div>
  )
}
