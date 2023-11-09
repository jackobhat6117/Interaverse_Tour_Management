import { useNavigate } from "react-router-dom";
import Icon from "../../HOC/Icon";

export default function StepsCheck({i,obj,complete,link}) {
  const navigate = useNavigate();

  function handleNavigate() {    
    link && navigate(link)
  }
  return (
    <div className='flex gap-4 p-4 rounded-md border items-center cursor-pointer' onClick={handleNavigate}>
      <div className='bg-primary/[5%] rounded-md p-4 flex items-center justify-center'>{i+1}</div>
      <div className='flex flex-col gap-2 flex-1 text-left'>
        {obj.title}
        <p>{obj.description}</p>
      </div>
      <div className='w-10 h-10 flex justify-center items-center rounded-full bg-primary/10'>
        <Icon icon='game-icons:check-mark' className={`${complete?'text-theme1':'text-primary/20'}`} />
      </div>
    </div>
  )
}