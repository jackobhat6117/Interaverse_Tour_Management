import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/DIsplay/Nav/BreadCrumb";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { decrypt } from "../../../../features/utils/crypto";
import { useDispatch, useSelector } from "react-redux";
import FlightPriceSummary from "../../../../components/flight/FlightPriceSummary";
import FlightSegmentDisplay from "../../../../components/flight/FlightSegmentDisplay";
import RadioGroup from "../../../../components/form/RadioGroup";
import Icon from "../../../../components/HOC/Icon";
import EmailInput from "../../../../components/form/EmailInput";
import PhoneNumberInput from "../../../../components/form/PhoneNumberInput";
import PrimaryPassenger, { validateAge } from "../../../../components/flight/PrimaryPassenger";
import Button1 from "../../../../components/form/Button1";
import Modal1 from "../../../../components/DIsplay/Modal/Modal1";
import { travelersInfo } from "../../../../data/flight/travelersInfo";
import { setBookingData } from "../../../../redux/reducers/flight/flightBookingSlice";
import { useSnackbar } from "notistack";
import { countries } from "country-data";
import { clone } from "../../../../features/utils/objClone";
import moment from "moment";
import bookFlightOffer from "../../../../controllers/Flight/bookFlightOffer";
import ContentInfo from "../../../../components/DIsplay/ContentInfo";
import CheckedBags from "../../../../components/flight/CheckedBags";
import SeatSelection from "./SeatSelection";
import ExpandWrapper from "../../../../components/DIsplay/ExpandWrapper";
import { def } from "../../../../config";
import getFlightOfferPrice from "../../../../controllers/Flight/getOfferPrice";
import convertFlightObject from "../../../../features/utils/flight/flightOfferObj";
import PriceTimeout from "../../../../components/flight/PriceTimeout";
import LoadingBar from "../../../../components/animation/LoadingBar";
import { getTestLevel } from "../../../../utils/testLevel";
import { formatMoney, getNumber } from "../../../../features/utils/formatMoney";
import getAccountById from "../../../../controllers/user/getAccountById";


export default function FlightBookDetails() {
  const { id } = useParams();
  const qObj = JSON.parse(decrypt(id));
  const { bookingData } = useSelector((state) => state.flightBooking);
  const offer = bookingData?.offersPrice?.at(-1) || bookingData?.offers?.at(-1);
  const [bagsPrice,setBagsPrice] = useState();
  const [seatsPrice,setSeatsPrice] = useState();
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  function handleSearchRoute(i) {
    navigate("/order/new/flight/offers?q=" + id + "&path=" + i);
  }

  async function getPrice() {
    const length = (qObj?.originDestinations?.length)
    let flightOffers = clone(bookingData.offer?.at((length)-1)?.og || bookingData.offer?.at((length)-1))
    // bookingData.offer?.slice(0,length)?.map((obj,i) => {
    //   try {
    //     flightOffers.directions[i] = obj.directions[i];
    //     // flightOffers.segments[i] = obj.segments[i];
    //   } catch(ex) {console.log(ex)}
    //   return true;
    // })
    // flightOffers.segments = null;
    // flightOffers.fareRules = null;

    // .map(obj => {
    //   let temp = clone(obj);
    //   // temp.directions = [temp.directions[0]]
    //   return temp
    // })
    const req = {
      supplier: flightOffers?.supplier,
      offers: [flightOffers]
    }
    if(qObj.adjustment)
      req['adjustment'] = qObj.adjustment;

    setLoading(true);
    const res = await getFlightOfferPrice(req);
    setLoading(false);
    if(res.return) {
      let data = (res.data.data?.map(obj => convertFlightObject(obj)) || [])
      dispatch(setBookingData({...bookingData,offersPrice: data,time: new Date().getTime()}))
    }
  }


  // function handlePayTime(val) {
  //   dispatch(setBookingData({ ...bookingData, payTime: val }));
  // }

  return loading ? 
    <div className="flex-1 flex justify-center items-center">
      <LoadingBar  />
    </div>
  : (
    <div className="pd-md py-4 flex flex-col gap-4">
      <PriceTimeout callback={() => getPrice()} />

      <div className="whitespace-nowrap overflow-x-auto max-w-full pb-2">
        <BreadCrumb>
          <Link to={"/order"}>Orders</Link>
          <Link to="/order/new/flight">New order</Link>
          {qObj?.destinations?.map((obj, i) => {
            return (
              <div
                onClick={() => handleSearchRoute(i)}
                className="cursor-pointer"
              >
                {obj.departureLocation} to {obj.arrivalLocation}
              </div>
            );
          })}
          <Link to={`/order/new/flight/book/${id}`}>Review</Link>
          <b>Details</b>
        </BreadCrumb>
      </div>
      {}
      <div className="flex gap-10 flex-wrap-reverse ">
        <div className="flex flex-col gap-6 flex-[2] max-w-full">
          {/* <PayTime callback={(val) => handlePayTime(val)} /> */}
          <ContentInfo icon={<Icon icon={"ic:sharp-lock"} className="w-7 h-7" />}>
            We take privacy issues seriously. You can be sure that your personal
            data is securely protected.
          </ContentInfo>

          <PassengerDetails offer={offer} setBagsPrice={setBagsPrice} setSeatsPrice={setSeatsPrice} getPrice={getPrice} />
        </div>
        <div className="flex flex-col gap-4 flex-1">
          {offer?.segments?.map((obj, i) => (
            <div key={i} className="w-full">
              <FlightSegmentDisplay changeRoute={() => handleSearchRoute(i)} data={obj} />
            </div>
          ))}
          <div className="sticky top-5">
            <FlightPriceSummary onBook data={{...offer,bagsPrice,seatsPrice}} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PassengerDetails({ offer, setBagsPrice, setSeatsPrice, getPrice }) {
  const { id } = useParams();
  const qObj = JSON.parse(decrypt(id));
  const { bookingData } = useSelector((state) => state.flightBooking);
  const {user} = useSelector(state => state.user.userData);
  const segments = bookingData?.offer?.at(-1)?.segments || [];
  const [rareChanceHappend,setRareChanceHappend] = useState(false);
  let totalPassenger = Object.values(offer.passengers).map(o => o.total).reduce((p,c) => p+c);
  
  const [bags,setBags] = useState([...offer.directions.map(seg => seg.map(f => [...Array(totalPassenger)]))])
  const [seats,setSeats] = useState([...offer.directions.map(seg => seg.map(f => [...Array(totalPassenger)]))]);

  const [expands,setExpands] = useState([...Array(totalPassenger)].map((_,i) => i===0))

  const [open, setOpen] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search)
  const justBooked = searchParams.get('justBooked')
  const agent = searchParams.get('agent')

  const isVerified = true //user?.detail?.isVerified;
  
  useEffect(() => {
    if(agent)
      loadAgent()
    //eslint-disable-next-line
  },[])

  async function loadAgent() {
    const res = await getAccountById(agent)
    if(res.return) {
      const obj = res?.data;
      setData({...data,email: obj?.email || data?.phone,phone: obj?.phone || data?.phone})
    }
  }

  const navigate = useNavigate();

  console.log(bags,seats)

  const [data, setData] = useState({ ...clone(travelersInfo), passengers: [...Array(totalPassenger)] });

  if(bookingData.orderData && !bookingDone && !justBooked && isVerified)
    navigate({
      pathname: '/order/new/flight/book/payment/'+id
    })
    

  async function book(ev,acceptPriceChange=false) {
    if(!data.email || data.phone?.length < 10)
      return enqueueSnackbar('Email and Phone number fields are required!')

    const valids = data.passengers?.map(obj => {
      if(!obj?.firstName || !obj?.lastName || !obj?.birthDate || !obj?.gender) {
        return false;
      }
      return true  
    })
    if(valids.some(val => !val)) {
      setExpands(valids?.map(val => !val))
      return enqueueSnackbar('Some Passenger informations are empty!',{variant: 'error'})
    }

    let modOffer = clone(offer?.orgi || offer);
    modOffer.segments = undefined;
    modOffer.fareRules = undefined;
    modOffer.directions.map((seg,i) => seg.map((flight,j) => {
    //   "additionalServices": {
    //     "chargeableCheckedBags": {
    //         "quantity": 1,
    //         "weight": 20
    //     },
    //     "chargeableSeatNumber": "13f"
    // }

      // Adding seats
      try {
        const passengersSeat = seats[i][j]?.filter(obj => obj)?.map(obj => ({seatNumber: obj?.seatNumber,passenger: obj?.passenger + 1}));
        if(passengersSeat && passengersSeat?.length) {
          try {
            // flight.additionalServices.chargeableSeatNumber.push(seats[i][j])
            flight.additionalServices.chargeableSeatNumber = passengersSeat
          } catch(ex) {
            // console.log('0XseatsPush')
            // try {
            // } catch(ex) {
              console.log('0XseatsCreate')
              try {
                flight.additionalServices = {chargeableSeatNumber: passengersSeat}
              } catch(ex) {
                console.log('0XadditionalServiceCreate')
              }
            // }
          }
        }
      } catch(ex) {console.log(ex)}


      const getWeightNum = (weight) => {
        try {
          const w = weight.match(/\d+/)[0];
          let kg = w;
          if(weight?.match(/\D+/)[0]?.includes('pc'))
            kg = parseInt(w) * 23;
          
          return parseInt(kg)
        } catch(ex) {}
      }
      // Adding additional bags
      try {
        const passengerBag = bags[i][j]?.filter(obj => obj)?.map(obj => ({...obj,weight: getWeightNum(obj?.weight),passenger: obj?.passenger + 1}));
        if(passengerBag && passengerBag?.length) {
          try {
              flight.additionalServices.chargeableCheckedBags = passengerBag
              // flight.additionalServices.chargeableCheckedBags.push(bags[i][j])
          } catch(ex) {
            // console.log('0XbagsPush')
              // flight.additionalServices.chargeableCheckedBags = [bags[i][j]]
            // console.log('0XbagsCreate')
            try {
              flight.additionalServices = {chargeableCheckedBags: passengerBag}
            } catch(ex) {
              console.log('0XadditionalServiceCreate')
            }
          }
        }
      } catch(ex) {console.log(ex)}


      return true;
    }))
    // return console.log(" ==>>> ",modOffer,bags)
    const {id,directions,pricingInformation,destinations,supplier} = modOffer; // allowed

    // Rare Case Tester
    // pricingInformation.price.totalPrice = "NGN 100,001"
    // pricingInformation.price.totalAmount = 10001

    let req = {
      supplier: offer?.supplier,
      offers: [{id,directions,pricingInformation,destinations,supplier}],
      travelersInfo: clone(data?.passengers)?.slice(0, totalPassenger || 1),
      share: data?.shareToEmail?.map(email => ({shareToEmail: email,includePrice: data?.includePrice})) || [],
      acceptPriceChange,
      agentId: agent || undefined
    };

    if(qObj.adjustment)
      req['adjustment'] = qObj.adjustment;


    // if(data?.shareToEmail?.some(email => email)) {
      // req['shareToEmail'] = data?.shareToEmail
      // req['includePrice'] = data?.includePrice
    // }

    let pn = data?.phone?.toString()?.split("-");
    let countryObj = Object.values(countries)?.find((obj) =>
      obj?.countryCallingCodes?.includes("+" + pn?.at(0)),
    );
    let phone = {
      countryCode: pn?.at(0),
      number: pn?.at(1),
      location: countryObj?.alpha2,
    };

    req.travelersInfo?.map((obj) => {
      // req.travelersInfo.at(0).birthDate = moment(data?.birthDate).format('YYYY-MM-DD')
      obj.document.issuanceCountry = obj?.document?.nationality;
      obj.document.issuanceDate = moment().format("YYYY-MM-DD");
      obj.document.validityCountry = obj?.document?.nationality;
      obj.document.birthPlace = obj?.document?.nationality;
      obj.document.issuanceLocation = obj?.document?.nationality;
      // obj.document.expiryDate = moment(data?.document?.expiryDate).format('YYYY-MM-DD')
      obj["email"] = data?.email;
      obj["phone"] = [phone];
      return obj;
    });

    console.dir(req, { depth: null });
    setLoading(true);
    dispatch(
      setBookingData({ ...bookingData, travelersInfo: req.travelersInfo }),
    );
    const res = await bookFlightOffer(req);
    setLoading(false);
    
    console.log('res: ',res)
    if (res.return) {
      dispatch(setBookingData({ ...bookingData, orderData: res?.data }));
      setBookingDone(true);
      if(isVerified)
        navigate({
          search: 'justBooked=true'
        })
    } else if(res?.msg === 'Price Changed') {
      let data = (res.data?.map(obj => convertFlightObject(obj)) || [])
      dispatch(setBookingData({...bookingData,offersPrice: data,time: new Date().getTime()}))
      setRareChanceHappend({
        price: data?.at(0)?.totalAmount,
        change: data?.at(0)?.totalAmount - (getNumber(pricingInformation?.price?.totalPrice))
      })
    } 
    else enqueueSnackbar(res.msg, { variant: "error" });
    setOpen(false);
  }

  function handlePassengers(obj, i = 0,fill) {
    let temp = {...data};
    temp.passengers[i] = obj;

    let tempObj = {
      "lastName": "Doe",
      "firstName": "John",
      "birthDate": "1/24/2010",
      "gender": "Male",
      "type": "ADT",
      "phone": [
          {
              "countryCode": "251",
              "location": "Ethiopia",
              "number": "912341234"
          }
      ],
      "email": "abebe@yopmail.com",
      "document": {
          "documentType": "Passport",
          "birthPlace": "ET",
          "issuanceLocation": "ET",
          "issuanceDate": "1/24/2024",
          "number": "1111",
          "expiryDate": "2030-01-01",
          "issuanceCountry": "ET",
          "validityCountry": "ET",
          "nationality": "ET",
          "holder": true
      }
    }

    if(fill) temp.passengers[i] = tempObj;
    setData(temp);
  }

  function handleBag(obj,[segment]) {
    try {
      const {quantity,weight,i:passenger,price,label} = obj;
      let temp = clone(bags);
      // console.log(bags,segment,j)
      // console.log(bags[segment][j])
      const newObj = {quantity,weight,price,label,passenger};
      temp[segment]?.map((flight) => {
        if(weight) {
          flight[passenger] = newObj;
        } else flight[passenger] = null;
        return true;
      })
        // temp[segment][j][passenger] = newObj

      console.log(temp,'--------')
      setBags(temp);
      setBagsPrice(temp?.map(arr => arr?.at(0) || [])?.flat())
      // setBagsPrice(temp?.flat()?.flat()?.reduce((acc,cur) => (
      //   {
      //     quantity: acc.quantity + (cur?.quantity || 0),
      //     price: acc?.price + (cur?.price || 0)
      //   }
      // ),{quantity: 0, price: 0}))
    } catch(ex) {console.log(ex)}
    console.log(obj,segment,bags)  
  }

  function handleSeat(obj,{i,j,seg}) {
    // console.log(" => ",obj,i)
    try {
      const {seatNumber,...restObj} = obj[0] || {};
      let temp = clone(seats);
      // console.log(temp,seg,i,j)
      const newObj = seatNumber ? {seatNumber,passenger: i,...restObj} : null;
      // if(seatNumber)
      temp[seg][j][i] = newObj;
      setSeats(temp);
      // console.log(temp,temp?.map(arr => arr?.flat())?.flat())
      setSeatsPrice(temp?.map(arr => arr?.flat() || [])?.flat())
    } catch(ex) {console.log(ex)}
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
  
    if(!data.email)
      return enqueueSnackbar('Email and Phone number fields are required!',{variant: 'error'})
    else if(data.phone?.length < 10)
      return enqueueSnackbar('Invalid phone number!',{variant: 'error'})

    setTimeout(() => true,700)
    console.log(data)
    const validAges = data.passengers.map(passenger => validateAge(passenger?.birthDate,passenger?.gotType));
    if(!validAges?.every(val => val[0])) {
      setExpands(validAges?.map(val => !val[0]))
      return enqueueSnackbar('Some Passenger fields are empty or invalid!',{variant: 'warning'});
    }
    
    const expiredPassport = data.passengers.map(passenger => moment(passenger.document.expiryDate).isBefore(moment(),'day'));
    if(expiredPassport?.some(val => val)) {
      setExpands(expiredPassport?.map(val => !val))
      return enqueueSnackbar('Some Passenger fields are empty or invalid!',{variant: 'warning'});
    }

    setOpen(true);
  }

  // console.log(' ----> ',expands,offer)

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 pb-10 max-w-full">
      <h5>Contact Details</h5>
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1">
          <EmailInput size='large' required disabled={agent}
            label="Enter your email"
            value={data.email}
            onChange={(ev) => setData({ ...data, email: ev.target.value })}
          />
        </div>
        <div className="flex-1 ">
          <PhoneNumberInput required disabled={agent}
            label="Enter your phone number"
            value={data.phone}
            onChange={(val) => setData({ ...data, phone: val })}
          />
        </div>
      </div>

      <ContentInfo>
        Use all given names and surnames exactly as they appear in your passport/ID to avoid boarding complications
      </ContentInfo>

      <div>
      {offer?.passengers &&
        // Object.entries(offer?.passengers)?.map(([type, obj], i) =>
        Object.entries(offer?.passengers)
        .flatMap(([type, obj]) => Array.from({ length: obj.total }, () => ({ type, ...obj }))).map(({type},i) => {
            return (
              <ExpandWrapper open={expands[i]} key={i}>
                {(value) => {
                  const {open,setOpen} = value || {}
                  const handleOpen = (id) => {
                    const element = document.getElementById(id);
                    if(element)
                      setTimeout(() => 
                        element?.scrollIntoView({behavior: 'instant'})
                      ,500)
                    console.log(element)
                    setOpen(!open)
                    setExpands([...Array(totalPassenger)].map((_,j) => j===i && !open))
                  }
                  return (
                    <div className="my-4 max-w-full" id={'pass'+i}>
                      <div className="rounded-md border border-gray-300 light-bg flex flex-wrap gap-4 p-4 items-center">
                        {type === "adult" ? <div><Icon icon='el:person' className='w-8 h-8' /></div> : 
                         type === 'child' ? <div><Icon icon='vaadin:child' className='w-8 h-8' /></div> :
                         type === 'infant' ? <div><Icon icon='cil:child' className='w-8 h-8' /></div> : ''}

                         <div className="flex-1 flex flex-col justify-center items-start" onDoubleClick={() => getTestLevel(def.devStatus) < 2 && handlePassengers(null,i,true)}>
                          <span className="">
                          {i === 0 ? 'Primary Passenger' : `
                            Passenger ${i+1} 
                          `}
                          </span>
                          <span className="inline-block ">
                            {type === "adult" ? " (Adult over 12 years)" : 
                            type === 'child' ? ' (Child 2 - 11 years)' :
                            type === 'infant' ? ' (Infant 0 - 2 years)' : ''}
                          </span>
                         </div>

                         <div>
                          <Button1 variant='outlined' onClick={() => handleOpen('pass'+i)} className='!flex !gap-2 !font-bold'><span>{open?'-':'+'}</span> Add passenger details</Button1>
                         </div>
                      </div>
                      {open?
                        <div className="p-2 py-4 flex flex-col gap-6 max-w-full" >
                          <PrimaryPassenger
                            data={data.passengers[i]}
                            config={{collapser: 'div'}}
                            type={type}
                            count={i}
                            handleReturn={(newObj) => {
                              handlePassengers(newObj, i);
                            }}
                            label={
                              <div className="flex flex-1 items-center justify-between gap-4">
                                {/* <h5>
                                  {i + j > 0
                                    ? "Primary Passenger"
                                    : "Passenger " + (count + 1)}
                                </h5> */}
                                {/* <p className="capitalize">
                                  {type} 
                                  {type === "adult" ? " (over 12 years)" : 
                                  type === 'child' ? ' (2 - 11 years)' :
                                  type === 'infant' ? ' (0 - 2 years)' : ''}
                                </p> */}
                              </div>
                            }
                          />


                          {bookingData?.offer?.at(-1)?.pricingInformation?.price?.additionalServices?.find(obj => 
                            obj?.service === 'CHECKED_BAGS' && obj?.price
                          ) ? 
                            <div className="flex flex-col gap-4 ">
                              <h5>Flight extras</h5>

                              <div className="flex gap-4 justify-between max-w-full w-[700px] overflow-auto snap-x">
                                {offer?.directions?.map((direction,index) => {
                                  let obj = {departure: direction[0].departure,arrival: direction?.at(-1)?.arrival,baggage: direction[0]?.baggage,direction,index,passenger: i};
                                  return (
                                    <div key={index} className="snap-mandatory snap-center pb-3">
                                      <CheckedBags offer={bookingData?.offer?.at(-1)} hide={(index !== 0) ? ['wantMore']:null} selected={bags[index]?.[0][i]} data={obj} callback={(obj) => handleBag({...obj,i},[index,0])} />
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          :null}


                          <div className="flex flex-col gap-4 ">
                            <div className="flex gap-4 justify-between">
                              <SeatSelection callback={(obj,{i:seg,j}) => handleSeat(obj,{i,j,seg})} offer={offer} hide={['info']} />
                            </div>
                          </div>

                        </div>
                      :null}
                    </div>
                  )
                }}
              </ExpandWrapper>
            );
        })
      }

      </div>

      <EmailOrderConfirmation callback={(obj) => setData({...data,...(obj||{})})} />
      {/* <div className='flex justify-end self-end'>
        <Button1 variant='text' className='!font-bold'>+ Add another passenger</Button1>
      </div> */}
      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <Button1 className="!w-auto !bg-primary !text-secondary" to={`/order/new/flight/book/${id}`}>
            Go back
          </Button1>
        </div>
        <div className="flex-1">
          <Button1 type='submit' className="" >
            Confirm booking
          </Button1>
        </div>
      </div>
      <Modal1 open={open} setOpen={setOpen}>
        <div className="flex flex-col max-w-[560px]">
          <div className="flex flex-col items-center gap-4 p-10">
            <h4>Confirm flight booking</h4>
            <p>
              By clicking on the confirm button below, I acknowledge that I have reviewed and accept the privacy policy, terms of use and fare rules for this flight:{" "}
              {segments.map(obj => obj.departureLocation + ' to ' + obj?.arrivalLocation)?.join('. ')}
            </p>
          </div>
          {loading ? (
            <h6 className="bg-theme1/10 flex items-center justify-center p-8 ">
              Please wait
            </h6>
          ) : (
            <div className="bg-theme1/10 flex justify-center gap-6 p-8 px-10">
              <Button1 variant="text" onClick={() => setOpen(false)}>
                Cancel
              </Button1>
              <Button1 type='submit' className="sm:!p-3 sm:!px-4" onClick={book}>
                Confirm
              </Button1>
            </div>
          )}
        </div>
      </Modal1>
      <Modal1 open={bookingDone} setOpen={setBookingDone}>
        <div className="flex flex-col items-center p-8 gap-6">
          {isVerified ? 
            <h5>Booking Complete</h5>
          :
            <h5>Order is not completed</h5>
          }
          <p className="max-w-[400px] text-center">
            {isVerified ? 
              "Your booking was successful. You can now add hold or proceed to make payment."
            :
              "Your business has yet to be approved to issue tickets on Intraverse"
            }
          </p>
          <div className="flex gap-2 w-full">
            {isVerified ? 
              <Link
                to={`/order/flight/${bookingData?.orderData?.booking?._id}`}
                className="flex-1 text-center justify-center btn !bg-primary text-secondary"
              >
                Hold Booking
              </Link>          
            :
              <Link
              to={`/order/new/flight`}
              className="flex-1 text-center justify-center btn !bg-primary text-secondary"
              >
                Go back to search
              </Link>
            }
            {isVerified ? 
              <Link
                to={`/order/new/flight/book/payment/${id}`}
                className="flex-1 text-center justify-center btn-theme rounded-md"
              >
                Make Payment
              </Link>
            :
              <Link
                to={`/order/flight/${bookingData?.orderData?.booking?._id}`}
                className="flex-1 text-center justify-center btn-theme rounded-md"
              >
                View Order
              </Link>
            }
          </div>
        </div>
      </Modal1>

      <Modal1 open={rareChanceHappend} setOpen={() => getPrice && getPrice()}>
        <div className="self-center max-w-[500px] ">
          <div className='card p-8 pt-4 m-2 rounded-md flex flex-col'>
            {/* <h4 className='py-2'>You have been gone for too long.</h4> */}
            <h5 className='py-2 self-center'>Price Change</h5>
            {/* <p> The flight offer may have changed. Click the button to get the latest price.</p> */}
            <div className="text-primary/60">There has been a price change by :  
              <b className={`inline-block p-1 ${rareChanceHappend?.change < 0 ? 'text-green-500':'text-red-400'}`}>{rareChanceHappend?.change < 0 ? '-':'+'} {formatMoney(Math.abs(rareChanceHappend?.change))}</b>
            </div>
            <p>
              The updated price is <b className="font-bold text-primary">{formatMoney(rareChanceHappend?.price)}.</b>
            </p>
            <p>
              Do you want to continue or pick a different offer
            </p>
            <br />
            <div className='flex  flex-wrap justify-between gap-4'>
              <Button1 className='!w-auto self-end' variant='outlined' onClick={() => navigate('/order/new/flight')}><span className='hidden sm:inline-block pr-1'>New</span> Offer</Button1>
              {/* <Button1 className='btn1 !w-auto self-end' onClick={() => (getPrice && getPrice()) || window.location.reload()}>Refresh</Button1> */}
              <Button1 loading={loading} className='btn1 !w-auto self-end' onClick={() => book(null,true)}>Continue</Button1>
            </div>
          </div>
        </div>
      </Modal1>
    </form>
  );
}


function EmailOrderConfirmation({callback}) {
  const [emails,setEmails] = useState([''])
  const [includePrice,setIncludePrice] = useState(false);


  useEffect(() => {
    if(emails?.at(0))
      callback && callback({shareToEmail: emails,includePrice})

    //eslint-disable-next-line
  },[emails,includePrice])

  function handleEmail(val,i) {
    let temp = [...emails];
    temp[i] = val;
    setEmails(temp);
  }
  
  return (
    <div className="flex flex-col gap-4">
      <h5>Send order confirmation to passenger (Optional)</h5>
      
      <div className="border border-gray-300 light-bg p-6 rounded-md flex flex-col gap-3">
        <label className="flex gap-2 items-center cursor-pointer">
          <input type='checkbox' checked={includePrice} onChange={(ev) => setIncludePrice(ev?.target?.checked)} />
          Include Pricings 
        </label>
        {emails?.map((val,i) => (
          <div key={i} className="flex gap-3 items-center">
            <EmailInput value={val} onChange={(ev) => handleEmail(ev.target.value,i)} label='' className='bg-white w-full' />
            {i !== 0 ? 
              <Icon icon='ion:close-circle' className='cursor-pointer' onClick={() => setEmails(emails.filter((_,Index) => Index !== i))} />
            :null}
          </div>
        ))}
      </div>
      <b className="text-sm text-theme1 cursor-pointer" onClick={() => setEmails([...emails,''])}>Add another</b>
    </div>

  )
}
export function PayTime({ callback }) {
  const options = [
    {
      value: "paynow",
      label: "Pay now",
      description: "Pay now and confirm seat and baggage selection.",
    },
    {
      value: "hold",
      label: "Book on hold",
      description: "Hold price and pay at a later date.",
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <h5>Paying now or later?</h5>
      <p>
        Decide whether you want to pay for your trip now in its entirety, or
        whether you'd like to put a hold on the order, and pay at a later date.
        Be aware that you cannot currently select seats or baggage when holding
        an order.
      </p>

      <RadioGroup
        value="paynow"
        className="flex gap-4"
        options={options}
        onChange={(val) => callback && callback(val)}
        render={(obj) => (
          <div className="flex flex-col gap-1">
            <b>{obj.label}</b>
            <p>{obj.description}</p>
          </div>
        )}
      />
    </div>
  );
}
