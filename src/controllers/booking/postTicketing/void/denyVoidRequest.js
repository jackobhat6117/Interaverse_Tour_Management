import fetchServer from "../../../fetchServer";


export default async function denyVoidRequest(id) {
  var result = {return: 0,msg: 'Something went wrong denying request',data: []}

  await fetchServer({method: "PATCH",url: `/product/v1/voidTicket/deny/${id}`})
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