import fetchServer from "../../fetchServer";

export async function getRolesPermissions() {
  let result = {return: 0, msg: "Something went wrong fetching Roles!"};

  await fetchServer({method: "GET",url: "/main/v1/role/permissions"})
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
