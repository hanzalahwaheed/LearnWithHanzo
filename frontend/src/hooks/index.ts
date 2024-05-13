import { useEffect, useState } from "react";
import axios from "axios";

interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
  publishedDate: string;
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const API_LINK = `${import.meta.env.VITE_BASE_URL}/api/v1/blog/bulk`;

  useEffect(() => {
    axios.get(API_LINK).then((response) => {
      setBlogs(response.data);
      setLoading(false);
    });
  }, []);
  return { loading, blogs };
};

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/blog/${id}`
        // ,{
        //   headers: {
        //     Authorization: localStorage.getItem("token"),
        //   },
        // }
      )
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      });
  }, [id]);
  return { loading, blog };
};
