import { Clear } from '@mui/icons-material'
import { ClickAwayListener, Modal } from '@mui/material'
import React from 'react'

export default function Modal1({open,setOpen,children}) {
  return (
    <div>
      <Modal open={open} setOpen={setOpen} className='flex flex-col relative items-center justify-center p-4'>
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <div className='flex flex-col gap-3 max-h-screen p-4 '>
            <div className='block sm:hidden bg-secondary text-primary p-2 rounded-md self-end cursor-pointer hover:scale-[.9] ' onClick={() => setOpen(false)}>
              <Clear />
            </div>
            <div className='bg-secondary rounded-md overflow-hidden overflow-y-auto'>
              {children}
            </div>
          </div>
        </ClickAwayListener>
      </Modal>
    </div>
  )
}
