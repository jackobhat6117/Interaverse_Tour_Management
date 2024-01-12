import {ReactComponent as LogoIcon} from "../../assets/icons/logo.svg";
import {ReactComponent as TextLogo} from '../../assets/icons/textlogo.svg'

import { Link } from "react-router-dom";

const Logo = ({iconOnly}) => {
  return (
    <Link to="/" className="flex gap-2 items-center justify-center">
      <LogoIcon />
      {/* <img src={logo} alt="Miles" className="h-[35px] object-contain" /> */}
      {!iconOnly ? 
        <TextLogo />
        // <img src={textlogo} alt="Miles" className="h-[35px] w-40" />
      :null}
    </Link>
  );
};

export default Logo;
