import React, { useState } from 'react'
import updateBooking from '../../../../../../controllers/booking/updateBooking';
import ConfirmChangeModal from './ConfirmChangeModal';
import FlightInfo from '../../FlightInfo';
import { formatMoney } from '../../../../../../features/utils/formatMoney';
import FlightInfoCard from '../../../../../../components/flight/FlightInfoCard';
import Button1 from '../../../../../../components/form/Button1';


export default function ConfirmFlightOfferChange({page,back,orgi,prevResult:selected,callback}) {
  let priceData = {
    before: {
      totalAmount: orgi?.orderDetail?.pricing?.offers?.at(0)?.farePrice?.fareTotal,
    },
    after: {
      totalAmount: selected?.totalAmount
    },
    totalAmount: selected?.totalAmount,
    fee: 0,
  }
  const pnr = orgi?.booking?.flightBooking?.at(0)?.pnr;
  const [open,setOpen] = useState(false);
  const [dataView,setDataView] = useState('new');
  const [loading,setLoading] = useState(false);


  async function handleSubmit() {
    const reqData = {
      supplier: selected.supplier,
      offers: [selected]
    }
    setLoading(true);
    const res = await updateBooking(pnr,reqData)
    setLoading(false);
    // dispatch(setBookingData({...bookingData,orderChange: data}));
    callback && callback(res);
  }

  console.log(orgi,selected)
  // const view = dataView === 'new' ? selected : orgi;

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4 items-center flex-wrap'>
        <div className='flex-1 flex gap-4'>
          <button className={`${dataView === 'new' ? 'btn':'btn-light'}`}
            onClick={() => setDataView('new')}
          >New Details</button>
          <button className={`${dataView !== 'new' ? 'btn':'btn-light'}`}
            onClick={() => setDataView('orgi')}
          >Previous Details</button>
        </div>
        <span className='warn border-rounded text-sm'>Changes Detected</span>
      </div>
      {dataView === 'new' ? 
        selected?.segments?.map((flights,i) => (
          <FlightInfoCard key={i} data={flights} />
        ))
      :
        <FlightInfo data={orgi} />
      }
      <PriceSummary data={priceData} />

      <div className='flex gap-4'>
          <button className='px-6 whitespace-nowrap' onClick={() => back && back()}>Go back</button>
          <Button1 onClick={() => setOpen(true)}>Confirm</Button1>
        </div>

      <ConfirmChangeModal loading={loading} callback={handleSubmit} open={open} setOpen={setOpen} />

    </div>
  )
}


function PriceSummary({data}) {
  return (
    <div className='border p-4 flex flex-col gap-6 md:min-w-[400px]'>
      <div className='flex justify-between gap-4'>
        <h5>Price Summary</h5>
        <p className='text-xs'>Sold by Turkish Airline</p>
      </div>
      <hr />
        <div className=' flex flex-col gap-2'>
          <div className='flex gap-4 justify-between font-bold'>
            <b>Before Change Amount</b>
            <div>{formatMoney(data?.before?.totalAmount)}</div>
          </div>
          <div className='flex gap-4 justify-between'>
            <div>After Change Amount</div>
            <div>{formatMoney(data?.after?.totalAmount)}</div>
          </div>
          <p className='py-2'>
            The changes you have carried out has a fee of <h6 className='inline-block'>{formatMoney(data.fee)}</h6>
          </p>
        </div>
      <hr />
      <div className='flex gap-4 justify-between'>
        <h5>Total pyament:</h5>
        <h5>{formatMoney(data?.totalAmount)}</h5>
      </div>
    </div>
  )
}