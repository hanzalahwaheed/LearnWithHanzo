import React, { ChangeEvent } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  label: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string | undefined;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  label,
  name,
  onChange,
  value,
}) => {
  return (
    <div className="flex flex-col mt-4">
      <label className="mb-2">{label}:</label>
      <input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-10 p-2 border-solid border-2 border-zinc-800 rounded-md"
        name={name}
        value={value}
      />
    </div>
  );
};

export default Input;
