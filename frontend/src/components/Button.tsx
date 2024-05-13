import React from "react";

interface ButtonProps {
  content: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ content, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-2"
    >
      {content}
    </button>
  );
};

export default Button;
