import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import BlogCardSkeleton from "../components/BlogCardSkeleton";
import { useBlogs } from "../hooks";

const Landing = () => {
  const { loading, blogs } = useBlogs();
  if (loading)
    return (
      <>
        <Appbar />
        <div className="flex flex-col items-center p-10 ">
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
        </div>
      </>
    );
  return (
    <>
      <Appbar />
      <div className="flex flex-col items-center p-10 ">
        {blogs.map((blog) => (
          <BlogCard
            id={blog.id}
            authorName={blog.author.name}
            publishedDate={blog.publishedDate}
            title={blog.title}
            content={blog.content}
          />
        ))}
      </div>
    </>
  );
};

export default Landing;
