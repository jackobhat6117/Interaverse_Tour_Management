import React from 'react'
import Icon from '../../../../components/HOC/Icon'

export default function ListAirlines({list,setList}) {
    function handleClose(i) {
        const lists = [...(list||[])]
        setList(lists.filter((_,ind) => ind !== i))
    }
    
  return (
    <div className='flex flex-wrap gap-2'>
        {list?.map((val,i) => (
            <span className="border border-primary/10 p-1 text-xs flex items-center gap-2" key={i}>
                {val}
                <button onClick={() => handleClose(i)}><Icon icon='mdi:close' className='!text-sm' /></button>
            </span>
        ))}
    </div>
  )
}
