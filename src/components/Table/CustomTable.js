import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

export default function CustomTable(props) {
  return (
    <div>
      <DataGrid {...props} />
    </div>
  )
}
