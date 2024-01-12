import fetchServer from "../../fetchServer";

export async function changeSupplierStatus(data) {
  let result = {
    return: 0,
    msg: "Something went wrong changing status supplier keys!",
  };

  await fetchServer({
    method: "POST",
    url: "/product/v1/customKey/changeStatus",
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
