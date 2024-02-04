import fetchServer from "../../fetchServer";

/**
 *
 * @param {{ clientId:string, clientSecret:string }} param0
 * @returns
 */
export async function updateAmadeusKey({ clientId, clientSecret }) {
  let result = {
    return: 0,
    msg: "Something went wrong adding supplier keys!",
  };

  await fetchServer({
    method: "GET",
    url: "/product/v1/customKey/amadeus",
    data: {
      clientId,
      clientSecret,
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

/**
 *
 * @param {{
 * username:string,
 * password:string,
 * targetBranch:string,
 *}} param0
 * @returns
 */
export async function updateTravelportKey({
  username,
  password,
  targetBranch,
}) {
  let result = {
    return: 0,
    msg: "Something went wrong adding supplier keys!",
  };

  await fetchServer({
    method: "GET",
    url: "/product/v1/customKey/travelport",
    data: {
      username,
      password,
      targetBranch,
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

/**
 *
 * @param {{ userId:string, password:string }} param0
 * @returns
 */
export async function updateSabreKey({ userId, password }) {
  let result = {
    return: 0,
    msg: "Something went wrong adding supplier keys!",
  };

  await fetchServer({
    method: "POST",
    url: "/product/v1/customKey/sabre",
    data: {
      userId,
      password,
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
