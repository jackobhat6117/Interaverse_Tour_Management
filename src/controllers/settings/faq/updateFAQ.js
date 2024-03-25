import fetchServer from "../../fetchServer";

export default async function updateFAQ(id,data) {
  let result = {
    return: 0,
    msg: "Something went wrong updating QA!",
  };

  await fetchServer({
    method: "PATCH",
    url: "/main/v1/faq/"+id,
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
