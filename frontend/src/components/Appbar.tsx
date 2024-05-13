import Avatar from "./Avatar";
import Button from "./Button";
import Logo from "./Logo";

const Appbar = () => {
  const handleClick = () => {};

  return (
    <nav className="flex justify-between items-center p-4 border-b-2 border-slate-200">
      <Logo />
      <div className="flex gap-2 items-center">
        <Button onClick={handleClick} content="New Blog" />
        <Avatar content="user" size="lg" />
      </div>
    </nav>
  );
};

export default Appbar;
