import { useState } from 'react';
import warning from '../../assets/icons/warning.svg'
import Icon from '../HOC/Icon'


export default function ErrorStandard({title,message,allowClose,show:gotShow=true}) {
    const [show,setShow] = useState(gotShow);

    const Comp = () => (
        <div className='border flex gap-3 rounded-md bg-[#E8F4FF] min-h-[100px] relative'>
            {allowClose ? 
                <Icon icon='ic:round-close' className='absolute top-0 right-0 m-2  cursor-pointer' onClick={() => setShow(false)} />
            :null}
            <div className='w-[100px] flex-0 bg-bubble-warn rounded-md'>
                <img src={warning} alt='' className='px-5 -translate-y-1/2' />
            </div>
            <div className='flex-1 flex flex-col gap-2 p-4'>
                <h4 className=''>{title}</h4>
                <small>{message}</small>
            </div>
        </div>
    )
    return (
        <div>
            <div className={`hidden ${show ? 'md:block':''}`}>
                <Comp />
            </div>
            <div className={`${show ? 'flex':'hidden'} top-0 left-0 md:hidden fixed w-screen h-screen bg-primary/20 backdrop-blur-sm items-center justify-center`}>
                <div className='h-full p-10 py-20'>
                    <Comp />
                </div>
            </div>
        </div>
    )
}
