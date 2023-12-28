import { useEffect, useState } from "react";
import { formatMoney } from "../../../../features/utils/formatMoney";
import { getCurrencySymbol } from "../../../../features/utils/currency";

export default function PriceSummary({ data }) {
  const [bookingInfo, setBookingInfo] = useState();
  const [payable, setPayable] = useState(0);
  const [passengerInfo, setPassengerInfo] = useState([]);

  useEffect(() => {
    if (data) {
      const formattedData = {
        grandTotal: data?.booking?.flightBooking?.at(0)?.grandTotal,
        basePrice: data?.booking?.flightBooking?.at(0)?.basePrice,
        currency: getCurrencySymbol(
          data?.booking?.flightBooking?.at(0)?.currency,
        ),
        tax:
          data?.booking?.flightBooking?.at(0)?.grandTotal -
          data?.booking?.flightBooking?.at(0)?.basePrice,
        commission: data?.expectedCommission?.commission,
        ticketingFee: data?.booking?.flightBooking?.at(0)?.ticketingFee || 0,
      };
      setPayable(formattedData.grandTotal + formattedData.ticketingFee);
      setBookingInfo(formattedData);
      const pricingInfos = data.orderDetail?.offers?.map(
        (offer) => offer?.pricingInformation?.passengerFares,
      );
      setPassengerInfo(pricingInfos);
    }
  }, [data]);

  return (
    <div className="border p-4 flex flex-col gap-6 md:min-w-[400px]">
      <div className="flex justify-between gap-4">
        <h5>Price Summary</h5>
        <p className="text-xs">
          Sold by {data?.booking?.flightBooking[0]?.airlines?.join(",")} Airline
        </p>
      </div>
      <hr />
      {passengerInfo?.map((passenger) =>
        Object.entries(passenger || {})?.map(([key, obj], i) => (
          <div className=" flex flex-col ">
            <div className="flex gap-4 justify-between font-bold">
              <div>
                Traveler {i + 1}: {key}
              </div>
              <div>{formatMoney(obj.totalPrice, bookingInfo?.currency)}</div>
            </div>
            <div className="flex gap-4 justify-between">
              <div>Flight:</div>
              <div>{formatMoney(obj.basePrice, bookingInfo?.currency)}</div>
            </div>
            <div className="flex gap-4 justify-between">
              <div>Checked Luggage:</div>
              <div>{formatMoney(0, bookingInfo?.currency)}</div>
            </div>
            <div className="flex gap-4 justify-between">
              <div>Seat Selection:</div>
              <div>{formatMoney(0, bookingInfo?.currency)}</div>
            </div>
            <div className="flex gap-4 justify-between">
              <div>Taxes and fees:</div>
              <div>{formatMoney(obj.taxes, bookingInfo?.currency)}</div>
            </div>
          </div>
        )),
      )}
      <hr />
      <div className="flex gap-4 justify-between">
        <h5>Trip Total ({bookingInfo?.currency}):</h5>
        <h5>{formatMoney(payable, bookingInfo?.currency)}</h5>
      </div>
    </div>
  );
}
