import React from 'react'
import AddFlightBaggage from '../../../../../../components/flight/Baggage'
import ContentInfo from '../../../../../../components/DIsplay/ContentInfo'


export default function ChangeBag({callback}) {
  return (
    <div className='flex flex-col gap-6'>
      <ContentInfo>
        Adding extra bags to order comes with an additional fee
      </ContentInfo>
      <AddFlightBaggage />
    </div>
  )
}
