import fetchServer from "../../fetchServer";

/**
 *
 * @param {string} reference
 * @returns
 */
export default async function topUpWalletUsingModal(reference) {
  let result = { return: 0, msg: "Something went wrong removing member!" };

  await fetchServer({
    method: "POST",
    url: "/payment/v1/wallet/topUpUsingModal",
    data: {
      reference,
    },
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
