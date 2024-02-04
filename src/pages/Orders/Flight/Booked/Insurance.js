import { useState } from "react"
import Button1 from "../../../../components/form/Button1"
import RadioGroup from "../../../../components/form/RadioGroup"
import { formatMoney } from "../../../../features/utils/formatMoney"

export default function Insurance({cancel,callback,orgi}) {
    let data = {
      passengers: [
        // {
        //   id: 1,
        //   name: {firstName: 'Chinedu'},
        //   insurance: true
        // },
        // {
        //   id: 2,
        //   name: {firstName: 'Okafor'},
        //   insurance: false
        // },
      ],
      plans: [
        {value: 1,title: 'I want disruption protection',description: 'Miles  will cover the cost of a new trip or offer an instant refund.',price: 100000},
        {value: 2,title: 'I want disruption protection',description: 'Miles  will cover the cost of a new trip or offer an instant refund.',price: 200000},
        {value: 3,title: 'I want disruption protection',description: 'Miles  will cover the cost of a new trip or offer an instant refund.',price: 300000},
      ]
    }
    if(orgi) {
      if(orgi.passengers)
        data.passengers = orgi.passengers?.map(obj => ({insurance:false,...obj}))
    }
    const [selectedPlan,setSelectedPlan] = useState();
    const [selectedPassengers,setSelectedPassengers] = useState([]);

    function handleSubmit() {
      callback && callback({data,selectedPlan})
    }
    return (
      <div className='flex flex-col gap-6 card p-6 max-w-[600px]'>
        <h5>Add Insurance / Protection</h5>
        <div>
          <p>Select Passenger</p>
          {data?.passengers?.map((obj,i) => 
            <div className='flex justify-between gap-4'>
              {obj?.name?.firstName} {obj?.name?.lastName}
              {selectedPassengers?.includes(obj?.id) ? 
                <button onClick={() => setSelectedPassengers(prev => prev.filter(val => val !== obj?.id))}>Remove</button>
              :
                <button onClick={() => setSelectedPassengers(prev => [...prev,obj?.id])}>Add</button>
              }
            </div>
          )}
        </div>
        <h5>Select a plan</h5>
        <RadioGroup radioClass='!items-start' className='flex flex-col gap-3' options={data?.plans} render={(obj) => (
          <div className='flex'>
            <div className='flex flex-col gap-1'>
              <h5>{obj.title}</h5>
              <p>{obj.description}</p>
            </div>
            <div>
              <b>{formatMoney(obj?.price)}</b>
            </div>
          </div>
        )} 
          value={selectedPlan}
          onChange={(val) => {setSelectedPlan(val); console.log('selected',val)}}
        />
  
        <div className='flex gap-4'>
          {cancel ? 
            <button className='px-4' onClick={cancel}>Cancel</button>
          :null}
          <Button1 onClick={handleSubmit}>Confirm</Button1>
        </div>
      </div>
    )
  }
  