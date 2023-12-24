import fetchServer from "../fetchServer";

export default async function payForTicket(obj) {
  var result = { return: 0, msg: "Error", data: {} };

  await fetchServer({
    method: "POST",
    url: `/payment/v1/payment/ticket/`,
    data: obj,
  })
    .then((res) => {
      console.log(" => ", { ...res });
      if (res) {
        if (res.status === 200) {
          result = { return: 1, msg: "Successful", data: res.data.data };
        } else if (res?.data?.error) result["msg"] = res.data.error;
      }
    })
    .catch((err) => {
      console.log("Network Error: ", err);
    });

  return result;
}
