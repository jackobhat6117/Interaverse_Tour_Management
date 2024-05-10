import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/DIsplay/Nav/BreadCrumb";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { decrypt } from "../../../../features/utils/crypto";
import { useSelector } from "react-redux";
import PaymentMethod from "../../../../components/flight/PaymentMethod";
import Icon from "../../../../components/HOC/Icon";
import { formatMoney } from "../../../../features/utils/formatMoney";
import FlightPriceCommission from "../../../../components/flight/FlightPriceCommission";
import getBooking from "../../../../controllers/booking/getBooking";
import { LinearProgress } from "@mui/material";
import { getCurrencySymbol } from "../../../../features/utils/currency";

export default function FlightPayment() {
  const { id } = useParams();
  const qObj = JSON.parse(decrypt(id));
  const { bookingData } = useSelector((state) => state.flightBooking);
  const offer = bookingData?.offer && bookingData?.offer?.at(-1);
  //FIXME: i don't understand whats happening here and the need of all this states
  const paymentData = {
    flightBookingId: bookingData?.orderData?.booking?.flightBooking?.at(0),
    amount: bookingData?.orderData?.params?.offers?.at(0)?.totalAmount,
  };
  const data = {
    ...bookingData?.orderData?.booking,
    paymentData,
    link: `/order/flight/${bookingData?.orderData?.booking?._id}`,
  };

  const [loading, setLoading] = useState(false);
  const [deductCommission, setDeductCommission] = useState(false);
  const [booking, setBooking] = useState();
  const navigate = useNavigate();

  // const location = useLocation();
  // const searchParam = new URLSearchParams(location.search);
  // const canceled = searchParam.get('canceled')

  function handleSearchRoute(i) {
    navigate("/order/new/flight/offers?q=" + id + "&path=" + i);
  }

  // const url = new URL(window.location.href);

  // const searchParams = url.searchParams;
  // searchParams.set('canceled', true);
  // url.search = searchParams.toString();
  // const newUrl = url.toString();

  // if(!canceled)
  //   window.location.href = newUrl

  useEffect(() => {
    if (bookingData?.orderData?.booking?._id) {
      const bookingId = bookingData?.orderData?.booking?._id;
      const fetch = async () => {
        setLoading(true);
        const res = await getBooking(bookingId);
        setLoading(false);
        if (res.return) {
          setBooking(res.data);
          if(res?.data?.booking?.flightBooking?.at(0)?.status === 'Issuable')
            navigate(`/order/flight/${res?.data?.booking?._id}`)
        }
      };
      fetch();
    }
    //eslint-disable-next-line
  }, [bookingData]);
  console.log(window.location.href)

  return (
    <div className="pd-md py-4 flex flex-col gap-4">
      <div className="whitespace-nowrap max-w-full overflow-x-auto pb-2">
        <BreadCrumb>
          <Link to={"/order"}>Orders</Link>
          <Link to="/order/new/flight">New order</Link>
          {qObj?.destinations?.slice(0, 1)?.map((obj, i) => {
            return (
              <p
                // onClick={() => handleSearchRoute(i)}
                className="cursor-pointer"
              >
                {obj.departureLocation} to {obj.arrivalLocation}
              </p>
            );
          })}
          <p>
            Passenger details
          </p>
          {/* <Link to={`/order/new/flight/book/ancillaries/${id}`}>Ancillaries</Link> */}
          <label>Payment</label>
        </BreadCrumb>
      </div>

      {loading ? (
        <LinearProgress /> //TODO: change this
      ) : (
        <div className="flex flex-col gap-6 flex-wrap-reverse md:flex-nowrap items-center justify-center my-10 self-center">
          <div className="flex gap-3 flex-col">
            <div className="bg-theme1/10 px-6 p-4 w-full flex flex-col justify-center gap-4 items-center">
              <h5>Airline Commission</h5>
              <div className="flex gap-2">
                <Icon icon="ep:success-filled" className="text-green-500" />
                {booking?.booking?.flightBooking?.at(0)?.expectedCommission &&
                booking?.booking?.flightBooking?.at(0)?.expectedCommission >
                  0 ? (
                  <p>
                    You qualify for a &nbsp;
                    <b className="font-bold">
                      {formatMoney(
                        booking?.booking?.flightBooking?.at(0)
                          ?.expectedCommission,
                        getCurrencySymbol(
                          booking?.booking?.flightBooking?.at(0)?.currency,
                        ),
                      )}
                    </b>
                    &nbsp; commission on this order
                  </p>
                ) : (
                  <p>You qualify for Zero commission on this order</p>
                )}
              </div>
            </div>
            <FlightPriceCommission
              data={booking}
              deductCommission={deductCommission}
              setDeductCommission={setDeductCommission}
              // footer={
              //   <Link className='btn-theme rounded-md flex justify-center' to={`/order/new/flight/book/payment/${id}`}>Proceed to checkout</Link>
              // }
            />
          </div>
          <PaymentMethod
            className={"w-full"}
            flightBookingId={booking?.booking?.flightBooking[0]?._id}
            deductCommission={deductCommission}
            callback={() => navigate(`/order/flight/${booking?.booking?._id}`)}
          />
        </div>
      )}
    </div>
  );
}
