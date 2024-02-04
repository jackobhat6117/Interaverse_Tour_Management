import { useState } from "react";

export default function IncDec({min,max,value,returnData,size}) {
  const [n,setN] = useState(value || 0);

  function inc() {
    if(max !== null || max !== undefined)
      if(n+1 > max) return false;
    setN(n+1);
    if(returnData)
      returnData(n+1)
  }
  function dec() {
    if(min !== null || min !== undefined)
      if(n-1 < min) return false;
    setN(n-1);
    if(returnData)
      returnData(n-1)
  }
  return (
    <div className={'flex gap-1 items-center justify-between '+(size==='small'?' scale-75 ':'')}>
      <label onClick={dec} className={' select-none cursor-pointer flex items-center justify-center rounded-full bg-slate-300 text-primary w-5 h-5'}> - </label>
      <div className="font-mono min-w-[30px] select-none text-center">{n}</div>
      <label onClick={inc} className={' select-none cursor-pointer flex items-center justify-center rounded-full text-slate-300 bg-primary w-5 h-5'}> + </label>
    </div>
  )
}