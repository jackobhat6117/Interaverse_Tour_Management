import { store } from "../../redux/store";
import fetchServer from "../fetchServer";

export async function shareFlightBookingPDF(data) {
  var result = {return: 0,msg: 'Error',data: {}}

  let token = store.getState().user.userData.accessToken;

  let headers = {Authorization: `Bearer ${token}`}
  // if(userId)
  //   headers['user-id'] = userId

  await fetchServer({method: "POST",url: `/notification/v1/sendMail/itineraryPdf`,data,
    headers
  })
  .then((res) => {
    if(res) {
      if(res?.status === 200) {
        result = {return: 1,msg: "PDF Sent",data: res.data.data};
      } else if(res?.message) result['msg'] = res?.message;
    } 
  })
  .catch((err) => {
    console.log("Network Error: ",err);
  })

  return result;

}