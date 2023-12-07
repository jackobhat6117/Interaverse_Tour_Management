import fetchServer from "../fetchServer";


export default async function getFlightBooking(id) {
  var result = {return: 0,msg: 'Error',data: []}

  await fetchServer({method: "GET",url: `/product/v1/book/${id}?populate=flightBooking`})
  .then((res) => {
    console.log(" => ",{...res})
    if(res) {
      if(res.status === 200) {
        result = {return: 1,msg: "Successfull",data: res.data.data};
      }
    } 
  })
  .catch((err) => {
    console.log(err.message,err);
    if(err.message === 'Network Error!') {
      result['msg'] = 'Network Error!';
      result['error'] = 'Please check your connection.';
    }
  })

  return result;
}