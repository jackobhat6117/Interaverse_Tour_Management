import Icon from "../../../../components/HOC/Icon";
import airline from "../../../../assets/images/airline.svg";
import { useEffect, useState } from "react";

export default function FlightInfo({ minify, data }) {
  const [formattedOrder, setFormattedOrder] = useState();
  let obj = {
    from: "CHE",
    to: "London",
    origin: "LOS",
    destination: "LHR",
    airline: "Turkish Airline",
    airlineIcon: airline,
    departureDate: "Sat, 08 April 2023",
    departureTime: "11:50pm",
    ArrivalDate: "Sat, 08 April 2023",
    arrivalTime: "9:20pm",
    airport: "Murtala Mohammed International Airport",
    duration: "12 hours 14 mins",
    stops: 2,
  };

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-2 items-center">
          <img src={obj.offer} alt="" className="w-16 h-16" />
          <small className="font-bold">{obj.airline}</small>
        </div>
        <div className="flex flex-1 justify-start items-center gap-4">
          <h5>{obj.from}</h5>
          <hr className="w-[50px] border-primary/50" />
          <h5>{obj.to}</h5>
        </div>
        <div>
          {obj?.departureTime} - {obj?.arrivalTime} &nbsp;
          <span className="text-theme1">
            ({obj?.duration}, {obj?.stops || 0} stops)
          </span>
          <div>
            {obj?.origin} - {obj?.destination}
          </div>
        </div>
      </div>

      {!minify ? (
        <div className="flex flex-col gap-0">
          <div className="flex gap-4 items-center z-10">
            <span className="w-3 h-3 rounded-full bg-theme1"></span>
            <b>{obj?.departureDate}</b>
            <p>Departing from {obj?.airport}</p>
          </div>
          <div className="flex gap-4 items-center h-14 -my-2">
            <div className="vr translate-x-[4.5px] w-3 h-full"></div>
            <p className="text-xs">Flight duration {obj?.duration}</p>
          </div>
          <div className="flex gap-4 items-center z-10">
            <span className="w-3 h-3 rounded-full bg-theme1"></span>
            <b>{obj?.ArrivalDate}</b>
            <p>Arriving at {obj?.airport}</p>
          </div>
        </div>
      ) : null}

      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="flex gap-6 text-primary/50">
          <span>Economy</span>
          <span>{obj?.airline}</span>
          <span>Boeing 777-300</span>
          <span>ZZ71234</span>
        </div>

        <div className="bg-primary/10 rounded-md p-4 flex gap-4 text-theme1">
          <Icon icon="el:plane" className="!w-4 !h-4" />
          <Icon icon="streamline:wifi-solid" className="!w-4 !h-4" />
          <Icon icon="ion:stopwatch" className="!w-4 !h-4" />
          <Icon icon="ion:fast-food" className="!w-4 !h-4" />
          <Icon
            icon="ic:round-airline-seat-recline-normal"
            className="!w-4 !h-4"
          />
        </div>
      </div>
    </div>
  );
}
