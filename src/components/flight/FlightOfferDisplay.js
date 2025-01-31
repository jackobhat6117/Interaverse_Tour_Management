import { createRef, useEffect, useMemo, useState } from 'react';
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
import convertFlightObject from '../../features/utils/flight/flightOfferObj';
import ViewFareRule from './ViewFareRule';
import MD from '../DIsplay/Screen/MD';
import { getSupplierName } from '../../data/flight/supplier/getSupplierName';
// import { offerDataTemp } from '../../data/flight/offerData';

export default function FlightOfferDisplay({data,index,path,showDetail,select,offer}) {
  const [loading,setLoading] = useState(false);
  const [openDetail,setOpenDetail] = useState(false);
  const [openFareOptions,setOpenFareOptions] = useState(false);
  const {bookingData} = useSelector(state => state.flightBooking);

  const detailRef = createRef(null);

  const [searchParam] = useSearchParams();
  let qIndex = useMemo(() => searchParam.get('path'),[searchParam]) || 0;
  qIndex = Number(qIndex)

  const lastPath = qIndex && (offer || bookingData?.offer)?.at(-1)
  // const data = offerDataTemp;
  // data.flightData.booked_flights[1] = (flightDataTemp.flightData.booked_flights[0])
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (detailRef.current && openDetail) {
        detailRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);

    return () => {
      clearTimeout(timeoutId);
    };

    //eslint-disable-next-line
  }, [openDetail]);


  async function loadDetail(ev,data) {
    ev?.stopPropagation();

    select && select(data)
    setOpenDetail(false);
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
    select && select(convertFlightObject(obj),{fareOption: true})
  }

  const getSupplierClass = (sup) => {
    let supplier = sup?.toString()?.toLowerCase();
    let className = 'bg-blue-200 text-blue-600';
    if(supplier === 'intra1s') {
      className = 'bg-red-200 text-red-800';
    } else if(supplier === 'verteil') {
      className = 'bg-orange-200 text-orange-800';
    } else if(supplier === 'Intra1T')
      className = 'bg-gray-200 text-gray-700'
    return className
  };

  // console.log(data.passengers)
  const totalPassengers = Object.values(data?.passengers || {}).reduce((p,c) => c.total + parseInt(p),[0]) || 0

  const PriceDisplay = ({className}) => (
    <div className={'flex flex-col p-2 gap-2 justify-center items-center w-[35%] border-l border-b border-primary/10 py-4 '+className}>
      <div className='flex flex-col gap-1 items-center justify-center'>
        <h5>
          {lastPath ? ((totalPrice - (lastPath?.totalAmount || 0)) >= 0 ? '+' : '-') : null} 
          {formatMoney(Math.abs((totalPrice) - (lastPath?.totalAmount || 0)))}
        </h5>
        {data?.segments?.length > 1 ? 
          <small className='text-center'>Round trip /{totalPassengers > 0 ? ' Total ':''}Person</small>
        :null}
        <small className={'rounded-md px-2 uppercase font-bold tracking-widest '+getSupplierClass(data?.supplier)}>
          {getSupplierName(data?.supplier)}
        </small>
        {lastPath ? 
          <Button1 size='small' className='!my-2 !w-auto'>
            {index ? 'View' :'Continue'}
          </Button1>
        :null}
        {/* <p>{data?.segments[0].cabin} {data?.segments[0]?.bookingClass}</p> */}
      </div>
      {/* <p>N Seats left at this price</p> */}
      {/* <h6>
        {data?.AmadeusNG ? 'Amadeus NG' : null}
        {data?.AmadeusDXB ? 'Amadeus DXB' : null}
        {data?.Intra1TOriginal ? 'Intra1T' : null}
      </h6> */}
    </div>
  )

  return (
    <div className='bg-secondary rounded-2xl overflow-clip border border-primary/10 hover:shadow-xl shadow-primary cursor-pointer transition-all' 
      data-container={true} 
      onClick={handleOpenDetail}
    >
      <div className={`flex ${openDetail ? 'bg-[#F3F7FF]':''}`}>
        <div className='flex flex-col justify-stretch grow '>
          {
            (data?.segments || []).slice(qIndex,qIndex+1).map((obj,i) => {
              // let flight = obj.flights[0];
              return (
                <div key={i} className={`flex flex-col justify-stretch grow border-b border-[#e7e7e7] ${i===0?'border-t-0':''} `}>
                  <FlightDisplay key={i} flight={obj} body={<PriceDisplay className={'w-full border-l-0'} />} />       
                </div>
            )})
          }
        </div>
        <PriceDisplay className={'hidden sm:flex'}/>
      </div>
      <div ref={detailRef} className={` border-[#e7e7e7] ${openDetail?'block':'hidden'}`} onClick={(ev) => ev.stopPropagation()}>
        {/* <Collapse className='test'> */}
          {(data?.segments || []).slice(qIndex,qIndex+1).map((flights,i) => (
            <FlightInfoCard key={i} data={flights} label={initLoc === flights.arrivalLocation ? 'Return' : 'Depart'} />
          ))}
          {/* <ViewFareRule data={data} /> */}

        {/* </Collapse> */}
        {/* {data?.supplier} */}
        {data?.supplier === 'Intra1A' ? 
          <div className='border-t p-4 flex justify-between items-center gap-4'>
            <b className='min-w-[50px]'>Travel Smart</b>
            <MD className='flex-1'>This airline is offering additional flexibility & other fare options</MD>
            <Button1 className='!w-auto !bg-primary !text-secondary' onClick={handleBrandedFare}>View Fare Options</Button1>
          </div>
        :null}

        <div className='p-4 flex flex-wrap border-t justify-between items-center gap-4'>
          <p className='self-start'>
            From 
          </p>
          <div className='flex-1 flex flex-col mb-4'>
            <h5>{formatMoney(totalPrice)}</h5>
            <p className='flex flex-col gap-2'>{Object.entries(data?.passengers || {}).map(([label,obj],ind) => (
              <span key={ind} className='capitalize flex flex-wrap whitespace-nowrap'>
                {obj.total} {label} - {formatMoney(obj.totalAmount)}
                <span className='px-3'>Flight fare: {formatMoney(obj.totalAmountWithoutTax)}</span>
                <span>Tax: {formatMoney(obj.totalAmount - obj.totalAmountWithoutTax)}</span>
              </span>
            ))}</p>
            <ViewFareRule button={
              <small>View fare rule</small>
              // <Icon icon='flat-color-icons:rules' className='my-2 cursor-pointer' />
            } data={data} />
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
