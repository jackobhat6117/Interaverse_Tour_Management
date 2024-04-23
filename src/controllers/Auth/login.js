import fetchServer from "../fetchServer";

export default async function login(data) {
  let result = {return: 0,msg: 'Something went wrong logging user!'}

  await fetchServer({method: 'POST',url: '/main/v1/account/login?populate=detail',data})
  .then((res) => {
    if(res.data && res?.data?.data) {
      result = {return: 1,msg: 'Welcome',data: res.data?.data}
    } else {
      result['msg'] = res?.data?.error || result['msg']
      result['data'] = res?.data;
    }
  })
  .catch((err) => {
    console.log(err)
    result['msg'] = err.message
    console.log('Network Error!')
  })

  return result;
}