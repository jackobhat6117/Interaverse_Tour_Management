import fetchServer from "../../fetchServer";

/**
 *
 * @param {"FlightCommission"|"HotelCommission"} commissionType
 * @param {"Pending"|"Success"|"Failed"} status
 * @returns
 */
export default async function getCommissionTransactions(
  commissionType = "FlightCommission",
  status,
  range,
  keyword,
) {
  let result = {
    return: 0,
    msg: "Something went wrong fetching flight commissions!",
  };

  await fetchServer({
    method: "GET",
    url: `/payment/v1/payment/transactions?filterBy=reason${
      status ? ",status" : ""
    }&filterValue=${commissionType}${status ? "," + status : ""}${
      range ? `&range=${range}` : ""
    }&searchBy=transactionRef&keyword=${keyword ? keyword : ""}`,
  })
    .then((res) => {
      if (res?.data && !res?.data?.error) {
        result = { return: 1, msg: "Successful", data: res.data };
      } else result["msg"] = res?.data?.error || result["msg"];
    })
    .catch((err) => {
      console.log("Network Error!");
    });

  return result;
}
