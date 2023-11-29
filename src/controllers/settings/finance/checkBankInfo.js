import fetchServer from "../../fetchServer";

export default async function checkBankInfo(data) {
  let result = {
    return: 0,
    msg: "Something went wrong checking bank info!",
  };

  await fetchServer({
    method: "POST",
    url: "/payment/v1/payment/checkBankAccount",
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
