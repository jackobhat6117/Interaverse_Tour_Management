import { Add, Cancel } from "@mui/icons-material";
import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";

export function ProfilePicture() {
  // const file = useRef();
  const [pic,setPic] = useState();
  const [open,setOpen] = useState(false);
  const [loading] = useState(false);

  console.log(pic)


  function handleSubmit() {

  }

  return (
    <div>
      <span className='w-[100px] h-[100px] flex items-center justify-center light-bg'>
        <Add fontSize='large' onClick={() => setOpen(true)} className='cursor-pointer' />
      </span>
      <Modal open={open}>
        <Box className='w-full h-full flex items-center justify-center'>
        <div className='flex flex-col gap-10 p-6 bg-secondary rounded-lg relative' name='profile_picture' id='prof_pic_form'>
          <Cancel className='absolute top-0 right-0 m-3 cursor-pointer' onClick={() => setOpen(false)} />
          <div className='flex flex-col gap-4 justify-between '>
            <b className='flex-1'>Logo</b>
            <div className='w-[220px] '>
              <input type='file' name='profile' className='max-w-full'
                onChange={(ev) => setPic(ev.target.files[0])}
              />
            </div>
            <Button variant='contained' className='btn2 flex items-center gap-2 ' onClick={handleSubmit}>
              {loading?<div className='load'></div>:null}
              Upload</Button>
          </div>
        </div>
        </Box>        
      </Modal>
    </div>
  )
}