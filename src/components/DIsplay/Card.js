import { useNavigate } from "react-router-dom";

export default function Card({obj}) {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(obj.link);  
  }
  return (
    <div className='flex flex-1 flex-col gap-4 justify-end items-start cursor-pointer text-start min-w-[200px] min-h-[250px] border bg-secondary rounded-md p-6 hover:backdrop-shadow-md shadow-primary'
      onClick={handleNavigate}
    >
      <div className='flex flex-col gap-2'>
        <div>{obj.icon}</div>
        <div>{obj.title}</div>
      </div>
      <p>{obj.description}</p>
      <div className="w-full">{obj.footer}</div>
    </div>
  )
}