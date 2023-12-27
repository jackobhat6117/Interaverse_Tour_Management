import { Email, Flight } from "@mui/icons-material";
import FlightInfoCard from "./FlightInfoCard";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { def } from "../../config";
import { formatMoney } from "../../features/utils/formatMoney";
import { getCurrencySymbol } from "../../features/utils/currency";
import ViewFareRule from "./ViewFareRule";
import EmailInput from "../form/EmailInput";
import { decrypt } from "../../features/utils/crypto";
import { shareFlightOffer } from "../../controllers/Flight/shareFlightOffer";
import Modal1 from "../DIsplay/Modal/Modal1";
// import { encrypt } from "../../features/utils/crypto";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { setBookingData } from "../../redux/reducers/flight/flightBookingSlice";
// import { offerDataTemp } from "../../data/flight/offerData";

export function   FlightOfferDetail({obj,onBook}) {
  const [searchParam] = useSearchParams();
  const q = searchParam.get('q');
  const {bookingData} = useSelector(state => state.flightBooking);
  
  let refQuery = searchParam.get('referralCode');
  
  const [openShare,setOpenShare] = useState(false);
  const [shareData,setShareData] = useState({offerLink: '', origin: '', destination: '', email: ''})
  const [shareLoading,setShareLoading] = useState(false);

  if(refQuery)
    refQuery = `?referralCode=${refQuery}`

  let initLoc = "";
  try {
    initLoc = obj.segments[0].departureLocation || "";
  } catch(ex) {
    
  }
  const data = obj;
  // const enc = encrypt(JSON.stringify({offer: obj}));
  // window.localStorage.setItem("offerDetail",enc);

  async function shareFlight() {
    let reqData = {...shareData};
    // let {fareRule,...modObj} = obj;
    let req = JSON.parse(decrypt(q));
    reqData.origin = req?.destinations[0]?.departureLocation || "";
    reqData.destination = req?.destinations[0]?.arrivalLocation || "";
    let offer = bookingData.beforePrice || bookingData.offer;
    reqData.offerLink = `https://www.btmholidays.com/booking?trip=${JSON.stringify({offer,passengers: offer.passengers})}&guest=true&search=${JSON.stringify(req)}`
    // reqData.offerLink = path.site+`/flights/book/${q}${refQuery?refQuery:''}`
    // totalAmount: modObj.farePrice.fareTotal,formatedTotalAmount: modObj.totalAmount

    // if(!reqData.email) 
    //   return dispatch(setAlertMsg(['error','Email is required']))

    setShareLoading(true);
    const res = await shareFlightOffer(reqData);
    setShareLoading(false);
    if(res.return) {
      // dispatch(setAlertMsg(['success','Link sent to email']))
      setOpenShare(false);
    } 
    // else dispatch(setAlertMsg(['error',res.msg]))
  }
  
  return !obj ? null : (
    <div className='bg-secondary p-6 min-h-screen self-end sticky bottom-0 overflow-clip rounded-2xl'>
      <div className='flex flex-col py-2 items-center gap-3'>
        <div className="flex self-end  justifiy-end">
          {/* <Share className='cursor-pointer' onClick={() => setOpenShare(true)} /> */}
          <Email className='cursor-pointer' onClick={() => setOpenShare(true)} />
          <Modal1 open={openShare} setOpen={setOpenShare}>
            <div className='bg-secondary rounded-md flex flex-col gap-3 p-5 pt-10 relative overflow-hidden !max-h-[calc(100vh-50px)] '>
              <div className='btn_close' onClick={() => setOpenShare(false)}>X</div>
              <h3>Share flight offer</h3>
              <EmailInput value={shareData.email} required
                onChange={(email) => setShareData({...shareData,email})} />
              <button className='flex gap-2 btn2' onClick={shareFlight} disabled={shareLoading}>
                {shareLoading?<div className="load"></div>:null}
                Send link to email
              </button>
            </div>
          </Modal1>
        </div>
        <div className='flex gap-3'>
          <h5>
            {data.segments[0].flights[0].departureLocation}
          </h5>
          <div className='mr' /><Flight className='rotate-90' /><div className='mr' />
          <h5>
            {data.segments[0].flights[0].arrivalLocation}
          </h5>
        </div>
        {
          onBook === true ? (
            bookingData && bookingData.orderData ? (
              <h4 className='text-theme1 text-center'>{def.currency}{formatMoney(bookingData.orderData.editedtotalPrice)}</h4>
            ) : (
              <h4 className='text-theme1 text-center'>{def.currency}{(data.farePrice?.fareTotal && formatMoney(data.farePrice.fareTotal)) || data.formatedTotalAmount}</h4>
            )
          ) : (
            <h4 className='text-theme1 text-center'>{def.currency}{(data.farePrice?.fareTotal && formatMoney(data.farePrice.fareTotal)) || data.formatedTotalAmount}</h4>
          )
        }
        {bookingData.offer && bookingData.offer.passengers && Object.entries(bookingData.offer.passengers).map(([key,obj],i) => 
          <div className="flex gap-4 justify-between w-full" key={i}>
            <span className="capitalize">{obj?.total ? obj.total+'x ':''}{key}</span>
            {/* <span>{Object.keys(bookingData.offer.passengers).length}x Passenger</span> */}
            <span>
              {def.currency}
              {
                formatMoney(obj.baseAmount || obj.totalAmount)
                // formatMoney(Object.values(bookingData.offer.passengers).map((val) => val.totalAmount).reduce((prev,cur) => prev + cur,0))
              }
            </span>
          </div>
        )}
        {bookingData?.offer?.farePrice?.appliedRules?.map((obj,i) => (
          obj?.rule?.fareRuleType ? (
            <div className='flex gap-4 justify-between w-full'>
              Service charge
              <span>
                {def.currency}{formatMoney(obj?.rule?.markUp)}
              </span>
            </div>
          ) :null
        ))}
        {bookingData?.offer?.taxAmount && (
          <div className="flex gap-4 justify-between w-full">
            Tax
            <span>
              {def.currency}{formatMoney(bookingData?.offer?.taxAmount?.replace(',',''))}
            </span>
          </div>
        )}
        {bookingData.seats && bookingData.seats.length ? (
          <div className="flex gap-4 justify-between w-full">
            <span>{bookingData.seats.length}x seating</span>
            <span>{getCurrencySymbol(bookingData.seats[0].pricingDetail.currency)}{bookingData.seats.map(seat => seat.pricingDetail.fareAmount).reduce((total, fare) => total + fare, 0)}</span>
            {/* <span>{getCurrencySymbol(data.pricingDetail.currency)}{data.pricingDetail.amount}</span> */}
          </div>
        ):null}
        {bookingData.services && (
          <div className="flex gap-4 justify-between w-full">
            <span>Service</span>
            <span>{def.currency}{formatMoney(bookingData?.services?.selectedUpgrade?.price)}</span>
          </div>
        )}
        {bookingData.insurance && (
          <div className="flex gap-4 justify-between w-full">
            <span>Insurance</span>
            <span>{getCurrencySymbol(bookingData.insurance.insuranceAPIData.insuranceApiData[0].currency)||""}{formatMoney(bookingData.insurance.insuranceAPIData.insuranceApiData[0].fareAmount)}</span>
          </div>
        )}
        <hr className=" w-full" />
        {data.segments.map((flights,i) => (
          <FlightInfoCard key={i} data={flights} label={initLoc === flights.arrivalLocation ? 'Return' : 'Departure'} />
        ))}
        {/* {data.segments[1] ? (
          <FlightInfoCard data={data.segments[1]} label='Return' />
        ):null} */}
        {/* <Link to="#" onClick={} className='py-4 text-theme1'>View fare rule</Link> */}
        <ViewFareRule data={data} />
        {onBook ? null :
          <Link to={`/flights/book/${q}${refQuery?refQuery:''}`} className='btn2 text-center w-full'>Book</Link>
          // data.fareRule ? 
          // (
          // ) 
          // : (
          //   <button disabled className='btn btn_nofocus justify-center cursor-not-allowed text-center w-full flex gap-2'>
          //     {/* <div className="load"></div> */}
          //     Book</button>
          // )
        }
        
      </div>
    </div>
  )
}

// function ViewFareRule(data) {
//   const dispatch = useDispatch();
//   const scrollRef = createRef();
  
//   function handleScroll(ev) {
//     // if(ev.deltaY > 0)
//     //   scrollRef.current.scrollTop += 30;
//     // else 
//     //   scrollRef.current.scrollTop -= 30;
    
//   }

//   function openFareRule() {
//     dispatch(setModal(true))
//     dispatch(setModalComp(modalComp));
//   }

//   const modalComp = (
//     <div ref={scrollRef} className='!max-h-screen realtive px-2 !w-full  py-5' onWheel={handleScroll}>
//       <div className='bg-secondary rounded-md p-5 pt-10 relative overflow-hidden !max-h-[calc(100vh-50px)] '>
//         <div className='btn_close' onClick={() => dispatch(setModal(false))}>X</div>
//         <div dangerouslySetInnerHTML={{__html: data.data || "No Fare Rules"}} className="max-h-[calc(100vh-100px)] overflow-y-auto">
//         </div>
//       </div>
//     </div>
//   )
//   return data.data && (
//     <div>
//       <button onClick={openFareRule} className='py-4 text-theme1'>View fare rule</button>
//     </div>
//   )
// }