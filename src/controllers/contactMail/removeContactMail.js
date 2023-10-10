import fetchServer from "../fetchServer";

export default async function removeContactMail(id) {
  let result = {return: 0,msg: 'Something went wrong removing Mail!'}

  await fetchServer({method: 'DELETE',url: '/main/v1/contact/'+id})
  .then((res) => {
    if(res?.data && !res?.data?.error) {
      result = {return: 1,msg: 'Successfull',data: res?.data}
    } else result['msg'] = res?.data?.error || result['msg']
  })
  .catch((err) => {
    console.log('Network Error!')
  })

  return result;
}