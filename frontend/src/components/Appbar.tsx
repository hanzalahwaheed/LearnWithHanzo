import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import Logo from "./Logo";

const Appbar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/publish");
  };
  return (
    <nav className="flex justify-between items-center p-4 border-b-2 border-slate-200 bg-slate-200">
      <Logo />
      <div className="flex gap-4 items-center">
        <button
          className="bg-slate-800 px-2 py-1 rounded-md text-white text-md font-medium"
          onClick={handleClick}
        >
          New Blog
        </button>
        <Avatar content="user" size="lg" />
      </div>
    </nav>
  );
};

export default Appbar;
