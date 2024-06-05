const BlogPageSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row p-6 gap-2 min-h-screen">
      <div className="w-full lg:w-3/4 flex flex-col gap-4">
        <div className="h-8 bg-gray-300 rounded-full w-80"></div>
        <div className="h-2 bg-gray-300 rounded-full w-80 mb-4"></div>
        <div>
          <div className="h-4 bg-gray-300 rounded-full w-full mb-4"></div>
          <div className="h-4 bg-gray-300 rounded-full w-full mb-4"></div>
          <div className="h-4 bg-gray-300 rounded-full w-full mb-4"></div>
          <div className="h-4 bg-gray-300 rounded-full w-full mb-4"></div>
          <div className="h-4 bg-gray-300 rounded-full w-full mb-4"></div>
          <div className="h-4 bg-gray-300 rounded-full w-full mb-4"></div>
          <div className="h-4 bg-gray-300 rounded-full w-full mb-4"></div>
          <div className="h-4 bg-gray-300 rounded-full w-full mb-4"></div>
          <div className="h-4 bg-gray-300 rounded-full w-full mb-4"></div>
        </div>
      </div>
      <div className="flex flex-col w-full lg:w-1/4 bg-slate-200 p-4">
        <div className="h-2 bg-gray-300 rounded-full w-20 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded-full w-40 mb-4"></div>
      </div>
    </div>
  );
};

export default BlogPageSkeleton;
