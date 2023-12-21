import Button1 from "../../../../components/form/Button1"
import RadioGroup from "../../../../components/form/RadioGroup"
import { formatMoney } from "../../../../features/utils/formatMoney"

export default function Insurance({cancel}) {
    let data = {
      passengers: [
        {name: 'Chinedu',insurance: true},
        {name: 'Okafor',insurance: false},
      ],
      plans: [
        {title: 'I want diruption protection',description: 'Miles  will cover the cost of a new trip or offer an instant refund.',price: 100000},
        {title: 'I want diruption protection',description: 'Miles  will cover the cost of a new trip or offer an instant refund.',price: 200000},
        {title: 'I want diruption protection',description: 'Miles  will cover the cost of a new trip or offer an instant refund.',price: 300000},
      ]
    }
    return (
      <div className='flex flex-col gap-6 card p-6 max-w-[600px]'>
        <h5>Add Insurance / Protection</h5>
        <div>
          <p>Select Passenger</p>
          {data?.passengers?.map((obj,i) => 
            <div className='flex justify-between gap-4'>
              {obj.name}
              {obj?.insurance ? 
                <button>Remove</button>
              :
                <button>Add</button>
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
        )} />
  
        <div className='flex gap-4'>
          {cancel ? 
            <button className='px-4' onClick={cancel}>Cancel</button>
          :null}
          <Button1>Confirm</Button1>
        </div>
      </div>
    )
  }
  