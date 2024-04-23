import fetchServer from "../../fetchServer";

export async function createRoles(data) {
  let result = {return: 0, msg: "Something went wrong creating Role!"};

  await fetchServer({method: "POST",url: "/main/v1/role",data})
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
