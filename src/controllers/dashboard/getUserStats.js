import fetchServer from "../fetchServer";

export async function getUserStats(startDate, endDate) {
  let result = { return: 0, msg: "Something went wrong fetching stats!" };

  await fetchServer({
    method: "GET",
    url: `/main/v1/statistics?startDate=${startDate}&endDate=${endDate}`,
  })
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
