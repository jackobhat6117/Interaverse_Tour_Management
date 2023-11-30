import { useState } from 'react';
import FlightDisplay from './FlightDisplay';
import FlightInfoCard from './FlightInfoCard';
import { formatMoney } from '../../features/utils/formatMoney';
import { def } from '../../config';
import Button1 from '../form/Button1';
import Modal1 from '../DIsplay/Modal/Modal1';
import FareOptions from './FareOptions';
import { useSelector } from 'react-redux';
// import { offerDataTemp } from '../../data/flight/offerData';

export default function FlightOfferDisplay({data,path,showDetail,select}) {
  const [loading,setLoading] = useState(false);
  const [openDetail,setOpenDetail] = useState(false);
  const [openFareOptions,setOpenFareOptions] = useState(false);
  const {bookingData} = useSelector(state => state.flightBooking);
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

  let totalPrice = (data?.farePrice && formatMoney(data?.farePrice.fareTotal)) || data?.formatedTotalAmount;
  // bookingData?.offer?.at(path)?.farePrice?.fareTotal

  function handleFareSelect(obj) {
    setOpenDetail(false);
    setOpenFareOptions(false);
    select && select(obj)
  }

  return (
    <div className='bg-secondary rounded-2xl overflow-clip border border-primary/10 hover:shadow-xl shadow-primary cursor-pointer transition-all' data-container={true} onClick={handleOpenDetail}>
      <div className='flex'>
        <div className='flex flex-col justify-stretch grow '>
          {
            (data?.segments || []).slice(0,1).map((obj,i) => {
              // let flight = obj.flights[0];
              return (
                <div key={i} className={`flex flex-col justify-stretch grow border-b border-[#e7e7e7] ${i===0?'border-t-0':''} `}>
                  <FlightDisplay key={i} flight={obj} />
                </div>
            )})
          }
          {/* <Icon icon={'bxs:down-arrow'} className='p-1 mx-6 mb-2' /> */}
        </div>
        <div className='flex flex-col p-2 gap-2 justify-center items-center w-[35%] border-l border-b border-primary/10 py-4'>
          <div className='flex flex-col items-center justify-center'>
            <h5>{totalPrice}</h5>
            {data?.segments?.length > 1 ? 
              <small>Round trip per traveller</small>
            :null}
            {/* {data?.formatedTotalAmount} */}
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
          {(data?.segments || []).slice(0,1).map((flights,i) => (
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
          <div className='flex-1 flex flex-col '>
            <h5>{totalPrice}</h5>
            <p>{Object.entries(data?.passengers).map(([label,obj],ind) => (
              <span key={ind} className='capitalize'>
                {obj.total} {label} - {formatMoney(obj.totalAmount)}
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
