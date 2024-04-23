import fetchServer from "../../fetchServer";

export async function deleteRoles(id) {
  let result = {return: 0, msg: "Something went wrong removing Role!"};

  await fetchServer({method: "DELETE",url: `/main/v1/role/${id}`})
    .then((res) => {
      if (res?.data && !res?.data?.error) {
        result = { return: 1, msg: "Successful", data: res?.data?.data};
      } else if (res?.data?.error) result["msg"] = res.data.error;
    })
    .catch((err) => {
      console.log("Network Error!");
    });

  return result;
}
