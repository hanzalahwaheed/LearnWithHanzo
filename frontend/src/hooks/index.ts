import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { authState } from "../atoms/auth";

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
      const reversedBlogs = response.data.reverse();
      setBlogs(reversedBlogs);
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
  const [auth, setAuth] = useRecoilState(authState);
  const API_LINK = `${import.meta.env.VITE_BASE_URL}/api/v1/user/me`;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !auth.isAuth) {
      axios
        .get(API_LINK, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          if (response.data.status) {
            setAuth({
              isAuth: true,
              userName: response.data.user.name,
            });
          }
        })
        .catch((error) => {
          console.error("Authentication error:", error);
        });
    }
  }, [auth.isAuth, setAuth]);

  return auth;
};
