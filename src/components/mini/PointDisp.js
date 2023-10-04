import React from 'react'

export default function PointDisp({value}) {
  let colorClass = 'text-primary';
  if(value < 0)
    colorClass = 'text-red-500';
  else if(value > 0)
    colorClass = 'text-green-500';

  return (
    <b className={`${colorClass} `}>{value > 0 ? '+':''}{value}</b>
  )
}
