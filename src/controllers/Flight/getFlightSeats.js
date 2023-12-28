import fetchServer from "../fetchServer";


export default async function getFlightSeats(data) {
  var result = {return: 0,msg: 'Error',data: {}}

  await fetchServer({method: "POST",url: `/product/v1/flight/seatmap/`,data})
  .then((res) => {
    if(res) {
      if(res.status === 200) {
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