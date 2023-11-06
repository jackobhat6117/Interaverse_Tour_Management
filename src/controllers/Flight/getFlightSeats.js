import { path } from "../../config";
import { store } from "../../redux/store";
import fetchServer from "../fetchServer";


export default async function getFlightSeats(data) {
  var result = {return: 0,msg: 'Error',data: {}}

  let token = store.getState().user.userData.accessToken;
  
  await fetchServer({method: "POST",url: path.api+`/airs/air-retrieve-seat-map/`,data,
      headers: {Authorization: `Bearer ${token}`}
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