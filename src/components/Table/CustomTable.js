import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import SearchInput from '../form/SearchInput';
import Button1 from '../form/Button1';

export default function CustomTable(props) {
  const {columns,rows,search,...restProps} = props;
  const [searchVal,setSearchVal] = useState(search||'');
  
  let minWidths = {}
  let modRows = Array.isArray(rows) ? [...rows] : [rows];

  rows.map((obj,i) => {
    if(!obj.id)
      modRows[i]['id'] = i;
    Object.entries(obj).map(([key,val]) => {
      let length = (val)?.toString()?.length || 1;
        
      if(!minWidths[key] || (minWidths[key] < length * 12))
        minWidths[key] = setWidth(60,length * 12);

      return true;
    })
    return true;
  })
  // console.log("minWidths: ",minWidths)

  function setWidth(min,max) {
    return Math.min(400,Math.max(min,max))
  }
  
  let modCols = [...columns];
  modCols = modCols.map((obj) => ({...obj,minWidth: setWidth(obj.headerName.length*12,obj?.minWidth || minWidths[obj.field] || null)}))
  // console.log('modCols ',modCols)

  function handleSearch(ev) {
    ev?.preventDefault();
    rows.filter((row) => row.find())
  } 

  return (
    <div>
      <form onSubmit={handleSearch} className='flex gap-2 items-center'>
        <SearchInput />
        <Button1 type='submit' className='h-full !w-auto sm:!px-6'>Search</Button1>
      </form>

      <DataGrid autoHeight columns={modCols} rows={modRows} {...restProps} />
    </div>
  )
}
