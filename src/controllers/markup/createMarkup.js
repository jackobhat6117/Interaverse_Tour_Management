import fetchServer from "../fetchServer";

export default async function createMarkup(data) {
  let result = {return: 0,msg: 'Something went wrong creating Markup!'}

  await fetchServer({method: 'POST',url: '/product/v1/priceAdjustment',data})
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