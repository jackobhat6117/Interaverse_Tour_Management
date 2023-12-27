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
import PassengerView from './ViewChange/Passenger';
import FlightView from './ViewChange/Flight';


const properties = [
    {name: 'unkProp',value: '???'},
    {name: 'passenger',value: 'Passenger',elem: <ChangePassenger />,view: <PassengerView />},
    {name: 'class',value: 'Change flight date',elem: <ChangeFlight />,view: <FlightView />},
    {name: 'class',value: 'Select flight',elem: <ChangeFlightOffer />},
    {name: 'flight',value: 'Change flight date',elem: <ChangeFlight />},
    {name: 'flight',value: 'Select flight',elem: <ChangeFlightOffer />},
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

    function back() {
        setSelected(options[Math.min(0,1)])
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
            <div className='w-[750px] max-w-full flex flex-col gap-4'>
                <div className='bg-primary/20 flex gap-4 justify-center p-4 w-full'>
                    <Tabs option={options} value={selected?.value} onChange={handleTab} 
                        config={{
                            inActiveClass: 'btn-theme-light rounded-md'
                        }}
                        />
                </div>

                {selected?.elem && React.cloneElement(selected?.elem,{callback: () => next(),back,property,pageObj:props[0]})}
            </div>
        </div>
    </div>
  )
}


function Payment({pageObj}) {
    return (
        <div className='flex flex-col gap-4 card p-10'>
            {/* {pageObj?.view ? React.cloneElement(pageObj?.view,{data: pageObj}) : null} */}
            {pageObj.view && React.cloneElement(pageObj.view,{page: 'payment'})}
            
            <div className='border rounded-md p-4 flex gap-4 justify-between'>
                <b>Change Fee</b>
                <b>{formatMoney(10000)}</b>
            </div>

            <PaymentMethod />
        </div>
    )
}

function Confirmation({property,callback,pageObj}) {
    console.log(' -> ',pageObj)
    return Math.random()*2 > 1 ? (
        <div className='card flex flex-col gap-8'>
            <div className='flex gap-4 justify-between'>
                <h5><span className='capitalize'>{property}</span> change was successful</h5>
                <label className='success'>Completed</label>
            </div>
            {pageObj.view && React.cloneElement(pageObj.view,{page: 'confirmation'})}

            <Button1 onClick={callback}>Continue</Button1>
        </div>
    ) : (
        <div className='card flex flex-col gap-6'>
            <div className='flex gap-4 justify-between'>
                <h5>Change unsuccessful</h5>
                <label className='error'>Failed</label>
            </div>

            <p>
                The requested change was not successful but not to worry our team will take additional steps to complete the change.
            </p>

            <Button1 onClick={callback}>Notify us about this error</Button1>
        </div>
    )
}