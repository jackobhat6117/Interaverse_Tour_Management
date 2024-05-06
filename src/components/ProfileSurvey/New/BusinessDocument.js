import { createRef, memo, useEffect, useState } from "react"
import Button1 from "../../form/Button1"
import Icon from "../../HOC/Icon"
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Modal1 from "../../DIsplay/Modal/Modal1";


const allowedTypes = ['image/jpeg','image/jpg','image/png','application/pdf'];

function BusinessDocument({updateProfile,back,next,review,user: defUser}) {
  const {user} = useSelector(state => state.user.userData);
  const [loading,setLoading] = useState(false);
  const [edit,setEdit] = useState(false);
  const [data,setData] = useState({
    CACCertificateDoc: '',
    CACCO2Doc: '',
    CACC07Doc: '',
    identityVerificationDoc: '',
    otherDocs: [],
  })
  
  async function handleSubmit(ev) {
    ev?.preventDefault();

    const formData = new FormData();
    Object.entries(data)?.map(([key,val]) => !Array.isArray(val) ?
      formData.append(key,val)  
    :
      val.forEach(file => {
        formData.append(`${key}`,file)
      })
    )

    setLoading(true);
    const res = await updateProfile(formData);
    setLoading(false);
    if(res)
      next && next()
  }
  
  if(review && !edit)
    return <ReviewDisplay data={defUser?.detail || user?.detail} review={review} setEdit={setEdit} />

  console.log(data);
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <h5>Legal Entity Verification Documents </h5>
        <p>
          Kindly upload your CAC document below to verify your business.
        </p>
      </div>
      <DocUploader label={'CAC Certification Doc'} required callback={(CACCertificateDoc) => setData({...data,CACCertificateDoc})} />
      <DocUploader label={'CAC C02 Doc'} required callback={(CACCO2Doc) => setData({...data,CACCO2Doc})} />
      <DocUploader label={'CAC C07 Doc'} required callback={(CACC07Doc) => setData({...data,CACC07Doc})} />
      <hr />
      <DocUploader label={'Identity Verification Doc'} required callback={(identityVerificationDoc) => setData({...data,identityVerificationDoc})} />
      <DocUploader multiple label='Other Docs' callback={(otherDocs) => setData({...data,otherDocs})} />
      <div>
        <Button1 loading={loading} type='submit'>Submit</Button1>
      </div>
    </form>
  )
}

function DocUploader({label,callback,multiple,required=false}) {
  const [files,setFiles] = useState([])
  const inputRef = createRef();
  const {enqueueSnackbar} = useSnackbar();


  function handleChange(gotFiles) {
    const allValid = Array.from(gotFiles)?.every((file) => {
      let allowed = allowedTypes?.includes(file.type)
      return allowed 
    })
    const duplicate = multiple ? Array.from(gotFiles)?.some((file) => files.find((obj) => obj.name === file.name && obj.type === file.type)) : false;

    console.log(gotFiles,duplicate,allValid)
    if(!allValid) {
      inputRef.current.value = '';
      return enqueueSnackbar('Invalid file found! Allowed file types are [jpeg,jpg,png,pdf]!',{variant: 'error'})
    }
    if(duplicate) {
      inputRef.current.value = '';
      return enqueueSnackbar('Duplicate file!',{variant: 'error'})
    }

    let newFiles = gotFiles;
    if(multiple)
      newFiles = [...gotFiles,...files]

    if(multiple)
      inputRef.current.value = '';
    
    setFiles(newFiles);
    callback(multiple ? newFiles : newFiles[0])

  }

  function handleRemove(i) {
    setFiles(files => files.filter((_,ind) => ind !== i))
  }
  console.log(files)
  return (
    <div className="bg-secondary p-4 flex flex-col gap-4">
      <b>{label || 'File Upload'} </b>
      {files[0]?.name ? 
        multiple ? 
        Array.from(files)?.map((obj,i) => (
          <div className='flex justify-between gap-4 items-center'>
            <span key={i}>{obj?.name}</span>
            <Icon icon='mdi:remove' className='border p-1 hover:shadow-md cursor-pointer' onClick={() => handleRemove(i)} />
          </div>
        ))
        :
        <div className='flex justify-between gap-4 items-center'>
          <span>{files[0]?.name}</span>
          <Icon icon='mdi:remove' className='border p-1 hover:shadow-md cursor-pointer' onClick={() => handleRemove(0)} />
        </div>
      : null}
      <div className="border relative min-h-[200px] w-full flex items-center justify-center hover:border-theme1">
        <input type='file' multiple={multiple} accept=".jpeg, .jpg, .png, .pdf" ref={inputRef} required={required} onChange={(ev) => handleChange(ev.target.files)} className="border absolute opacity-0 top-0 left-0 w-full  h-full" />
        <div className="flex flex-col gap-2 items-center justify-center h-full">
          <div className="flex flex-col items-center gap-2">
            <Icon icon='clarity:image-gallery-solid' className='text-primary/40 !w-10 !h-10' />
            Drag and drop an image to attach here
          </div>
          {/* Or */}
          <div>
            <Button1 onClick={() => inputRef?.current?.click()}>Choose File</Button1>
          </div>
        </div>
      </div>
    </div>
  )
}

function ReviewDisplay({data,review}) {
  const [open,setOpen] = useState()
  
  const Col = ({name,value}) => {
    const values = Array.isArray(value) ? value : [value]
    return (
    <div className='flex flex-col gap-2'>
      <p>{name}</p>
      {values?.map((value,i) => (
        <div className="flex gap-2" key={i}>
          {allowedTypes?.map(types => types?.split('/')?.at(-1))?.includes((value?.toString() || '')?.split('.')?.at(-1)?.toLowerCase()) ? 
            <button className='!w-10 !h-10 flex flex-col items-center justify-center object-cover cursor-pointer' onClick={() => setOpen(value)}>
              <Icon icon='mdi:eye' />
              <small>view</small>
            </button>
            // <img alt='' src={value} className='!w-10 !h-10 object-cover cursor-pointer' onClick={() => setOpen(value)} />
          :null}
          <Link target="_blank" to={value}>{Array.isArray(value) ? (
            value?.map((val,i) => <span key={i}>{val}</span>)
            ):
            value
          }</Link>
        </div>
      ))}
    </div>
  )}
  return (
    <div className='relative flex flex-col gap-6 '>
      <div className='absolute right-0 top-0 px-2'>
        {review ? review : null}
      </div>
      <Col name='CAC Certificate Doc' value={data?.CACCertificateDoc} />
      <Col name='CAC CO2 Doc' value={data?.CACCO2Doc} />
      <Col name='CAC C07 Doc' value={data?.CACC07Doc} />
      <Col name='Identity Verification Doc' value={data?.identityVerificationDoc} />
      <Col name='Other Docs' value={data?.otherDocs} />

      <Modal1 open={open} setOpen={setOpen} config={{bg: 'transparent'}}>
        <img alt='' src={open} className="max-w-[90vw] max-h-[90vh] m-4" />
      </Modal1>
    </div>
  )
}


export default memo(BusinessDocument)