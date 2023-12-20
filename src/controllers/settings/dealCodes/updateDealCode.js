import fetchServer from "../../fetchServer";

export default async function updateDealCode(id, data) {
  let result = {
    return: 0,
    msg: "Something went wrong updating deal code!",
  };

  await fetchServer({
    method: "PATCH",
    url: `/product/v1/dealCode/${id}`,
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
