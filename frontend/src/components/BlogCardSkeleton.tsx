const BlogCardSkeleton = () => {
  return (
    <div className=" flex flex-col w-5/6 p-4 border-b-2 border-slate-200">
      <div className="flex gap-2 items-center ">
        <div className="h-8 bg-gray-300 rounded-full w-8 mb-4"></div>
        <div className="h-2.5 bg-gray-300 rounded-full w-20 mb-4"></div>
        <div className="h-2.5 bg-gray-300 rounded-full w-20 mb-4"></div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-6 bg-gray-300 rounded-full w-60 mb-4"></div>
        <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
        <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
        <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
        <div className="h-2 bg-gray-300 rounded-full w-30 mt-2"></div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
