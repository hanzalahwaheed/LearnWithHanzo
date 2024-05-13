const Avatar = ({ content, size }: { content: string; size: string }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden  rounded-full 
      ${size == "sm" ? "w-5 h-5" : "w-10 h-10"} ${
        size == "sm" ? "bg-gray-500" : "bg-slate-800"
      }`}
    >
      <span
        className={`${
          size == "sm" ? "text-sm" : "text-lg"
        } font-medium text-gray-300`}
      >
        {content[0].toUpperCase()}
      </span>
    </div>
  );
};

export default Avatar;
