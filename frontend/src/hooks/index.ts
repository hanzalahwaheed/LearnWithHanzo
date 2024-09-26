import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { authState } from "../atoms/auth";

const API_LINK_ALL_BLOGS = `${import.meta.env.VITE_BASE_URL}/api/v1/blog/bulk`;
const API_LINK_AUTH = `${import.meta.env.VITE_BASE_URL}/api/v1/user/me`;

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

  useEffect(() => {
    axios.get(API_LINK_ALL_BLOGS).then((response) => {
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !auth.isAuth) {
      axios
        .get(API_LINK_AUTH, {
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
