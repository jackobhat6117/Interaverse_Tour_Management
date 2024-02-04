import fetchServer from "../fetchServer";

export default async function googleSignup(data) {
  let result = {return: 0,msg: 'Something went wrong logging user!'}

  await fetchServer({method: 'GET',url: '/main/v1/auth/google',data})
  .then((res) => {
    if(res.data && res?.data?.data) {
      result = {return: 1,msg: 'Welcome',data: res.data?.data}
    } else result['msg'] = res?.data?.error || result['msg']
  })
  .catch((err) => {
    console.log('Network Error!')
  })

  return result;
}