import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../../components/DIsplay/Nav/BreadCrumb";
import { Link, useLocation } from "react-router-dom";
import TextInput from "../../../../../components/form/TextInput";
import Tabs from "../../../../../components/DIsplay/Nav/Tabs";
import Icon from "../../../../../components/HOC/Icon";
import airline from "../../../../../assets/images/airline.svg";
import { formatMoney } from "../../../../../features/utils/formatMoney";
import ChangeProperty from "./Property/ChangeProperty";
import { LinearProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import getBooking from "../../../../../controllers/booking/getBooking";

export default function ChangeFlightOrder() {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const property = searchParams?.get("property");
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await getBooking(id);
      setLoading(false);
      if (res.return) {
        setBooking(res.data);
      }
    };
    fetch();
  }, [id]);

  if (property) return <ChangeProperty property={property} obj={booking} />;

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <div className="flex flex-col gap-4 pd-md py-4 light-bg">
          <BreadCrumb>
            <Link to="/order">Orders</Link>
            <Link to={`/order/flight/${booking?.booking?._id}`}>
              {booking?.booking?.bookingId}
            </Link>
            <label>Change Order</label>
          </BreadCrumb>
          <div className="flex flex-col items-center">
            <div className="card p-10 py-4 flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                <PassengerView passengers={booking?.orderDetail?.travelers} />
              </div>

              <div className="flex flex-col gap-3">
                <h5>Class</h5>
                <div className="flex gap-2 ">
                  <TextInput
                    label={""}
                    value={"Economy"}
                    size="small"
                    disabled
                  />
                  <Link
                    to="?property=class"
                    className="flex items-center light-bg p-1"
                  >
                    <Icon icon="icon-park:change" className="p-1" />
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h5>Flights</h5>
                <FlightSearchView label="Departure" />
                <FlightSearchView label="Return" />
              </div>

              <div className="flex flex-col gap-3">
                <h5>Seats</h5>
                <SeatView
                  label="Departure"
                  obj={{ seats: [{ row: "13B", price: 30 }] }}
                />
                <SeatView label="Return" />
              </div>

              <div className="flex flex-col gap-3">
                <h5>Bags</h5>
                <BagsView />
              </div>

              <div className="flex flex-col gap-3">
                <h5>Contact Person Details</h5>
                <ContactPersonView />
              </div>

              <div className="flex flex-col gap-3">
                <h5>Insurance</h5>
                <InsuranceView />
              </div>

              {/* <div className='flex flex-col gap-3'>
							<h5>Split PNR</h5>
							<SplitPNRView />
						</div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// function SplitPNRView() {
// 	return (
// 		<div className='border border-primary/20 flex items-center p-4 py-1 gap-3 rounded-md'>
// 			<div className='flex flex-wrap gap-1 flex-1'>
// 				Jhon Doe
// 			</div>
// 			<Link to='?property=pnr' className='light-bg p-1'>
// 				<Icon icon='icon-park:change' className='p-1' />
// 			</Link>
// 		</div>
// 	)
// }

function PassengerView({ passengers }) {
  const [selected, setSelected] = useState();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (passengers && !selected) {
      setSelected(passengers[0]?.id);
      setOptions(
        passengers?.map((passenger, index) => ({
          label: `Passenger ${index + 1}`,
          value: passenger?.id,
        })),
      );
    }
  }, [passengers, selected]);

  return (
    <>
      {!passengers ? (
        <LinearProgress />
      ) : (
        <div className="flex flex-col gap-5">
          <Tabs
            option={options}
            value={selected}
            onChange={(val) => {
              setSelected(val);
            }}
          />

          <h5>Passenger Details</h5>
          <div className="flex gap-2 ">
            <TextInput
              label={"Passenger"}
              size="small"
              value={
                passengers.find((passenger) => passenger?.id === selected)?.name
                  ?.firstName +
                " " +
                passengers.find((passenger) => passenger?.id === selected)?.name
                  ?.lastName
              }
              disabled
            />
            <Link
              to={"?property=passenger&id=" + selected}
              className="flex items-center light-bg p-1"
            >
              <Icon icon="icon-park:change" className="p-1" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function ContactPersonView({ obj }) {
  let data = {
    email: "chinemaOkafor@gmail.com",
    phone: "+234567891011",
    ...(obj || {}),
  };
  return (
    <div className="border border-primary/20 flex items-center p-4 py-1 gap-3 rounded-md">
      <div className="flex flex-wrap gap-1 flex-1">
        <span>{data.email},</span>
        <span>{data.phone}</span>
      </div>
      <Link to="?property=contact" className="light-bg p-1">
        <Icon icon="icon-park:change" className="p-1" />
      </Link>
    </div>
  );
}

function InsuranceView() {
  return (
    <div className="border border-primary/20 flex items-center p-4 py-1 gap-3 rounded-md">
      <div className="flex flex-wrap gap-1 flex-1">
        No active insurance plan
      </div>
      <Link to="?property=insurance" className="light-bg p-1">
        <Icon icon="icon-park:change" className="p-1" />
      </Link>
    </div>
  );
}

function BagsView({ obj }) {
  let data = {
    bags: [
      { weight: 23, price: 300 },
      { weight: 23, price: 300 },
    ],
    ...(obj || {}),
  };

  let weightSum = data?.bags?.reduce(
    (total, obj) => parseFloat(total) + obj?.weight,
    [0],
  );
  if (weightSum / data?.bags?.length === data?.bags?.at(0)?.weight)
    weightSum = data?.bags?.at(0)?.weight + " each ";

  let priceSum = data?.bags?.reduce(
    (total, obj) => parseFloat(total) + obj?.price,
    [0],
  );
  if (priceSum / data?.bags?.length === data?.bags?.at(0)?.price)
    priceSum = formatMoney(data?.bags?.at(0)?.price) + " for each bag";

  return (
    <div>
      <div className="border border-primary/20 flex items-center p-4 py-1 gap-3 rounded-md">
        <div className="flex flex-1 flex-col gap-1">
          <span className="flex gap-2">
            {data?.bags?.length}x checked bag, {weightSum}
          </span>
          <p>{priceSum}</p>
        </div>
        <Link to="?property=bags" className="light-bg p-1">
          <Icon icon="icon-park:change" className="p-1" />
        </Link>
      </div>
    </div>
  );
}

function SeatView({ obj, label }) {
  let data = {
    airline,
    departure: "LOS",
    arrival: "LHR",
    seats: null,
    ...(obj || {}),
  };

  const seatsPrice = formatMoney(
    data.seats?.reduce((total, obj) => obj.price + total, [0]),
  );
  return (
    <div>
      <small>{label}</small>
      <div className="border border-primary/20 flex items-center p-4 py-1 gap-3 rounded-md">
        <img src={data.airline} alt="" className="h-5" />
        <div className="flex flex-1 flex-col gap-1">
          <span className="flex gap-2">
            {data.departure} - {data.arrival}
          </span>
          <p>
            {data.seats
              ? `${data.seats?.length} selected for ${seatsPrice}`
              : "No seat has been selected"}
          </p>
        </div>
        {data.seats ? (
          <div className="bg-theme2/10 border border-theme2 px-2 rounded-md">
            {data.seats?.at(0)?.row}
          </div>
        ) : null}
        <Link to="?property=seat" className="light-bg p-1">
          <Icon icon="icon-park:change" className="p-1" />
        </Link>
      </div>
    </div>
  );
}
function FlightSearchView({ obj, label }) {
  let data = {
    airline,
    departure: "LOS",
    arrival: "LHR",
    date: "Thur, 2 Nov 2023",
    ...(obj || {}),
  };

  return (
    <div>
      <small>{label}</small>
      <div className="border border-primary/20 flex items-center p-4 py-1 gap-3 rounded-md">
        <img src={data.airline} alt="" className="h-5" />
        <div className="flex flex-1 flex-col gap-1">
          <span className="flex gap-2">
            {data.departure} - {data.arrival}
          </span>
          <p>{data.date}</p>
        </div>
        <Link to="?property=flight" className="light-bg p-1">
          <Icon icon="icon-park:change" className="p-1" />
        </Link>
      </div>
    </div>
  );
}
