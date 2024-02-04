import fetchServer from "../../fetchServer";

/**
 *
 * @param {string} id
 * @param {{accountNumber:number,bankCode:number}} data
 * @returns
 */
export default async function updateBankAccount(id, data) {
  let result = {
    return: 0,
    msg: "Something went wrong updating bank account!",
  };

  await fetchServer({
    method: "PATCH",
    url: `/payment/v1/personalAccount/updateBankAccount/${id}`,
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
