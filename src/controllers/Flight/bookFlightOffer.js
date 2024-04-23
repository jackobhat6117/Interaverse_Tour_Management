import { store } from "../../redux/store";
import fetchServer from "../fetchServer";

export default async function bookFlightOffer(obj, userId) {
  var result = { return: 0, msg: "Error", data: {} };

  let token = store.getState().user.userData.accessToken;

  let headers = { Authorization: `Bearer ${token}` };

  if (userId) headers["user-id"] = userId;

  await fetchServer({
    method: "POST",
    url: `/product/v1/book/`,
    data: obj,
    headers,
  })
    .then((res) => {
      if (res) {
        if (res.status === 200) {
          result = { return: 1, msg: "Successfull", data: res.data.data || [] };
        } 
        else if(res?.data?.code === 69)
          result = { return:0, msg: 'Price Changed', data: res?.data?.detail};
        else if (res?.data?.error) {
          result["msg"] = res.data.error
        };
      }
    })
    .catch((err) => {
      console.log("Network Error: ", err);

      // result = {return: 1,msg: 'Successfull',data:[]}
    });

  return result;
}
