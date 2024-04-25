import fetchServer from "../../fetchServer";


export default async function listQueueTicket(data) {
  var result = {return: 0,msg: 'Failed queueing ticket',data: []}

  await fetchServer({method: "GET",url: `/product/v1/ticket/queue?populate=flightBooking`,data})
  .then((res) => {
    if(res) {
      if(res.status === 200) {
        result = {return: 1,msg: "Successfull",data: res.data.data};
      } else if (res?.data?.error) result["msg"] = res.data.error;
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