import fetchServer from "../../fetchServer";

export default async function getBanks() {
  let result = { return: 0, msg: "Something went wrong fetching banks!" };

  await fetchServer({ method: "GET", url: "/payment/v1/personalAccount/banks" })
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
