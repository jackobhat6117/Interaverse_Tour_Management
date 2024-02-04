import fetchServer from "../../fetchServer";

export default async function setLowBalanceThreshold(data) {
  let result = { return: 0, msg: "Something went wrong setting threshold!" };

  await fetchServer({
    method: "POST",
    url: "/payment/v1/wallet/lowbalance",
    data,
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
