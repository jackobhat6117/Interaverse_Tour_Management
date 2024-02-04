import fetchServer from "../fetchServer";

export default async function getWebhooks() {
  let result = {return: 0,msg: 'Something went wrong fetching webhooks!'}

  await fetchServer({method: 'GET',url: '/main/v1/webhook'})
  .then((res) => {
    if(res?.data && !res?.data?.error) {
      result = {return: 1,msg: 'Successfull',data: res?.data?.data}
    } else result['msg'] = res?.data?.error || result['msg']
  })
  .catch((err) => {
    console.log('Network Error!')
  })

  return result;
}