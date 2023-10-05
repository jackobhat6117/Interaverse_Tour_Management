import { Add } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import Modal1 from "../DIsplay/Modal/Modal1";
import Button1 from "./Button1";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css'
import TextInput from "./TextInput";
import { MenuItem } from "@mui/material";
import { useSnackbar } from "notistack";


export function ProfilePicture({value,onChange,sizeLimit=1024*1024}) {
  const [open,setOpen] = useState(false);
  const [preview,setPreview] = useState('');
  const [previewOrig,setPreviewOrig] = useState('');
  const [crop,setCrop] = useState();
  const [scale] = useState(1);
  const [rotate] = useState(0);
  const [aspect,setAspect] = useState(1);
  const {enqueueSnackbar} = useSnackbar();

  const file = useRef(null);
  const previewCanvasRef = useRef()
  const imgRef = useRef(null)


  useEffect(() => {
    crop && previewCanvasRef.current &&
    canvasPreview(imgRef.current,previewCanvasRef.current,crop,scale,rotate)
  },[crop])


  function handleSubmit() {
    file.current.value="";
    file.current.click();
  }

  function handleChange(ev) {
    let file = ev.target.files[0];
      
    setCrop(null);
    setOpen(true);

    const reader = new FileReader();
    
    reader.onload = function(event) {
      const imageURL = event.target.result;
      setPreview(imageURL)
      // setPreviewOrig(imageURL)
    }

    setPreviewOrig(file)
    reader.readAsDataURL(file);
  }

  function handleAspect(val) {
    const { width, height } = imgRef.current
    let newVal = val === 'Free' ? null : val;
    setAspect(newVal);

    const newCrop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        newVal,
        width,
        height,
      ),
      width,
      height,
    )
    setCrop(newCrop)
  }

  function handleSave() {
    const croppedImageData = previewCanvasRef?.current?.toDataURL('image/png');
    let file = previewOrig;
    if(croppedImageData) {
      setPreview(croppedImageData)
      const imageCropped = dataURItoBlob(croppedImageData);
      file = imageCropped;
    }
    if(file.size > sizeLimit)
      return enqueueSnackbar('File Size limit is '+sizeLimit/1024+'MB!',{variant: 'error'})

    onChange && onChange(file);
    setOpen(false);


  }
  return (
    <div>
      <span className='w-[100px] h-[100px] flex items-center justify-center light-bg relative'>
        {value ? 
          <div className="absolute">
              <img src={preview || previewOrig || value} alt='Logo' className="w-full h-full object-cover" />
          </div>
        :null}
        <Add fontSize='large' onClick={handleSubmit} className='cursor-pointer hover:scale-[1.2] relative' />
        <input type='file' name='profile' onChange={handleChange} className='hidden' ref={file} />
      </span>
      <Modal1 open={open} setOpen={setOpen}>
        <div className="p-4 flex flex-col gap-4">
          <div className="w-[90vw] sm:w-[60vw] lg:w-[700px]">
            <ReactCrop crop={crop} aspect={aspect} className="w-full" onChange={(c) => {setCrop(c);console.log("c",c)}} onComplete={c => console.log(c)}>
              <img ref={imgRef} src={preview} alt='Preview' className='w-full' />
            </ReactCrop>
            <div className='flex flex-wrap-reverse justify-center gap-4 py-2'>
              <div className=''>
                {crop && (
                  <canvas
                    ref={previewCanvasRef}
                    style={{
                      border: '1px solid black',
                      objectFit: 'cover',
                      width: crop.width,
                      height: crop.height,
                    }}
                  />
                )}
              </div>
              <div>
                <TextInput select size='small' value={aspect || 'Free'} className='!w-auto !min-w-[100px] self-end' onChange={(ev) => handleAspect(ev.target.value)} label={'Aspect Ratio'}>
                  <MenuItem value='Free'>Free</MenuItem>
                  <MenuItem value={1}>1:1 (Square)</MenuItem>
                  <MenuItem value={16/9}>16:9 (Wide Screen)</MenuItem>
                  <MenuItem value={4/3}>4:3 (Standard)</MenuItem>
                  <MenuItem value={3/2}>3:2 (35mm Full Frame)</MenuItem>
                  <MenuItem value={9/16}>9:16 (Vertical)</MenuItem>
                  <MenuItem value={3/4}>3:4 (Portrait)</MenuItem>
                </TextInput>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button1 onClick={() => setOpen(false)} variant={'text'}>Cancel</Button1>
            <Button1 onClick={() => handleSave()}>Save</Button1>
          </div>
        </div>
      </Modal1>
    </div>
  )
}


function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

const TO_RADIANS = Math.PI / 180

export async function canvasPreview(
  image,
  canvas,
  crop,
  scale = 1,
  rotate = 0,
) {
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio
  // const pixelRatio = 1

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

  ctx.scale(pixelRatio, pixelRatio)
  ctx.imageSmoothingQuality = 'high'

  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY

  const rotateRads = rotate * TO_RADIANS
  const centerX = image.naturalWidth / 2
  const centerY = image.naturalHeight / 2

  ctx.save()

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY)
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY)
  // 3) Rotate around the origin
  ctx.rotate(rotateRads)
  // 2) Scale the image
  ctx.scale(scale, scale)
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY)
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
  )

  ctx.restore()
}
