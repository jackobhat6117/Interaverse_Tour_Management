import fetchServer from "../fetchServer";

export default async function signup(data) {
  let result = {return: 0,msg: 'Something went wrong creating user!'}

  await fetchServer({method: 'POST',url: '/main/v1/account',data})
  .then((res) => {
    console.log('here',res)
    if(res?.data && !res?.data?.error) {
      result = {return: 1,msg: 'Successfull',data: res.data}
    } else if(res?.data?.error) result['msg'] = res?.data?.error
  })
  .catch((err) => {
    console.log(err)
    console.log('Network Error!')
  })

  return result;
}