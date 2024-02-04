import fetchServer from "../fetchServer";

export default async function suspendWebhook(id) {
  let result = {return: 0,msg: 'Something went wrong suspending webhook!'}

  await fetchServer({method: 'PATCH',url: '/main/v1/webhook/suspend/'+id})
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