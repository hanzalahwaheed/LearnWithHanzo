import { useState, ChangeEvent } from "react";
import BottomWarning from "../Components/BottomWarning";
import Heading from "../Components/Heading";
import Input from "../Components/Input";
import Quote from "../Components/Quote";
import SubHeading from "../Components/SubHeading";
import { SignInInput } from "@hanzalahwaheed/h2wh-common";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import axios from "axios";

const SignIn = () => {
  const [postInputs, setPostInputs] = useState<SignInInput>({
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
    const response = await axios.post(
      "http://localhost:8787/api/v1/user/signup",
      postInputs
    );
    if (response) navigate("/blog");
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="h-screen lg:w-1/2 flex items-center justify-center">
        <div className="flex flex-col p-4 w-3/4">
          <Heading content="Get Reading" />
          <br />
          <br />
          <SubHeading content="Sign In" />
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
            content="New Here?"
            to="/signup"
            buttonText="Sign Up"
          />
        </div>
      </div>
      <Quote />
    </div>
  );
};

export default SignIn;
