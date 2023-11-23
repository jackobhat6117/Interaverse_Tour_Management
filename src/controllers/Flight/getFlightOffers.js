import { store } from "../../redux/store";
import fetchServer from "../fetchServer";


export default async function getFlightOffers(obj,userId) {
  var result = {return: 0,msg: 'Error',data: {}}

  let token = store.getState().user.userData.accessToken;
  
  console.log("on price req : ",obj);

  let headers = {Authorization: `Bearer ${token}`}

  if(userId)
    headers['user-id'] = userId;

  await fetchServer({method: "POST",url: `/product/v1/flight/search/`,
    data: obj,
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
    
    // result = {return: 1,msg: 'Successfull',data:[]}
  })

  return result;
}