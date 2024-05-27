import { useState, ChangeEvent } from "react";
import BottomWarning from "../components/BottomWarning";
import Heading from "../components/Heading";
import Input from "../components/Input";
import Quote from "../components/Quote";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { SignUpInput } from "@hanzalahwaheed/h2wh-common";

const SignUp = () => {
  const [postInputs, setPostInputs] = useState<SignUpInput>({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostInputs({
      ...postInputs,
      [name]: value,
    });
  };

  const handleClick = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/signup`,
        postInputs
      );
      const token = response.data;
      localStorage.setItem("token", token);
      if (response) navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="h-screen lg:w-1/2 flex items-center justify-center">
        <div className="flex flex-col p-4 w-3/4">
          <Heading content="Create an Account" />
          <br />
          <br />
          <SubHeading content="Sign Up" />
          <Input
            type="text"
            placeholder="name"
            label="Name"
            onChange={handleInputChange}
            name="name"
            value={postInputs.name}
          />
          <Input
            type="text"
            placeholder="email"
            label="Email"
            onChange={handleInputChange}
            name="email"
            value={postInputs.email}
          />
          <Input
            type="password"
            placeholder="password"
            label="Password"
            onChange={handleInputChange}
            name="password"
            value={postInputs.password}
          />
          <br />
          <br />
          <Button content="Sign Up" onClick={handleClick} />
          <BottomWarning
            content="Already a member?"
            to="/signin"
            buttonText="Sign In"
          />
        </div>
      </div>
      <Quote />
    </div>
  );
};

export default SignUp;
