import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}) => {
  return (
    <div className=" flex flex-col w-5/6 gap-2 p-4 border-b-2 border-slate-200">
      <div className="flex gap-2 items-center ">
        <Avatar content={authorName} size="sm" />
        <p className="text-sm font-medium">{authorName}</p> &#9679;{" "}
        <p className="text-sm text-gray-500">{publishedDate}</p>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold cursor-pointer">
          <Link to={`/blog/${id}`}>{title}</Link>
        </h1>
        <p className="">
          {content.length >= 100 ? content.slice(0, 200) + "..." : content}
        </p>
        <p className="text-xs text-slate-600">
          {Math.ceil(content.length / 100)} minute read
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
