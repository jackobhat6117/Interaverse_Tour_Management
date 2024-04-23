import { useSelector } from "react-redux";
import {ReactComponent as LogoIcon} from "../../assets/icons/logo.svg";
import {ReactComponent as TextLogo} from '../../assets/icons/textlogo.svg'

import { Link } from "react-router-dom";

const Logo = ({iconOnly,textClassName}) => {
  const {userData: {agent}} = useSelector(state => state.user)
  console.log(agent)
  return (
    <Link to="/" className="flex gap-2 items-center justify-center">
      {agent?.detail?.agencyLogo ? <img src={agent?.detail?.agencyLogo} alt='' className="w-10 h-10 object-cover" /> : 
        <LogoIcon className="h-7" />
      }
      {/* <img src={logo} alt="Intraverse" className="h-[35px] object-contain" /> */}
      {!iconOnly ? 
        agent?.detail?.agencyName ? <h5 className={textClassName}>{agent?.detail?.agencyName}</h5>
        :
        <TextLogo className="h-6" />
        // <img src={textlogo} alt="Intraverse" className="h-[35px] w-40" />
      :null}
    </Link>
  );
};

export default Logo;
