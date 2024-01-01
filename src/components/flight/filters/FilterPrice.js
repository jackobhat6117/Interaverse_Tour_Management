import { useEffect, useState } from "react";
import Collapse from "../../mini/Collapse";
import { def } from "../../../config";
import { Slider } from "@mui/material";
import { formatMoney } from "../../../features/utils/formatMoney";

export default function FilterPrice({returnData,min,max}) {
  const [price,setPrice] = useState(min ? min : 0);
  const [minPrice,setMinPrice] = useState(Math.min(min,max) || 20000);
  const [maxPrice,setMaxPrice] = useState(Math.max(min,max) || 2000000);

  useEffect(() => {
    if(min)
      setMinPrice(min);
    if(max)
      setMaxPrice(max);
  },[min,max])

  function handleChange(ev,val) {
    setPrice(val);
    let obj = {
      price: val,
      // price: nights ? parseInt(val * nights) : val,
      max: maxPrice,
      // max: nights ? parseInt(maxPrice * nights) : maxPrice
    };
    returnData(obj)
    // console.log(' ---> ',obj)
  }
  return (
  <Collapse show label={<h5>Price</h5>}>
    <div className="pt-2">
      <Slider valueLabelDisplay="auto"
        step={parseInt((maxPrice - minPrice) / 50)} min={minPrice} max={maxPrice} value={price} onChange={handleChange} size='small' />
      <div className='flex justify-between gap-4'>
        <span>{formatMoney(minPrice )}</span>
        <span>{formatMoney(maxPrice )}</span>
      </div>
    </div>
  </Collapse>

  )
}
