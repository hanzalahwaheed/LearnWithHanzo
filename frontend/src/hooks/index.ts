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

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState("");
  const API_LINK = `${import.meta.env.VITE_BASE_URL}/api/v1/user/me`;

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(API_LINK, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.status) {
          setIsAuth(true);
          setUser(response.data.user.name);
        }
      })
      .catch((error) => {
        console.error("Authentication error:", error);
      });
  }, [token]);

  return { isAuth, userName: user };
};
