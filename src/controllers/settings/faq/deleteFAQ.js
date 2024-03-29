import fetchServer from "../../fetchServer";

export default async function deleteFAQ(id) {
  let result = {
    return: 0,
    msg: "Something went wrong removing QA!",
  };

  await fetchServer({
    method: "DELETE",
    url: "/main/v1/faq/"+id,
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
