import fetchServer from "../fetchServer";


export default async function getSavedCards() {
  var result = {return: 0,msg: 'Error',data: []}

  await fetchServer({method: "GET",url: `/payment/v1/personalAccount/savedCards`})
  .then((res) => {
    if(res) {
      if(res.status === 200) {
        result = {return: 1,msg: "Successfull",data: res.data.data};
      } else if(res.error) result['msg'] = res.error?.message;
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