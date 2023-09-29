import fetchServer from "../fetchServer";

export default async function updateProfile(data) {
  let result = {return: 0,msg: 'Something went wrong updating profile!'}

  await fetchServer({method: 'POST',url: '/main/v1/account/update?populate=detail',data})
  .then((res) => {
    if(res?.data && !res?.data?.error) {
      result = {return: 1,msg: 'Successfull',data: res.data}
    } else result['msg'] = res?.data?.error || result['msg']
  })
  .catch((err) => {
    console.log('Network Error!')
  })

  return result;
}