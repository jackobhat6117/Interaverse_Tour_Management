import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

export default function CustomTable(props) {
  const {columns,rows,...restProps} = props;
  
  let minWidths = {}

  rows.map((obj) => {
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

  return (
    <div>
      <DataGrid autoHeight columns={modCols} rows={rows} {...restProps} />
    </div>
  )
}
