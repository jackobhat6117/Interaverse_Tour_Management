import fetchServer from "../../fetchServer";

export default async function getDealCodes() {
  let result = {
    return: 0,
    msg: "Something went wrong fetching deal code!",
  };

  await fetchServer({
    method: "GET",
    url: "/product/v1/dealCode",
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
