import { Link } from "react-router-dom";
import Icon from "../HOC/Icon";
import Button1 from "../form/Button1";

export function CustomLink({to,active,Icon:CIcon,label}) {
  function handleClick() {
    if(to === window.location.pathname)
      window.location.reload();
  }

  return (
    <Link to={to} onClick={handleClick}> 
      <Button1 className={`${active ? 'btn-theme' : 'btn-theme-light'} !justify-start !rounded-md !px-4 whitespace-nowrap`}>
        {typeof(CIcon) === 'string' ? <Icon icon={CIcon} className='!w-4 !h-4' /> : 
          <CIcon className={`${active ? 'text-secondary/80' : ''} `} fontSize='small' />
        }
        {label}
      </Button1>
    </Link>
  )
}