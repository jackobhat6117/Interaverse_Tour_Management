import textlogo from "../../assets/icons/textlogo.svg";
import logo from "../../assets/icons/logo.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center justify-center">
      <img src={logo} alt="Miles" className="h-[35px] object-contain" />
      <img src={textlogo} alt="Miles" className="h-[35px] w-40" />
    </Link>
  );
};

export default Logo;
