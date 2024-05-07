import { useState, ChangeEvent } from "react";
import BottomWarning from "../Components/BottomWarning";
import Heading from "../Components/Heading";
import Input from "../Components/Input";
import Quote from "../Components/Quote";
import SubHeading from "../Components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";
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
    console.log(postInputs);
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
        <div className="flex flex-col p-4">
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
