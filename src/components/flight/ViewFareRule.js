import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getFlightOfferPrice from "../../controllers/Flight/getOfferPrice";
import Modal1 from "../DIsplay/Modal/Modal1";


export default function ViewFareRule(data) {
  // const dispatch = useDispatch();
  // const scrollRef = createRef();
  const [open,setOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  const [curDetail,setCurDetail] = useState(data);
  const {bookingData} = useSelector(state => state.flightBooking);

  
  function handleScroll(ev) {
    // if(ev.deltaY > 0)
    //   scrollRef.current.scrollTop += 30;
    // else 
    //   scrollRef.current.scrollTop -= 30;
    
  }

  console.log('on fare rule: ',data.data)

  async function showDetail() {
    let userId = null;
    if(bookingData.as)
      userId = bookingData.as.id;

    setLoading(true);
    const res = await getFlightOfferPrice({offer: data.data},userId);
    setLoading(false);
    if(res.return) {
      console.log(' ---- ',res.data)
      // dispatch(setBookingData({...bookingData,offer: res.data,beforePrice: obj}))

      setCurDetail(res.data)
    }
  }

  function openFareRule() {
    // dispatch(setModal(true))
    // dispatch(setModalComp(modalComp));
    setOpen(true);
    if(!curDetail.fareRule)
      showDetail();
  }

  // const modalComp = (
  //   <div className='!max-h-screen realtive px-2 !w-full  py-5' onWheel={handleScroll}>
  //     <div className='bg-secondary rounded-md p-5 pt-10 relative overflow-hidden !max-h-[calc(100vh-50px)] '>
  //       <div className='btn_close' onClick={() => dispatch(setModal(false))}>X</div>
  //       <div className="flex justify-center p-4">
  //         {loading ? <div className="load"></div> : null}
  //       </div>
  //       <div dangerouslySetInnerHTML={{__html: curDetail.fareRule || (!loading && "No Fare Rules")}} className="max-h-[calc(100vh-100px)] overflow-y-auto">
  //       </div>
  //     </div>
  //   </div>
  // )
  // console.log('farerule : ',data)
  return (
    <div>
      <button onClick={openFareRule} className='py-4 text-theme1'>View fare rule</button>
      <Modal1 open={open} setOpen={setOpen}>
        <div className='bg-secondary rounded-md p-5 pt-10 relative overflow-hidden !max-h-[calc(100vh-50px)] '>
          <div className='btn_close' onClick={() => setOpen(false)}>X</div>
          <div className="flex flex-col items-center gap-4 justify-center p-4 border-theme1">
            {loading ? <div className="load"></div> : null}
            {loading ? <div className="">Please Wait</div> : null}
          </div>
          <div dangerouslySetInnerHTML={{__html: curDetail.fareRule || (!loading ? "No Fare Rules" : '')}} className="max-h-[calc(100%-20px)] overflow-y-auto">
          </div>
        </div>
      </Modal1>
    </div>
  )
}