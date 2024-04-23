import fetchServer from "../fetchServer";

export default async function updateEmail(data) {
  let result = {return: 0,msg: 'Something went wrong updating profile!'}

  await fetchServer({method: 'PATCH',url: '/main/v1/account/updateEmail?populate=detail',data})
  .then((res) => {
    console.log(res)
    if(res?.data && !res?.data?.error) {
      result = {return: 1,msg: res?.data?.message || 'Successfull',data: res.data.data}
    } else result['msg'] = res?.data?.error || result['msg']
  })
  .catch((err) => {
    console.log('Network Error!')
  })

  return result;
}