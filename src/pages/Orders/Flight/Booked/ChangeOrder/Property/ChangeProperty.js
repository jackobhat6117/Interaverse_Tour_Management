import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../../../../../components/DIsplay/Nav/BreadCrumb'
import { Link } from 'react-router-dom'
import Tabs from '../../../../../../components/DIsplay/Nav/Tabs'
import ChangePassenger from './ChangePassenger';
import ChangeInsurance from './ChangeInsurance';
import { formatMoney } from '../../../../../../features/utils/formatMoney';
import PaymentMethod from '../../../../../../components/flight/PaymentMethod';
import ChangeFlight from './ChangeFlight';
import ChangeFlightOffer from './ChangeFlightOffer';
import ChangeSeat from './ChangeSeat';
import Button1 from '../../../../../../components/form/Button1';
import ChangeBag from './ChangeBag';
import ChangeContact from './ChangeContact';


const properties = [
    {name: 'unkProp',value: '???'},
    {name: 'flight',value: 'Change flight date',elem: <ChangeFlight />},
    {name: 'flight',value: 'Select flight',elem: <ChangeFlightOffer />},
    {name: 'passenger',value: 'Passenger',elem: <ChangePassenger />},
    {name: 'insurance',value: 'Select Plan',elem: <ChangeInsurance />},
    {name: 'seat',value: 'Change Seat',elem: <ChangeSeat />},
    {name: 'bags',value: 'Add bag to order',elem: <ChangeBag />},
    {name: 'contact',value: 'Change contact',elem: <ChangeContact />},
]

const payment = {value: 'Payment', elem: <Payment />};
const confirmation = {value: 'Confirmation', elem: <Confirmation />};

export default function ChangeProperty({property,obj}) {
    const data = {orderId: 1,...(obj || {})};
    const [selected,setSelected] = useState();

    const props = properties?.filter(obj => obj.name === property)
    let options = [
        ...(props.length ? props : [properties[0]]),
        payment,
        confirmation,
    ]

    useEffect(() => {
        if(property) {
            let found = properties?.find(obj => obj.name === property);
            if(found)
                setSelected(found);
        }
    },[property])

    function handleTab(val) {
        setSelected(options.find(obj => obj.value === val))
    }

    function next() {
        let curIndex = options.findIndex(obj => selected?.value === obj?.value);
        if(curIndex < options.length - 1)
            setSelected(options[curIndex + 1])
    }

    console.log(selected)
  return (
    <div className='flex flex-col gap-4 pd-md py-4 light-bg'>
        <BreadCrumb>
            <Link to='/order' >Orders</Link>
            <Link to={`/order/flight/${data?.orderId}`} >{data?.orderId}</Link>
            <Link to={`/order/flight/change/${data?.orderId}`} >Change Order</Link>
            <label>{property} Change</label>
        </BreadCrumb>
        
        <div className='flex flex-col items-center gap-4 '>
            <div className='w-[700px] max-w-full flex flex-col gap-4'>
                <div className='bg-primary/20 flex gap-4 justify-center p-4 w-full'>
                    <Tabs option={options} value={selected?.value} onChange={handleTab} 
                        config={{
                            inActiveClass: 'btn-theme-light rounded-md'
                        }}
                        />
                </div>

                {selected?.elem && React.cloneElement(selected?.elem,{callback: () => next(),property})}
            </div>
        </div>
    </div>
  )
}


function Payment() {
    return (
        <div className='flex flex-col gap-4 card p-10'>
            <div className='border rounded-md p-4 flex gap-4 justify-between'>
                <b>Change Fee</b>
                <b>{formatMoney(10000)}</b>
            </div>

            <PaymentMethod />
        </div>
    )
}

function Confirmation({property,callback}) {
    return (
        <div className='card flex flex-col gap-4'>
            <div className='flex gap-4 justify-between'>
                <h5>{property} change was successful</h5>
                <label className='success'>Completed</label>
            </div>
            <Button1 onClick={callback}>Continue</Button1>
        </div>
    )
}