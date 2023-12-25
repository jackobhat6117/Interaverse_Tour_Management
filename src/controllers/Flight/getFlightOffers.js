import { store } from "../../redux/store";
import fetchServer from "../fetchServer";

export default async function getFlightOffers(obj, userId) {
  var result = { return: 0, msg: "Error", data: [] };

  let token = store.getState().user.userData.accessToken;
  let headers = { Authorization: `Bearer ${token}` };

  if (userId) headers["user-id"] = userId;

  await fetchServer({
    method: "POST",
    url: `/product/v1/flight/search/`,
    data: obj,
    headers,
  })
    .then((res) => {
      if (res) {
        if (res.status === 200) {
          result = { return: 1, msg: "Successful", data: res.data.data };
        }
      }
    })
    .catch((err) => {
      console.log(err.message, err);
      if (err.message === "Network Error!") {
        result["msg"] = "Network Error!";
        result["error"] = "Please check your connection.";
      }
    });

  return result;
}
