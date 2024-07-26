import fetchServer from "../fetchServer";

export default async function getFlightPriceAdjustments() {
  let result = { return: 0, msg: "Something went wrong fetching Price Adjustment!" };

  await fetchServer({
    method: "GET",
    url: "/product/v1/adminFlightPriceAdjustment?limit=0",
  })
    .then((res) => {
      if (res?.data && !res?.data?.error) {
        result = { return: 1, msg: "Successful", data: res?.data };
      } else result["msg"] = res?.data?.error || result["msg"];
    })
    .catch((err) => {
      console.log("Network Error!");
    });

  return result;
}
