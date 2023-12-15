import React, { useState } from 'react'
import Button1 from '../../../../components/form/Button1'

export default function PromoDeleteForm({data,callback,cancel}) {
  const [loading,setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const res = await new Promise((resolve) => setTimeout(resolve,2000))
    setLoading(false);
    callback && callback(res)
  }
  return (
    <div className='flex flex-col gap-4'>
        <h5 className='self-center'>Delete Promo Code</h5>
        <div className='flex gap-4 justify-between'>
          <p>Code Name:</p>
          <b>{data?.codeName}</b>
        </div>
        <div className='flex gap-4 justify-between'>
          <p>Code:</p>
          <b>{data?.code}</b>
        </div>
        <div className='flex gap-4 justify-between'>
          <p>Deal:</p>
          <b>{data?.deal}</b>
        </div>
        <div className='flex gap-4 justify-between'>
          <p>Status:</p>
          <b>{data?.status}</b>
        </div>
        <p>You will not be able to undo this action!</p>
        <div className='flex gap-4 justify-between'>
          {cancel?
            <button className='btn-theme-light' onClick={() => cancel()}>Cancel</button>
          :null}
          <Button1 loading={loading} className='!bg-red-500 !text-white' onClick={handleSubmit}>Delete</Button1>
        </div>
    </div>
  )
}
