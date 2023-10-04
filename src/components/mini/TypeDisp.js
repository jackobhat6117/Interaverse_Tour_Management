import React from 'react'

export default function TypeDisplay({type}) {
  let colorClass = {
    flight: 'text-blue-500 bg-blue-500/20',
    hotel: 'text-[#8B4513] bg-[#8B4513]/20',
    tour: 'text-purple-500 bg-purple-500/20',
  }
  
  return (
    <div className={`${colorClass[type]} font-bold px-2 py-1 rounded-md`}>{type}</div>
  )
}
