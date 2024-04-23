import React, { useEffect, useState } from 'react'
import Icon from '../HOC/Icon'
import { formatMoney, getNumber } from '../../features/utils/formatMoney'


export default function CheckedBags({data,selected:gotSelected,callback,offer,hide}) {
    const items = [
        {icon: 'game-icons:school-bag', name: 'Personal Item', quantity: "x1", status: 'included in ticket'},
        {icon: 'mdi:bag-carry-on', name: 'Carry-on bag', quantity: "x1", status: 'included in ticket'},
        {icon: 'material-symbols:checked-bag', name: 'Checked bag', quantity: '1x 23kg', status: 'included in ticket'},
    ]
    const init = '{"price":0,"label": "Select a bag to add"}';

    const [selected,setSelected] = useState();

    let price = 0;
    offer?.pricingInformation?.price?.additionalServices?.map(obj => {
        if(obj?.service === 'CHECKED_BAGS')
            price = getNumber(obj?.price)
        return true;
    })

    useEffect(() => {
        // console.log(' -> ',gotSelected ? JSON.stringify(gotSelected) : init)
        const {label,quantity,weight,price} = gotSelected || {};
        if(weight)
            setSelected(gotSelected ? JSON.stringify({label,quantity,weight,price}) : init)
    },[gotSelected])

    async function handleSelect(bag) {
        setSelected(bag)
        
        callback && callback(JSON.parse(bag||"{}"));
        // let price = 0;
        
        // let modDirection = clone(data?.direction);
        // modDirection?.map((flight,i) => {
        //     let passengerBag = [];
        //     let {quantity,weight} = JSON.parse(bag || '{}');
        //     try {
        //         passengerBag = [...flight.additionalServices.chargeableCheckedBags];
        //     } catch(ex) {}

        //     const w = weight.match(/\d+/)[0];

        //     passengerBag.push({quantity,weight:parseInt(w),passenger: data.passenger + 1})

        //     // bags[i][j]?.filter(obj => obj)?.map(obj => ({...obj,passenger: obj?.passenger + 1}));
        //     try {
        //         flight.additionalServices.chargeableCheckedBags = passengerBag
        //         // flight.additionalServices.chargeableCheckedBags.push(bags[i][j])
        //     } catch(ex) {
        //         // console.log('0XbagsPush')
        //         // flight.additionalServices.chargeableCheckedBags = [bags[i][j]]
        //         console.log('0XbagsCreate')
        //         try {
        //         flight.additionalServices = {chargeableCheckedBags: passengerBag}
        //         } catch(ex) {
        //         console.log('0XadditionalServiceCreate')
        //         }
        //     }
        //     return true;
        // })

        // let modOffer = clone(offer);
        // modOffer.directions.map((_,i) => {
        //     if(i === data.index)
        //         modOffer.directions[i] = modDirection
        //     return true;
        // })

        // console.log(' --> ',data.index,modDirection,modOffer.directions[data.index])

        // const req = {
        //     supplier: modOffer?.supplier,
        //     offers: [modOffer]
        // }
        // const res = await getFlightOfferPrice(req);
        // if(res.return)
        //     console.log(res.data.data)
            
    }

    const obj = JSON.parse(selected || init)
    console.log(' -> ',obj)
  return (
    <div className='flex w-full min-w-[300px] flex-col gap-4'>
        <b>{data?.departure?.location} to {data?.arrival?.location}</b>
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

        {hide?.includes('wantMore') ? 
            <div><h5>&nbsp;</h5><p>&nbsp;</p></div>
        :
            <div>
                <h5>Want More?</h5>
                <p>Increase your checked bags below</p>
            </div>
        }

        <div className={'border border-theme1 rounded-md text-theme1 flex gap-4 items-center px-4 py-2 '+(obj?.price?'bg-theme1/5':'')}>
            <Icon icon={'material-symbols:checked-bag'} />
            <div className='flex flex-1 items-center justify-between gap-4'>
                <div className=' flex flex-col self-start'>
                    <span>{obj?.price ? 'Checked bag' : obj?.label}</span>
                    <select className='bg-transparent w-full' value={selected} onChange={(ev) => handleSelect(ev.target.value)}>
                        <option value=''></option>
                        {[
                            {label: '1x '+data?.baggage,quantity: 1,weight: data?.baggage,price},
                            {label: '2x '+data?.baggage,quantity: 2,weight: data?.baggage,price: price*2},
                            {label: '3x '+data?.baggage,quantity: 3,weight: data?.baggage,price: price*3},
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
