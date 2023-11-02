import { store } from "../../redux/store";
import fetchServer from "../fetchServer";

export async function shareFlightOffer(data) {
  var result = {return: 0,msg: 'Error',data: {}}

  let token = store.getState().user.userData.accessToken;

  let headers = {Authorization: `Bearer ${token}`}
  // if(userId)
  //   headers['user-id'] = userId

  await fetchServer({method: "POST",url: `/flights/email-offer-link`,data,
    headers
  })
  .then((res) => {
    console.log(" => ",{...res})
    if(res) {
      if(res.data.success) {
        result = {return: 1,msg: "Successfull",data: res.data.data};
      }
    } 
  })
  .catch((err) => {
    console.log("Network Error: ",err);
  })

  return result;

}