import fetchServer from "../fetchServer";

export default async function verifyEmail(data) {
  let result = {return: 0,msg: 'Sorry, not valid!'}

  await fetchServer({method: 'GET',url: '/main/v1/account/verifyEmail'+(data?'?'+data:'')})
  .then((res) => {
    if(res?.data && !res?.data?.error) {
      result = {return: 1,msg: res?.data?.message || 'Successfull',data: res.data}
    } else result['msg'] = res?.data?.error || result['msg']
  })
  .catch((err) => {
    console.log('Network Error!')
  })

  return result;
}