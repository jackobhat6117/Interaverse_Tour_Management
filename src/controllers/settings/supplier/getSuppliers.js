import fetchServer from "../../fetchServer";


export default async function getSuppliersName() {
  let result = {
    return: 0,
    msg: "Something went wrong getting supplier keys!",
  };

  await fetchServer({ method: "GET", url: "/product/v1/flightSetting" })
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
