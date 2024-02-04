import fetchServer from "../fetchServer";

export default async function pingWebhook(id) {
  let result = {return: 0,msg: 'Something went wrong pinging webhook!'}

  await fetchServer({method: 'GET',url: '/main/v1/webhook/ping/'+id})
  .then((res) => {
    if(res?.data && !res?.data?.error) {
      result = {return: 1,msg: 'Successfull',data: res?.data}
    } else result['msg'] = res?.data?.error || result['msg']
  })
  .catch((err) => {
    console.log('Network Error!')
  })

  return result;
}