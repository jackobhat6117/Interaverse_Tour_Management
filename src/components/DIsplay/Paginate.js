import React, { useState } from 'react'

export default function Paginate({data,limit=2,render,className}) {
  const [page,setPage] = useState(0);
  const totalPage = Math.ceil(data.length/limit);

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
  console.log(data.length,page,'slice '+page*limit+" - "+((limit*page)+limit))
  return (
    <div>
      <div className={className}>
        {data.slice(page*limit,(limit*page)+limit).map((obj,i) => 
          render(obj,i)
        )}
      </div>
      <div className='flex gap-2 p-2 py-10 justify-end items-center font-bold'>
        <button className=' h-10 rounded-md bg-primary/20 px-3 font-semibold' onClick={() => setPage(0)}>First</button>
        --
        <button className='w-10 h-10 rounded-md bg-primary/20 font-black' onClick={() => handlePage('back')}>{"<"}</button>
        --
        {Array.from({length: totalPage},(_,i) => i).splice(page-1 < 0 ? 0 : page-1,3).map((ind) => (
          <button key={ind} onClick={() => handlePage(ind)} className={'w-10 h-10 rounded-md bg-primary/20 font-bold  '+(page === ind ? ' !bg-theme1 text-white ':'')}>{ind+1}</button>
        ))}
        --
        <button className='w-10 h-10 rounded-md bg-primary/20 font-black' onClick={() => handlePage('next')}>{">"}</button>
        --
        <button className=' h-10 rounded-md bg-primary/20 px-3 font-semibold' onClick={() => setPage(totalPage-1)}>Last</button>
      </div>
    </div>
  )
}
