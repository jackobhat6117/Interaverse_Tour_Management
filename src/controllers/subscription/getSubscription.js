import fetchServer from "../fetchServer"

export default async function getSubscription(id) {
  let result = {return: 0,msg: 'Something went wrong getting subscription!'}

  await fetchServer({method: 'GET',url: '/payment/v1/accountSubscription/account/'+id+'?populate=plan'})
  .then((res) => {
    if(res?.data && !res?.data?.error) {
      result = {return: 1,msg: 'Successfull',data: res?.data?.data}
    } else if(res?.data?.error) result['msg'] = res.data.error
  })
  .catch((err) => {
    console.log('Network Error!')
  })

  return result;
}
