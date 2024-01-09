import { useMemo, useState } from 'react';
import FlightDisplay from './FlightDisplay';
import FlightInfoCard from './FlightInfoCard';
import { formatMoney } from '../../features/utils/formatMoney';
import { def } from '../../config';
import Button1 from '../form/Button1';
import Modal1 from '../DIsplay/Modal/Modal1';
import FareOptions from './FareOptions';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Icon from '../HOC/Icon';
// import { offerDataTemp } from '../../data/flight/offerData';

export default function FlightOfferDisplay({data,path,showDetail,select,offer}) {
  const [loading,setLoading] = useState(false);
  const [openDetail,setOpenDetail] = useState(false);
  const [openFareOptions,setOpenFareOptions] = useState(false);
  const {bookingData} = useSelector(state => state.flightBooking);

  const [searchParam] = useSearchParams();
  let qIndex = useMemo(() => searchParam.get('path'),[searchParam]) || 0;
  qIndex = Number(qIndex)

  const lastPath = (offer || bookingData?.offer)?.at(-1)
  // const data = offerDataTemp;
  // data.flightData.booked_flights[1] = (flightDataTemp.flightData.booked_flights[0])
  async function loadDetail(ev,data) {
    ev?.stopPropagation();

    select && select(data)
    setOpenFareOptions(false);
    setLoading(true);
    // await showDetail(data)
    setLoading(false);
  }

  function handleOpenDetail(ev) {
    console.log(' ---> ',data)
    ev?.preventDefault();
    ev?.stopPropagation();

    setOpenDetail(!openDetail)
    setOpenFareOptions(false);


    return true;
  }

  async function handleBrandedFare(ev) {
    ev?.stopPropagation();
    setOpenFareOptions(true)
  }

  let initLoc = "";
  try {
    initLoc = data?.segments[0].departureLocation || "";
  } catch(ex) {
    
  }

  let totalPrice = data?.farePrice?.fareTotal;
  // let totalPrice = (data?.farePrice && formatMoney(data?.farePrice.fareTotal)) || data?.formatedTotalAmount;
  // bookingData?.offer?.at(path)?.farePrice?.fareTotal

  function handleFareSelect(obj) {
    setOpenDetail(false);
    setOpenFareOptions(false);
    select && select(obj)
  }

  const getSupplierClass = (sup) => {
    let supplier = sup?.toString()?.toLowerCase();
    let className = 'bg-blue-200 text-blue-600';
    if(supplier === 'sabre') {
      className = 'bg-red-200 text-red-800';
    } else if(supplier === 'verteil') {
      className = 'bg-orange-200 text-orange-800';
    } else if(supplier === 'travelport')
      className = 'bg-gray-200 text-gray-700'
    return className
  };

  console.log(data.passengers)

  return (
    <div className='bg-secondary rounded-2xl overflow-clip border border-primary/10 hover:shadow-xl shadow-primary cursor-pointer transition-all' data-container={true} onClick={handleOpenDetail}>
      <div className={`flex ${openDetail ? 'bg-[#F3F7FF]':''}`}>
        <div className='flex flex-col justify-stretch grow '>
          {
            (data?.segments || []).slice(qIndex,qIndex+1).map((obj,i) => {
              // let flight = obj.flights[0];
              return (
                <div key={i} className={`flex flex-col justify-stretch grow border-b border-[#e7e7e7] ${i===0?'border-t-0':''} `}>
                  <FlightDisplay key={i} flight={obj} />       
                </div>
            )})
          }
        </div>
        <div className='flex flex-col p-2 gap-2 justify-center items-center w-[35%] border-l border-b border-primary/10 py-4'>
          <div className='flex flex-col gap-1 items-center justify-center'>
            <h5>
              {lastPath ? ((totalPrice - (lastPath?.totalAmount || 0)) >= 0 ? '+' : '-') : null} 
              {formatMoney(Math.abs((totalPrice) - (lastPath?.totalAmount || 0)))}
            </h5>
            {data?.segments?.length > 1 ? 
              <small>Round trip per traveller</small>
            :null}
            <small className={'rounded-md px-2 uppercase font-bold tracking-widest '+getSupplierClass(data?.supplier)}>
              {data?.supplier}
            </small>
            {/* <p>{data?.segments[0].cabin} {data?.segments[0]?.bookingClass}</p> */}
          </div>
          {/* <p>N Seats left at this price</p> */}
          {/* <h6>
            {data?.AmadeusNG ? 'Amadeus NG' : null}
            {data?.AmadeusDXB ? 'Amadeus DXB' : null}
            {data?.travelPortOriginal ? 'Travelport' : null}
          </h6> */}
        </div>
      </div>
      <div className={` border-[#e7e7e7] ${openDetail?'block':'hidden'}`} onClick={(ev) => ev.stopPropagation()}>
        {/* <Collapse className='test'> */}
          {(data?.segments || []).slice(qIndex,qIndex+1).map((flights,i) => (
            <FlightInfoCard key={i} data={flights} label={initLoc === flights.arrivalLocation ? 'Return' : 'Depart'} />
          ))}
          {/* <ViewFareRule data={data} /> */}

        {/* </Collapse> */}
        {/* {data?.supplier} */}
        {data?.supplier === 'Amadeus' ? 
          <div className='border-t p-4 flex justify-between items-center gap-4'>
            <b className='min-w-[50px]'>Travel Smart</b>
            <div className='flex-1'>This ariline is offering additional flexibility & other fare options</div>
            <Button1 className='!w-auto !bg-primary !text-secondary' onClick={handleBrandedFare}>View Fare Options</Button1>
          </div>
        :null}

        <div className='p-4 flex border-t justify-between items-center gap-4'>
          <p className='self-start'>
            From 
          </p>
          <div className='flex-1 flex flex-col mb-4'>
            <h5>{formatMoney(totalPrice)}</h5>
            <p>{Object.entries(data?.passengers || {}).map(([label,obj],ind) => (
              <span key={ind} className='capitalize flex gap-4 flex-wrap'>
                {obj.total} {label} - {formatMoney(obj.totalAmount)}
                <span>Flight fare: {formatMoney(obj.totalAmountWithoutTax)}</span>
                <span>Tax: {formatMoney(obj.totalAmount - obj.totalAmountWithoutTax)}</span>
              </span>
            ))}</p>
            {/* <p>1 Adult - {def.currency}50,000, 1 Child - {def.currency}10,000, 1 Infant - {def.currency}5,000 </p> */}
          </div>
          <Button1 loading={loading} className='btn1 !w-auto flex items-center gap-2 sm:!min-w-[140px]' onClick={(ev) => loadDetail(ev,data)}>
            Select
          </Button1>
        </div>
      </div>

      <Modal1 open={openFareOptions} setOpen={setOpenFareOptions}>
        <FareOptions data={openFareOptions && data} handleReturn={handleFareSelect}/>
      </Modal1>
    </div>
  )
}
