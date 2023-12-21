import { useState } from "react";
import Collapse from "../../mini/Collapse";
import { def } from "../../../config";
import { Slider } from "@mui/material";

export default function FilterPrice({returnData,min,max}) {
  const [price,setPrice] = useState(min ? min : 0);
  const minPrice = min || 20000;
  const maxPrice = max || 2000000;

  function handleChange(ev,val) {
    setPrice(val);
    returnData({price: val,max: maxPrice})
  }
  return (
  <Collapse show label={<h5>Price</h5>}>
    <div className="pt-2">
      <Slider valueLabelDisplay="auto"
        step={(maxPrice - minPrice) / 50} min={minPrice} max={maxPrice} value={price} onChange={handleChange} color='primary' size='small' />
      <div className='flex justify-between gap-4'>
        <span>{def.currency}{minPrice}</span>
        <span>Any</span>
      </div>
    </div>
  </Collapse>

  )
}
