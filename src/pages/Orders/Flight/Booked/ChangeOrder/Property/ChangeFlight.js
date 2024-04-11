import React from 'react'
import CreateFlightOrder from '../../../CreateFlightOrder'

export default function ChangeFlight({callback}) {
  return (
    <div>
        <CreateFlightOrder 
          config={{hide: ['location']}}
          // defaultData={{from: 'LOS', to: 'LHR'}}
          callback={(obj) => callback && callback(obj)} />
    </div>
  )
}
