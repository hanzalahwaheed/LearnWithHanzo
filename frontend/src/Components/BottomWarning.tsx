import { Link } from "react-router-dom";
import React from "react";

interface BottomWaringProps {
  content: string;
  buttonText: string;
  to: string;
}

const BottomWarning: React.FC<BottomWaringProps> = ({
  content,
  buttonText,
  to,
}) => {
  return (
    <div className="text-xs flex justify-center py-2">
      <div>{content}</div>
      <Link
        className="pointer underline cursor-pointer text-blue-400 px-1"
        to={to}
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default BottomWarning;
