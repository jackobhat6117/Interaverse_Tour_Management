import Icon from "../../../../components/HOC/Icon";
import { useEffect, useState } from "react";
import moment from "moment";
import { FlightAmenities } from "../../../../components/flight/FlightInfoCard";

export default function FlightInfo({ minify, data }) {
  const [formattedOrder, setFormattedOrder] = useState();

  console.log(data)
  useEffect(() => {
    if ((data?.orderDetail?.offers || data?.booking?.flightBooking) && !formattedOrder) {
      const segments = 
        (data?.orderDetail?.pricing?.offers &&
        Array.isArray(data?.orderDetail?.pricing?.offers) &&
        data?.orderDetail?.pricing?.offers?.flatMap((offer) =>
          offer.directions.flat(),
        )) || data?.booking?.flightBooking?.at(0)?.flights;

      const originalSegments =
        data?.orderDetail?.pricing?.offers &&
        Array.isArray(data?.orderDetail?.pricing?.offers) &&
        data?.orderDetail?.pricing?.offers
          ?.flatMap((offer) => offer.destinations)
          .slice();
      const destinations = originalSegments?.at(0);

      const formatted = segments.map((segment) => ({
        ...segment,
        from: segment?.departure?.location || segment?.departureLocationName,
        to: segment?.arrival?.location || segment?.arrivalLocationName,
        origin: destinations?.from || segment?.departureLocation,
        destination: destinations?.to || segment?.arrivalLocation,
        airline: segment?.airline?.image?.description || segment?.airlineName,
        airlineIcon: segment?.airline?.image?.url || segment?.airlineImage,
        departureDate: segment?.departure?.date || segment?.departureDate,
        departureTime: segment?.departure?.time || segment?.departureTime,
        ArrivalDate: segment?.arrival?.date || segment?.arrivalDate,
        arrivalTime: segment?.arrival?.time || segment?.arrivalTime,
        departureAirport: segment?.departure?.airport || segment?.departureLocation,
        arrivalAirport: segment?.arrival?.airport || segment?.arrivalLocation,
        duration: moment
          .duration(
            moment(
              `${segment?.arrival?.date || segment?.arrivalDate} ${segment?.arrival?.time || segment?.arrivalTime}`,
              "MMM DD YYYY HH:mm",
            ).diff(
              moment(
                `${segment?.departure?.date || segment?.departureDate} ${segment?.departure?.time || segment.departureTime}`,
                "MMM DD YYYY HH:mm",
                "HH:mm",
              ),
              "minutes",
            ),
            "minutes",
          )
          .humanize() || segment?.duration,
        stops: segment?.numberOfStops || segment?.stops,
      }));
      setFormattedOrder(formatted);
    }
  }, [data, formattedOrder]);

  console.log(formattedOrder)

  return (
    <>
      {formattedOrder?.map((formatted, index) => (
        <div className="flex flex-col gap-4" key={index}>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-2 items-center">
              <img src={formatted.airlineIcon} alt="" className="w-16 h-16" />
              <small className="font-bold min-w-[130px] text-center">{formatted.airline}</small>
            </div>
            <div className="flex gap-4 items-center flex-wrap sm:flex-nowrap">
              <div className="flex flex-1 justify-start items-center gap-4 flex-wrap">
                <h5>{formatted.from}</h5>
                <hr className="w-[10px] sm:w-[50px] border-primary/50" />
                <h5>{formatted.to}</h5>
              </div>
              <div className="flex gap-2 flex-wrap max-w-[300px]">
                {formatted?.departureTime} - {formatted?.arrivalTime}
                <span className="text-theme1">
                  ({formatted?.duration}, {formatted?.stops || 0} stops)
                </span>
                <div>
                  {formatted?.origin} - {formatted?.destination}
                </div>
              </div>
            </div>
          </div>

          {!minify ? (
            <div className="flex flex-col gap-0">
              <div className="flex gap-4 items-center ">
                <span className="w-3 h-3 rounded-full bg-theme1"></span>
                <b>{formatted?.departureDate}</b>
                <p>Departing from {formatted?.departureAirport}</p>
              </div>
              <div className="flex gap-4 items-center h-14 -my-2">
                <div className="vr translate-x-[4.5px] w-3 h-full"></div>
                <p className="text-xs">Flight duration {formatted?.duration}</p>
              </div>
              <div className="flex gap-4 items-center ">
                <span className="w-3 h-3 rounded-full bg-theme1"></span>
                <b>{formatted?.ArrivalDate}</b>
                <p>Arriving at {formatted?.arrivalAirport}</p>
              </div>
            </div>
          ) : null}

          <div className="flex justify-between items-center gap-4 flex-wrap">
            <div className="flex gap-6 text-primary/50 max-w-full overflow-x-auto whitespace-nowrap pb-2">
              <span>{formatted?.cabinClass}</span>
              <span>{formatted?.airline}</span>
              <span>{formatted?.aircraftType}</span>
              <span>{formatted?.flightNumber}</span>
            </div>

            <div className="bg-primary/10 rounded-md px-4 py-2 flex gap-4 text-theme1">
              <FlightAmenities flight={formattedOrder} />
              {/* <Icon icon="el:plane" className="!w-4 !h-4" />
              <Icon icon="streamline:wifi-solid" className="!w-4 !h-4" />
              <Icon icon="ion:stopwatch" className="!w-4 !h-4" />
              <Icon icon="ion:fast-food" className="!w-4 !h-4" />
              <Icon
                icon="ic:round-airline-seat-recline-normal"
                className="!w-4 !h-4"
              /> */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
