import fetchServer from "../fetchServer";

export default async function updateFlightBooking(data) {
  let result = {
    return: 0,
    msg: "Something went wrong updating booking!",
  };

  await fetchServer({
    method: "PATCH",
    url: `/product/v1/flightOrder/updateOrder`,
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
