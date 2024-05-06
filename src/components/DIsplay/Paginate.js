import React, { useEffect, useState } from 'react'
import MD from './Screen/MD';

export default function Paginate({page:defPage=0,data,limit=2,render,className}) {
  const [page,setPage] = useState(defPage);
  const totalPage = Math.ceil(data.length/limit);

  useEffect(() => {
    setPage(defPage)
  },[data,defPage])

  console.log(defPage,page)

  function handlePage(ind) {
    if(typeof(ind) === 'number') {
      if(ind < data.length && ind >= 0)
       setPage(ind)
    } else if(ind === 'next') {
      if(page < totalPage-1)
        setPage(page => page+1);
    } else if(ind === 'back') {
      if(page > 0)
        setPage(page => page-1)
    }
  }
  return (
    <div>
      <div className={className}>
        {data.slice(page*limit,(limit*page)+limit).map((obj,i) => 
          render(obj,i)
        )}
      </div>
      <div className='flex gap-2 p-2 py-10 justify-end items-center font-bold'>
        <button className=' h-10 rounded-md bg-primary/20 px-3 font-semibold' onClick={() => setPage(0)}>
          <MD>First</MD>
          <MD lt>{'<<'}</MD>
        </button>
        <MD className='whitespace-nowrap'>--</MD>
        <button className='w-10 h-10 rounded-md bg-primary/20 font-black' onClick={() => handlePage('back')}>{"<"}</button>
        <MD className='whitespace-nowrap'>--</MD>
        {Array.from({length: totalPage},(_,i) => i).splice(page-1 < 0 ? 0 : page-1,3).map((ind) => (
          <button key={ind} onClick={() => handlePage(ind)} className={'w-10 h-10 rounded-md bg-primary/20 font-bold  '+(page === ind ? ' !bg-theme1 text-white ':'')}>{ind+1}</button>
        ))}
        <MD className='whitespace-nowrap'>--</MD>
        <button className='w-10 h-10 rounded-md bg-primary/20 font-black' onClick={() => handlePage('next')}>{">"}</button>
        <MD className='whitespace-nowrap'>--</MD>
        <button className=' h-10 rounded-md bg-primary/20 px-3 font-semibold' onClick={() => setPage(totalPage-1)}>
          <MD>Last</MD>
          <MD lt>{'>>'}</MD>
        </button>
      </div>
    </div>
  )
}
