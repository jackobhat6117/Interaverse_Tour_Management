import fetchServer from "../fetchServer";

/**
 *
 * @param {"Pending"|"Success"|"Failed"} status
 * @returns
 */
export default async function getPointTransactions(status, keyword) {
  let result = {
    return: 0,
    msg: "Something went wrong fetching miles points!",
  };

  await fetchServer({
    method: "GET",
    url: `/payment/v1/payment/transactions?filterBy=reason${
      typeof status !== "undefined" ? ",isCredit" : ""
    }&filterValue=Point${
      typeof status !== "undefined" ? "," + status : ""
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
