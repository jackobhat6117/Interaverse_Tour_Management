import fetchServer from "../fetchServer";


export default async function getPoints() {
  let result = { return: 0, msg: "Something went wrong fetching miles points!" };

  await fetchServer({ method: "GET", url: "/payment/v1/milesPoint/getPoints" })
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
