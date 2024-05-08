import { useEffect, useState } from "react";
import { getCurrencySymbol } from "../../features/utils/currency";
import { formatMoney } from "../../features/utils/formatMoney";
import Checkbox from "../form/Checkbox";

export default function FlightPriceCommission({
  data,
  deductCommission,
  setDeductCommission,
}) {
  const [bookingInfo, setBookingInfo] = useState();
  const [payable, setPayable] = useState(0);

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
        commission: data?.booking?.flightBooking?.at(0)?.expectedCommission,
        ticketingFee: data?.booking?.flightBooking?.at(0)?.ticketingFee || 0,
        payable: data?.booking?.flightBooking?.at(0)?.payable,
      };
      setPayable(formattedData.grandTotal + formattedData.ticketingFee);
      setBookingInfo(formattedData);
    }
  }, [data]);

  useEffect(() => {
    if (deductCommission) {
      const totalPayable =
        bookingInfo?.grandTotal +
        bookingInfo?.ticketingFee -
        bookingInfo?.commission;
      setPayable(totalPayable);
    } else {
      const totalPayable = bookingInfo?.grandTotal + bookingInfo?.ticketingFee;
      setPayable(totalPayable);
    }
  }, [
    bookingInfo?.commission,
    bookingInfo?.grandTotal,
    bookingInfo?.ticketingFee,
    deductCommission,
  ]);

  return (
    <div className="border p-4 flex flex-col gap-4 md:min-w-[400px]">
      <div className="border-b pb-3 flex justify-between items-center gap-4">
        <h6>Price Summary</h6>
        <p>Amount</p>
      </div>
      {/* <div>{tripType} flight</div> */}
      <div className="flex flex-col ">
        <div className="flex gap-4 justify-between font-bold">
          <h6>Order total:</h6>
          <b>{formatMoney(bookingInfo?.grandTotal, bookingInfo?.currency)}</b>
        </div>
        <div className="flex gap-4 justify-between">
          <span>Flight:</span>
          <span>
            {formatMoney(bookingInfo?.basePrice, bookingInfo?.currency)}
          </span>
        </div>
        <div className="flex gap-4 justify-between">
          <span>Tax:</span>
          <span>{formatMoney(bookingInfo?.tax, bookingInfo?.currency)}</span>
        </div>
        <br />
        <hr />
        <div className="flex gap-4 justify-between font-bold">
          <h6>Payable to Intraverse:</h6>
          <b>{formatMoney(bookingInfo?.payable, bookingInfo?.currency)}</b>
        </div>
        <div className="flex gap-4 justify-between">
          <span>Commission:</span>
          <span>
            +{formatMoney(bookingInfo?.commission, bookingInfo?.currency)}
          </span>
        </div>
        <div className="flex gap-4 justify-between">
          <span>Ticketing Fee:</span>
          <span>
            -{formatMoney(bookingInfo?.ticketingFee, bookingInfo?.currency)}
          </span>
        </div>
      </div>
      <hr />
      <div className="flex gap-6 justify-between ">
        <div className="flex flex-wrap gap-2 items-center">
          <h6>Claim commission </h6>
          <small>(Deduct commission from payable)</small>
        </div>
        <Checkbox
          value={deductCommission}
          onChange={(e) => setDeductCommission(e.target.checked)}
        />
      </div>
      <hr />
      {/* {Object.entries(data?.passengers || {})?.map(([key,obj],i) => 
        <div className='text-theme1 flex flex-col '>
          <div className='flex gap-4 justify-between font-bold'>
            <div>Traveler {i+1}: {key}</div>
            <div>{formatMoney(obj.totalAmount)}</div>
          </div>
          <div className='flex gap-4 justify-between'>
            <div>Flight:</div>
            <div>{formatMoney(obj.totalAmountWithoutTax)}</div>
          </div>
          <div className='flex gap-4 justify-between'>
            <div>Tax:</div>
            <div>{formatMoney(obj.taxes)}</div>
          </div>
        </div>
      )} */}
      <div className="flex gap-4 justify-between">
        <h5>Payable due:</h5>
        <h5>{formatMoney(payable, bookingInfo?.currency)}</h5>
      </div>
    </div>
  );
}
