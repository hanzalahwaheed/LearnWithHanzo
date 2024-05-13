import { useState, ChangeEvent } from "react";
import axios from "axios";
import Appbar from "../components/Appbar";
import Button from "../components/Button";
import { CreateBlogInput } from "@hanzalahwaheed/h2wh-common";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const navigate = useNavigate();

  const [postInputs, setPostInputs] = useState<CreateBlogInput>({
    title: "",
    content: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPostInputs({
      ...postInputs,
      [name]: value,
    });
  };

  const handlePublish = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8787/api/v1/blog",
        postInputs,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      console.log("Blog post published successfully:", response.data);
      navigate(`/blog/${response.data}`);
    } catch (error) {
      console.error("Error publishing blog post:", error);
    }
  };

  return (
    <>
      <Appbar />
      <div className="flex flex-col">
        <div className="flex flex-col gap-2 p-10 pt-4">
          <div className="">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
              value={postInputs.title}
              onChange={handleInputChange}
            />
          </div>
          <textarea
            name="content"
            rows={15}
            placeholder="Write your super cool blog here..."
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            value={postInputs.content}
            onChange={handleInputChange}
          ></textarea>
          <Button content="Publish" onClick={handlePublish} />
        </div>
      </div>
    </>
  );
};

export default Publish;
