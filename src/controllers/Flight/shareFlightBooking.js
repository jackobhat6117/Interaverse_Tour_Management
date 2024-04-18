import { store } from "../../redux/store";
import fetchServer from "../fetchServer";

export async function shareFlightBooking(data) {
  var result = {return: 0,msg: 'Error',data: {}}

  let token = store.getState().user.userData.accessToken;

  let headers = {Authorization: `Bearer ${token}`}
  // if(userId)
  //   headers['user-id'] = userId

  await fetchServer({method: "POST",url: `/product/v1/book/shareBooking`,data,
    headers
  })
  .then((res) => {
    if(res) {
      if(res?.status === 200) {
        result = {return: 1,msg: "Successfull",data: res.data.data};
      } else if(res?.message) result['msg'] = res?.message;
    } 
  })
  .catch((err) => {
    console.log("Network Error: ",err);
  })

  return result;

}