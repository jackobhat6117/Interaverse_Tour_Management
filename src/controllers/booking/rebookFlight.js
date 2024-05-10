import fetchServer from "../fetchServer";

export default async function rebookFlight(data) {
  let result = {
    return: 0,
    msg: "Something went wrong booking offer!",
  };

  await fetchServer({
    method: "PATCH",
    url: `/product/v1/book/rebook`,
    data
  })
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
        result = { return: 1, msg: "Successful", data: res?.data?.data };
      } else if (res?.data?.error) result = {msg: res.data.error,data: res?.data?.detail,code: res?.data?.code};
    })
    .catch((err) => {
      console.log("Network Error!");
    });

  return result;
}
