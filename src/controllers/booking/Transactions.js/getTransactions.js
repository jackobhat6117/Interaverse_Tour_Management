import fetchServer from "../../fetchServer";


export default async function getTransactions(query) {
  var result = {return: 0,msg: 'Failed queueing ticket',data: []}

  await fetchServer({method: "GET",url: `/payment/v1/payment/transactions${query?'?'+query:''}`})
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