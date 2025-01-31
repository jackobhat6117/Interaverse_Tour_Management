import fetchServer from "../fetchServer"

export default async function getPlans() {
  let result = {return: 0,msg: 'Something went wrong getting plans!'}

  await fetchServer({method: 'GET',url: '/payment/v1/plan?isActive=true&orderBy=price&order=asc'})
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
