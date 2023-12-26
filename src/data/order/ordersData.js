import moment from "moment";
import { getCurrencySymbol } from "../../features/utils/countires";

export function templateFlightOrderData(obj) {
  // let data = mergeRecursive({...obj},ordersDataTemplate)
  let data = {
    id: obj?._id,
    bookingId: obj?.bookingId,
    date: moment(obj?.createdAt)?.format("DD, MMM"),
    name: obj?.account?.firstName + " " + obj?.account?.lastName,
    provider: obj?.flightBooking?.at(0)?.supplier,
    type: "Flight",
    currency: getCurrencySymbol(obj?.flightBooking?.at(0)?.currency),
    amount: obj?.flightBooking?.at(0)?.grandTotal,
    commission: obj?.flightBooking?.at(0)?.expectedCommission,
    updatedDate: moment(obj?.updatedAt)?.format("DD/MM/YYYY"),
    bookRef: obj?.flightBooking?.at(0)?.pnr,
    status: obj?.flightBooking?.at(0)?.status,
  };

  return data;
}
