import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../../../components/DIsplay/Nav/BreadCrumb";
import { Link, useLocation } from "react-router-dom";
import Tabs from "../../../../../../components/DIsplay/Nav/Tabs";
import ChangePassenger from "./ChangePassenger";
import ChangeInsurance from "./ChangeInsurance";
import { formatMoney } from "../../../../../../features/utils/formatMoney";
import PaymentMethod from "../../../../../../components/flight/PaymentMethod";
import ChangeFlight from "./ChangeFlight";
import ChangeFlightOffer from "./ChangeFlightOffer";
import ChangeSeat from "./ChangeSeat";
import Button1 from "../../../../../../components/form/Button1";
import ChangeBag from "./ChangeBag";
import ChangeContact from "./ChangeContact";
import PassengerView from "./ViewChange/Passenger";
import FlightView from "./ViewChange/Flight";
import ChangeSeatConfirm from "./ChangeSeatConfirm";
import SeatView from "./ViewChange/Seat";
import ChangeBagConfirm from "./ChangeBagConfirm";
import BagView from "./ViewChange/BagView";
import ContactView from "./ViewChange/Contact";
import ChangeSplitPNR from "./ChangeSplitPNR";
import ChangeSplitPNRConfirm from "./ChangeSplitPNRConfirm";
import ConfirmFlightOfferChange from "./ConfirmFlightOfferChange";

const payment = { value: "Payment", elem: <Payment /> };
const confirmation = { value: "Confirmation", elem: <Confirmation /> };
const properties = [
  { name: "unkProp", value: "???" },
  {
    name: "passenger",
    value: "Passenger",
    elem: <ChangePassenger/>,
    view: <PassengerView />,
  },
  {
    name: "class",
    value: "Change flight date",
    elem: <ChangeFlight />,
    view: <FlightView />,
  },
  { name: "class", value: "Select flight", elem: <ChangeFlightOffer /> },
  { name: "class", value: "Confirm Date Change", elem: <ConfirmFlightOfferChange /> },
  { name: "flight", value: "Change flight date", elem: <ChangeFlight /> },
  { name: "flight", value: "Confirm Date Change", elem: <ConfirmFlightOfferChange /> },
  { name: "flight", value: "Select flight", elem: <ChangeFlightOffer /> },
  {
    name: "seat",
    value: "Add Seat to order",
    elem: <ChangeSeat />,
    view: <SeatView />,
  },
  { name: "seat", value: "Confirm seat", elem: <ChangeSeatConfirm /> },
  {
    name: "bags",
    value: "Add bag to order",
    elem: <ChangeBag />,
    view: <BagView />,
  },
  { name: "bags", value: "Confirm bag", elem: <ChangeBagConfirm /> },
  {
    name: "contact",
    value: "Change contact",
    elem: <ChangeContact />,
    view: <ContactView />,
  },
  // {name: 'contact',value: 'Confirm contact',elem: <ChangeContactConfirm />},
  { name: "insurance", value: "Select Plan", elem: <ChangeInsurance /> },
  { name: "pnr", value: "Split PNR", elem: <ChangeSplitPNR /> },
  {
    name: "pnr",
    value: "Confirm Split PNR",
    elem: <ChangeSplitPNRConfirm />,
  },
];

export default function ChangeProperty({ property, obj, update }) {

  const [selected, setSelected] = useState();
  const [prevResult,setPrevResult] = useState();

  const props = properties?.filter((obj) => obj.name === property);

  let options = [
    ...(props.length ? props : [properties[0]]),
    payment,
    confirmation,
  ];

  console.log(options)

  useEffect(() => {
    if (property) {
      let found = properties?.find((obj) => obj.name === property);
      if (found) setSelected(found);
    }
  }, [property]);

  function handleTab(val) {
    // setSelected(options.find((obj) => obj.value === val));
  }

  function next(obj) {
    if(obj) setPrevResult(obj);
    console.log(obj,'<---')
    let curIndex = options.findIndex((obj) => selected?.value === obj?.value);
    if (curIndex < options.length - 1) setSelected(options[curIndex + 1]);
  }

  function back() {
    setSelected(options[Math.min(0, 1)]);
  }
  return (
    <div className="flex flex-col gap-4 pd-md py-4 light-bg">
      <BreadCrumb>
        <Link to="/order">Orders</Link>
        <Link to={`/order/flight/${obj?.booking?._id}`}>
          {obj?.booking?.bookingId}
        </Link>
        <Link to={`/order/flight/change/${obj?.booking?._id}`}>
          Change Order
        </Link>
        <label className="capitalize">{property} change</label>
      </BreadCrumb>

      <div className="flex flex-col items-center gap-4 ">
        <div className="min-w-[750px] max-w-full flex flex-col gap-4">
          <div className="bg-primary/20 flex gap-4 justify-center p-4 w-full">
            <Tabs
              option={options}
              value={selected?.value}
              onChange={handleTab}
              config={{
                inActiveClass: "btn-theme-light rounded-md",
              }}
            />
          </div>

          <div className="bg-secondary p-10">
            {selected?.elem &&
              React.cloneElement(selected?.elem, {
                update,
                callback: (obj) => next(obj),
                back,
                orgi: obj,
                property,
                prevResult,
                pageObj: props[0],
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Payment({ pageObj,prevResult,callback }) {
  if(!prevResult?.return || prevResult?.payment === false) return callback(prevResult);
  return (
    <div className="flex flex-col gap-4 ">
      {/* {pageObj?.view ? React.cloneElement(pageObj?.view,{data: pageObj}) : null} */}
      {pageObj.view && React.cloneElement(pageObj.view, { page: "payment" })}

      <div className="border rounded-md p-4 flex gap-4 justify-between">
        <b>Change Fee</b>
        <b>{formatMoney(0)}</b>
      </div>

      <PaymentMethod handleReturn={callback} expand hide={["flexify", "freeze", "booklater"]} />
    </div>
  );
}

function Confirmation({ property, callback, pageObj, prevResult }) {
  return prevResult?.return ? (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4 justify-between">
        <h5>
          <span className="capitalize">{property}</span> change was successful
        </h5>
        <label className="success">Completed</label>
      </div>
      {pageObj.view &&
        React.cloneElement(pageObj.view, { page: "confirmation" })}

      <Button1 onClick={callback}>Continue</Button1>
    </div>
  ) : (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 justify-between">
        <h5>Change unsuccessful</h5>
        <label className="error">Failed</label>
      </div>

      <p>
        The requested change was not successful but not to worry our team will
        take additional steps to complete the change.
      </p>

      <Button1 onClick={callback}>Notify us about this error</Button1>
    </div>
  );
}
