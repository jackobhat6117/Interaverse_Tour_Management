import fetchServer from "../../fetchServer";

export default async function getWalletTransactions(range) {
  let result = {
    return: 0,
    msg: "Something went wrong fetching wallet transactions!",
  };

  await fetchServer({
    method: "GET",
    url: `/payment/v1/payment/transactions?filterBy=reason&filterValue=Wallet${
      range ? `&range=${range}` : ""
    }`,
  })
    .then((res) => {
      if (res?.data && !res?.data?.error) {
        result = { return: 1, msg: "Successful", data: res?.data?.data };
      } else if (res?.data?.error) result["msg"] = res.data.error;
    })
    .catch((err) => {
      console.log("Network Error!");
    });

  return result;
}
