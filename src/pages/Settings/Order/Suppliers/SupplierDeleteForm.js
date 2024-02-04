import React, { useState } from 'react'
import Icon from '../../../../components/HOC/Icon'
import RadioGroup from '../../../../components/form/RadioGroup'


export default function SupplierDeleteForm({data,footer}) {
    const [selected,setSelected] = useState();
    let selectedSupplierIcon = 'carbon:scis-transparent-supply'
    // giving options value if it doesn't have one
    const option = data?.option?.map(obj => ({...obj,value: obj.name}))
  return (
    <div className='flex flex-col gap-6'>
        <div className='flex justify-between gap-4'>
            <h5>Delete your details</h5>
            <div className='flex gap-2'>
                <Icon icon={selectedSupplierIcon} />
                {/* <img src='selectedSupplierIcon' alt='' /> */}
                <select>
                    <option>Amadeus</option>
                </select>
            </div>
        </div>
        <p>Note that this action is permanent and deleted details cannot be recovered.</p>
        <RadioGroup options={option}
          value={selected}
          className='flex flex-col gap-2 items-start'
          onChange={(val) => setSelected(val)}
          render={(obj) => (
            <div className='flex flex-col '>
                <h6>{obj.name}</h6>
                <p>xyzKey: {obj.xyzKey}</p>
                <p>abcKey: {obj.abcKey}</p>
            </div>
        )} />
        {footer && footer(selected)}
    </div>
  )
}
