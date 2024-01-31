import fetchServer from "../fetchServer";

export default async function updateUserType(data) {
  let result = {return: 0,msg: 'Something went wrong updating profile!'}

  await fetchServer({method: 'PATCH',url: '/main/v1/account/setUserType?populate=detail',data})
  .then((res) => {
    if(res?.data && !res?.data?.error) {
      result = {return: 1,msg: 'Successfull',data: res.data.data}
    } else result['msg'] = res?.data?.error || result['msg']
  })
  .catch((err) => {
    console.log('Network Error!')
  })

  return result;
}