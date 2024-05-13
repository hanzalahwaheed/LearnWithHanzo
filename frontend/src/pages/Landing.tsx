import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";

const Landing = () => {
  const { loading, blogs } = useBlogs();
  console.log(blogs);
  if (loading) return <div>loading</div>;
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
