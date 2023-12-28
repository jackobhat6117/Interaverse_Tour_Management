import React, { useState } from 'react'
import AddFlightBaggage from '../../../../../../components/flight/Baggage'
import ContentInfo from '../../../../../../components/DIsplay/ContentInfo'
import SelectInput from '../../../../../../components/form/SelectInput'
import { MenuItem } from '@mui/material'
import { formatMoney } from '../../../../../../features/utils/formatMoney'
import ConfirmChangeModal from './ConfirmChangeModal'
import Button1 from '../../../../../../components/form/Button1'


export default function ChangeBagConfirm({callback}) {
  const data = {
    passengers: [
      {firstName: 'John',lastName: 'Doe',id: 1},
      {firstName: 'John',lastName: 'Doe',id: 2},
    ]
  }
  const [open,setOpen] = useState(false);

  function handleSubmit() {
    callback && callback();
  }

  const BagInfo = ({label,obj}) => (
    <div className={'flex gap-4 justify-between items-center p-2 px-4 rounded-sm '+(obj.change?'bg-orange-200':'light-bg')}>
      <div className='flex flex-col gap-1'>
        <p>{label}</p>
        <b>{obj.detail}</b>
      </div>
      <b>{formatMoney(obj.price)}</b>
    </div>
  )
  return (
    <div className='flex flex-col gap-6'>
      <ContentInfo>
        Adding extra bags to order comes with an additional fee
      </ContentInfo>
      <SelectInput select label='Select passenger'>
        {data?.passengers?.map((obj,i) => (
            <MenuItem value={obj?.id}>{obj?.firstName} {obj?.lastName}</MenuItem>
        ))}
      </SelectInput>

      <div className='flex flex-col gap-4'>
        <div className='flex gap-4 justify-between'>
          <h5>Bag change details</h5>
          <small className='warn'>Changes detected</small>
        </div>
        <BagInfo label='Old Selection' obj={{price: 40000,detail: '2 checked bags 23kg'}} />
        <BagInfo label='New Selection' obj={{price: 40000,detail: '1 checked bag 23kg',change: true}} />
      </div>

      <div className='flex gap-4'>
        <button className='px-6'>Cancel</button>
        <Button1 onClick={() => setOpen(true)}>Confirm</Button1>
      </div>

      <ConfirmChangeModal callback={handleSubmit} open={open} setOpen={setOpen} />

    </div>
  )
}
