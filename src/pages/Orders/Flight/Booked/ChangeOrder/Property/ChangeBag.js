import React from 'react'
import AddFlightBaggage from '../../../../../../components/flight/Baggage'


export default function ChangeBag({callback}) {
  return (
    <div className='card p-10 flex flex-col gap-6'>
        <AddFlightBaggage />
    </div>
  )
}
