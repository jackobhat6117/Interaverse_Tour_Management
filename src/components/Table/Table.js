import React from 'react'

export default function Table(props) {
  const {rows,columns,...restProps} = props;
  let sortedData = rows.map(item => {
    let newData = {};
    columns.forEach((column, index) => {
      let { field } = column;
      newData[field] = item[field];
      // newData._index = index; // Add a temporary property to track the column order
    });
    return newData;
  });

  console.log('sotred dat: ',sortedData)

  return (
    <table className='w-full my-2' {...restProps}>
      <thead className='!bg-theme1/20 p-2'>
        {columns.map((obj,i) => (
          <TD>{obj.headerName}</TD>
        ))}
      </thead>
      <tbody>
        {sortedData.map((obj,i) => {
          return (
            <tr key={i}>
            {
              Object.entries(obj).map(([key,val],j) => (
                <TD key={j}>
                  {/* {key} - {val} - {columns[j].field} */}
                  {key === columns[j].field ? val : null}
                </TD>
              ))
            }
            </tr>
          )
        })}
      </tbody>
    </table>

  )
}

function TD(props) {
  const {children,...restProps} = props;
  return (
    <td {...restProps} className='p-2' >{children}</td>
  )
}