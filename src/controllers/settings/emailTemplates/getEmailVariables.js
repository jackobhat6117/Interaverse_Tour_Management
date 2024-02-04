import fetchServer from "../../fetchServer";

export default async function getEmailVariables() {
  let result = { return: 0, msg: "Something went wrong fetching webhook!" };

  await fetchServer({
    method: "GET",
    url: "/notification/v1/emailTemplate/variables",
  })
    .then((res) => {
      if (res?.data && !res?.data?.error) {
        result = { return: 1, msg: "Successful", data: res?.data?.data };
      } else result["msg"] = res?.data?.error || result["msg"];
    })
    .catch((err) => {
      console.log("Network Error!");
    });

  return result;
}
