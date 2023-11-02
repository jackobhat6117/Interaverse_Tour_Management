import { store } from "../../redux/store";
import fetchServer from "../fetchServer";


export default async function getAirlineCodes(val) {
  var result = {return: 0,msg: 'Error',data: {}}

  let token = store.getState().user.userData.accessToken;
  
  // console.log("got iata q: ",val)
  await fetchServer({method: "GET",url: `/flights/airline-codes/${val}`,
      headers: {Authorization: `Bearer ${token}`}
  })
  .then((res) => {
    // console.log(" => ",{...res})
    if(res) {
      if(res.status === 200) {
        result = {return: 1,msg: "Successfull",data: res.data};
      }
    } 
  })
  .catch((err) => {
    console.log("Network Error: ",err);
    
    // result = {return: 1,msg: 'Successfull',data:[]}
  })

  return result;
}