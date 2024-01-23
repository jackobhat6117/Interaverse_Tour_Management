import React, { useState } from 'react'
import Icon from '../HOC/Icon'
import { formatMoney } from '../../features/utils/formatMoney'

export default function CheckedBags({data}) {
    const items = [
        {icon: 'game-icons:school-bag', name: 'Personal Item', quantity: "x1", status: 'included in ticket'},
        {icon: 'mdi:bag-carry-on', name: 'Carry-on bag', quantity: "x1", status: 'included in ticket'},
        {icon: 'material-symbols:checked-bag', name: 'Checked bag', quantity: '1x 23kg', status: 'included in ticket'},
    ]
    const [selected,setSelected] = useState();

    const obj = JSON.parse(selected || '{"price":0,"label": "Select a bag to add"}')
  return (
    <div className='flex w-full flex-col gap-4'>
        <b>{data.from} to {data.to}</b>
        <p>Included (per person)</p>

        <div className='border border-theme1 rounded-md bg-theme1/5 text-theme1'>
            {items.map((obj,i) => (
                <div key={i} className={'flex gap-4 items-center border-theme1 py-2 px-4 '+(i !== 0 ? 'border-t':'')}>
                    <Icon icon={obj.icon} />
                    <div className='flex gap-4 items-center flex-wrap justify-between flex-1'>
                        <div className='flex-1 flex flex-col '>
                            <span>{obj.name}</span>
                            <span>{obj.quantity}</span>
                        </div>
                        <span className='bg-theme1 text-center text-white px-2 uppercase text-xs rounded-sm '>{obj.status}</span>
                    </div>
                </div>
            ))}
        </div>

        <div>
            <h5>Want More?</h5>
            <p>Increase your checked bags below</p>
        </div>

        <div className={'border border-theme1 rounded-md text-theme1 flex gap-4 items-center px-4 py-2 '+(obj?.price?'bg-theme1/5':'')}>
            <Icon icon={'material-symbols:checked-bag'} />
            <div className='flex flex-1 items-center justify-between gap-4'>
                <div className=' flex flex-col self-start'>
                    <span>{obj?.price ? 'Checked bag' : obj?.label}</span>
                    <select className='bg-transparent w-full' onChange={(ev) => setSelected(ev.target.value)}>
                        <option value=''></option>
                        {[
                            {label: '1x 23kg',price: 20000},
                            {label: '2x 46kg',price: 40000},
                        ].map((obj,i) => (
                            <option key={i} value={JSON.stringify(obj)}>{obj.label}</option>
                        ))}
                    </select>
                </div>
                <label className='p-1 px-4 rounded-md border border-theme1/50 text-primary font-bold'>{formatMoney(obj.price)}</label>
            </div>
        </div>
    </div>
  )
}
