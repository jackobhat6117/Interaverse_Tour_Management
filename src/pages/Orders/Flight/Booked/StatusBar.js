import { useState } from "react";
import Modal1 from "../../../../components/DIsplay/Modal/Modal1";
import AddFlightBaggage from "../../../../components/flight/Baggage";
import CancelFlightOrder from "../../../../components/flight/CancelFlightOrder";
import AddFlightSeats from "../../../../components/flight/Seats";
import Button1 from "../../../../components/form/Button1";
import { alertType } from "../../../../data/constants";
import moment from "moment";
import { flightStatusMap } from "../../OrdersData";
import { def } from "../../../../config";
import CancelOrder from "../../cancelOrder";

export default function StatusBar({ data,needsReview,changeable, cancelOrder }) {
  const [openBaggage, setOpenBaggage] = useState(false);
  const [openSeats, setOpenSeats] = useState(false);
  // const [cancelBooking, setCancelBooking] = useState(false);

  const status = data?.booking?.flightBooking?.at(0)?.status;

  return (
    <div className="border rounded-md p-4 flex flex-col gap-6 max-w-[400px]">
      <div className="flex flex-col gap-2">
        <p>Order Id</p>
        <b>{data?.booking?.bookingId}</b>
      </div>

      <div className="flex flex-col gap-2">
        <p>Status</p>
        <div>
          <button className={`btn ${alertType[status?.toLowerCase()]}`}>
            {flightStatusMap(status)}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-4">
          <p>Airline</p>
          <p>Date</p>
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex gap-2 ">
            <img
              src={`https://pics.avs.io/200/200/${data?.booking?.flightBooking?.at(0)?.airlines?.at(0)}@2x.png`}
              alt=""
              className="w-4 h-4"
            />
            <b>{data?.booking?.flightBooking[0]?.airlines?.at(0)} Airline</b>
          </div>
          <b>
            {moment(data?.booking?.flightBooking[0]?.createdAt).format(
              "MMM DD YYYY",
            )}
          </b>
        </div>
      </div>

      {needsReview ? 
      <div className="flex flex-col gap-5">
        <Button1
          variant="outlined"
          className="!border-primary !text-primary"
          onClick={() => setOpenBaggage(true)}
        >
          Add extra baggage
        </Button1>
        <Button1
          variant="outlined"
          className="!border-primary !text-primary"
          onClick={() => setOpenSeats(true)}
        >
          Seat selection
        </Button1>
        <Button1
          variant="outlined"
          className="!border-primary !text-primary"
          onClick={() => cancelOrder(data?.booking?.bookingId)}
        >
          Cancel booking
        </Button1>
        <Button1>Issue ticket</Button1>
      </div>
      :
      <div className="flex flex-col gap-5">
        <Button1
          disabled={status !== 'Not Paid' || status !== 'booked'}
          variant="outlined"
          className="!border-primary !text-primary"
          onClick={() => cancelOrder(data?.booking?.bookingId)}
        >
          Request Cancellation
        </Button1>
        <Button1 disabled={!changeable || !def?.devTest ? true:false}
          to={`/order/flight/change/${data?.booking?._id}`}
          variant="outlined"
          className="!border-primary !text-primary"
        >
          Request Change
        </Button1>
        {/* <Button1>Accept Changes</Button1> */}
      </div>
      }

      <Modal1 open={openBaggage} setOpen={setOpenBaggage}>
        <div className="card p-10 flex flex-col gap-4">
          <b>Add Bag</b>
          <AddFlightBaggage data={{}} cancel={() => setOpenBaggage(false)} />
        </div>
      </Modal1>
      <Modal1 open={openSeats} setOpen={setOpenSeats}>
        <div className="card p-10 flex flex-col gap-4">
          <b>Add Seat</b>
          <AddFlightSeats data={{}} cancel={() => setOpenSeats(false)} />
        </div>
      </Modal1>
      {/* <CancelOrder open={cancelBooking} setOpen={() => setCancelBooking(false)}  /> */}
      {/* <Modal1 open={cancelBooking} setOpen={setCancelBooking}>
        <div className="card p-10 flex flex-col gap-4">
          <CancelFlightOrder data={{}} cancel={() => setCancelBooking(false)} />
        </div>
      </Modal1> */}
    </div>
  );
}
