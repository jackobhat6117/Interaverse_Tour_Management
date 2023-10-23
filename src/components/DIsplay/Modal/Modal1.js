import { Clear } from '@mui/icons-material'
import React from 'react'

export default function Modal1({open,setOpen,children,className}) {
  function handleCLickAway(ev) {
    if(ev.target.parentElement.getAttribute('name') && (ev.target.getAttribute('name') !== 'modalChild'))
      setOpen(false);
  }
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen justify-center items-center bg-black/30 z-[99]  ${open?'':'hidden'} `} 
      onClick={(ev) => handleCLickAway(ev)}
      name='ModalParent'
    >
      <div className={'flex flex-col relative items-center justify-center h-full p-4 '+className} >
        {/* <ClickAwayListener onClickAway={() => setOpen(false)}> */}
          <div className='flex flex-col gap-3 max-h-screen p-4 ' name='modalChild'>
            <div className='block sm:hidden bg-secondary text-primary p-2 rounded-md self-end cursor-pointer hover:scale-[.9] ' onClick={() => setOpen(false)}>
              <Clear />
            </div>
            <div className='bg-secondary rounded-md overflow-hidden overflow-y-auto'>
              {children}
            </div>
          </div>
        {/* </ClickAwayListener> */}
      </div>
    </div>
  )
}
