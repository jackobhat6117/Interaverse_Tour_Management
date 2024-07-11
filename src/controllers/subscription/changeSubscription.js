import fetchServer from "../fetchServer"

export default async function changeSubscription(data) {
  let result = {return: 0,msg: 'Something went wrong changing plans!'}

  await fetchServer({method: 'PATCH',url: '/payment/v1/accountSubscription/change',data})
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