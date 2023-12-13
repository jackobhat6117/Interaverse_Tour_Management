import fetchServer from "../../fetchServer";

/**
 *
 * @param {string} id
 * @returns
 */
export default async function deleteBankAccount(id) {
  let result = {
    return: 0,
    msg: "Something went wrong deleting bank account!",
  };

  await fetchServer({
    method: "DELETE",
    url: `/payment/v1/personalAccount/removeBankAccount/${id}`,
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
