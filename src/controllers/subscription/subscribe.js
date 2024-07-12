import fetchServer from "../fetchServer"

export default async function subscribe(data) {
  let result = {return: 0,msg: 'Something went wrong getting plans!'}

  await fetchServer({method: 'POST',url: '/payment/v1/accountSubscription/initiateSubscription',data})
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