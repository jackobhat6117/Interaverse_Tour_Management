import React from 'react'
import CreateFlightOrder from '../../../CreateFlightOrder'

export default function ChangeFlight({callback}) {
  return (
    <div>
        <CreateFlightOrder callback={(obj) => callback(obj)} />
    </div>
  )
}
