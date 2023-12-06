import fetchServer from "../../fetchServer";

export default async function addBankAccount(data) {
  let result = {
    return: 0,
    msg: "Something went wrong adding bank account!",
  };

  await fetchServer({
    method: "POST",
    url: "/payment/v1/personalAccount/addBankAccount",
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
