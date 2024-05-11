import Avatar from "./Avatar";
import Logo from "./Logo";

const Appbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 border-b-2 border-slate-200">
      <Logo />
      <Avatar content="user" size='lg' />
    </nav>
  );
};

export default Appbar;
