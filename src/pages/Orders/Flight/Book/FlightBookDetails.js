import React, { useState } from "react";
import BreadCrumb from "../../../../components/DIsplay/Nav/BreadCrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
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

export default function FlightBookDetails() {
  const { id } = useParams();
  const qObj = JSON.parse(decrypt(id));
  const { bookingData } = useSelector((state) => state.flightBooking);
  const offer = bookingData?.offer && bookingData?.offer?.at(-1);
  // const dispatch = useDispatch();

  const navigate = useNavigate();
  function handleSearchRoute(i) {
    navigate("/order/new/flight/offers?q=" + id + "&path=" + i);
  }

  // function handlePayTime(val) {
  //   dispatch(setBookingData({ ...bookingData, payTime: val }));
  // }
  return (
    <div className="pd-md py-4 flex flex-col gap-4">
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
      <div className="flex gap-10 flex-wrap-reverse md:flex-nowrap">
        <div className="flex flex-col gap-6 md:w-[80%]">
          {/* <PayTime callback={(val) => handlePayTime(val)} /> */}
          <div className="bg-theme1/10 flex items-center gap-2 p-2">
            <Icon icon={"ic:sharp-lock"} className="w-8 h-8" />
            We take privacy issues seriously. You can be sure that your personal
            data is securely protected.
          </div>
          <PassengerDetails offer={offer} />
        </div>
        <div className="flex flex-col gap-4">
          {offer?.segments?.map((obj, i) => (
            <div key={i}>
              <FlightSegmentDisplay data={obj} />
            </div>
          ))}
          <FlightPriceSummary onBook data={offer} />
        </div>
      </div>
    </div>
  );
}

function PassengerDetails({ offer }) {
  const { id } = useParams();
  const { bookingData } = useSelector((state) => state.flightBooking);
  const segments = bookingData?.offer?.at(-1)?.segments || [];
  // const departure = segments[0]?.departureLocation;
  // let arrival =
  //   segments[segments.length - 1]?.arrivalLocation ||
  //   segments[0]?.arrivalLocation;
  const [open, setOpen] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useState({ ...clone(travelersInfo), passengers: [] });

  async function book() {
    let passengerCount =
      offer?.passengers &&
      Object.values(offer?.passengers)?.reduce(
        (c, p) => parseInt(c.total) + parseInt(p.total),
        { total: 0 },
      );
    let req = {
      supplier: offer?.supplier,
      offers: [offer],
      travelersInfo: clone(data?.passengers)?.slice(0, passengerCount || 1),
    };
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

    if (res.return) {
      setBookingDone(true);
      dispatch(setBookingData({ ...bookingData, orderData: res?.data }));
    } else enqueueSnackbar(res.msg, { variant: "error" });
    setOpen(false);
  }

  function handlePassengers(obj, i = 0) {
    let temp = data;
    temp.passengers[i] = obj;
    setData(temp);
    // console.log(' => ',temp,i)
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setTimeout(() => true,700)
    // console.log(data.document.expiryDate)
    const validAges = data.passengers.map(passenger => validateAge(passenger.birthDate,passenger?.gotType));
    if(!validAges?.every(val => val[0]))
      return false;
    
    const expiredPassport = data.passengers.map(passenger => moment(passenger.document.expiryDate).isBefore(moment(),'day'));
    if(expiredPassport?.some(val => val))
      return false;

    setOpen(true);
  }

  console.log(" -> ",data.document)
  let count = 0;
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 pb-10">
      <h5>Contact Details</h5>
      <div className="flex gap-4">
        <div className="flex-1">
          <EmailInput size='large'
            label="Enter your email"
            value={data.email}
            onChange={(ev) => setData({ ...data, email: ev.target.value })}
          />
        </div>
        <div className="flex-1">
          <PhoneNumberInput
            label="Enter your phone number"
            value={data.phone}
            onChange={(val) => setData({ ...data, phone: val })}
          />
        </div>
      </div>

      {offer?.passengers &&
        Object.entries(offer?.passengers)?.map(([type, obj], i) =>
          [...Array(obj.total || obj.passengerCount)]?.map((val, j) => {
            return (
              <PrimaryPassenger
                type={type}
                collapse={i + j !== 0}
                key={count++}
                count={count}
                handleReturn={(newObj, count) => {
                  handlePassengers(newObj, count);
                }}
                label={
                  <div className="flex flex-1 items-center justify-between gap-4">
                    <h5>
                      {i + j === 0
                        ? "Primary Passenger"
                        : "Another Passenger " + count}
                    </h5>
                    <p className="capitalize">
                      {type} {type === "adult" ? "(over 12 years)" : ""}
                    </p>
                  </div>
                }
              />
            );
          }),
        )}
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
              By clicking confirm you have booked this flight for{" "}
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
                Go back
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
          <h5>Booking was successful</h5>
          <p className="max-w-[400px] text-center">
            your booking was successful. You can now add ancillaries or proceed
            to make payment.
          </p>
          <div className="flex gap-2 w-full">
            <Link
              to={`/order/new/flight/book/ancillaries/${id}`}
              className="flex-1 text-center justify-center btn !bg-primary text-secondary"
            >
              Add Ancillaries
            </Link>
            <Link
              to={`/order/new/flight/book/payment/${id}`}
              className="flex-1 text-center justify-center btn-theme rounded-md"
            >
              Make Payment
            </Link>
          </div>
        </div>
      </Modal1>
    </form>
  );
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
