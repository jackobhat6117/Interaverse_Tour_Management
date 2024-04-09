import React from 'react'
import AddFlightBaggage from '../../../../../../components/flight/Baggage'
import ContentInfo from '../../../../../../components/DIsplay/ContentInfo'
import convertFlightObject from '../../../../../../features/utils/flight/flightOfferObj'
import { clone } from '../../../../../../features/utils/objClone'


export default function ChangeBag({callback,orgi}) {
  const convertedData = convertFlightObject(clone(orgi?.orderDetail?.offers?.at(0)) || {})

  const data = {
    passengers: orgi?.orderDetail?.travelers,
    flights: convertedData?.directions?.flat()
  }

  return (
    <div className='flex flex-col gap-6'>
      <ContentInfo>
        Adding extra bags to order comes with an additional fee
      </ContentInfo>
      <AddFlightBaggage data={data} />
    </div>
  )
}
