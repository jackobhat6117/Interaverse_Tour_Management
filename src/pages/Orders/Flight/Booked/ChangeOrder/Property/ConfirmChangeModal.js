import React from 'react'
import Modal1 from '../../../../../../components/DIsplay/Modal/Modal1'
import Button1 from '../../../../../../components/form/Button1'
import { formatMoney } from '../../../../../../features/utils/formatMoney'

export default function ConfirmChangeModal({open,setOpen,callback}) {
  return (
    <Modal1 open={open} setOpen={setOpen}>
        <div className='card p-10 flex flex-col gap-4 items-center max-w-[400px]'>
            <h5>Confirm Change</h5>
            <p className='text-center'>This change will cost you a fee of {formatMoney(0)}.<br /> Do you want to continue with this order change?</p>
            <div className='flex items-center gap-4 w-full'>
                <button className='btn p-2 px-6 w-1/2' onClick={() => setOpen(false)}>No</button>
                <div className='w-1/2'>
                    <Button1 onClick={() => callback && callback()}>Yes, Continue</Button1>
                </div>
            </div>
        </div>
    </Modal1>
  )
}
