import { useState, ChangeEvent } from "react";
import BottomWarning from "../components/BottomWarning";
import Heading from "../components/Heading";
import Input from "../components/Input";
import Quote from "../components/Quote";
import SubHeading from "../components/SubHeading";
import { SignInInput } from "@hanzalahwaheed/h2wh-common";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
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
    try {
      const response = await axios.post(
        "http://localhost:8787/api/v1/user/signin",
        postInputs
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      if (response) navigate("/landing");
    } catch (error) {
      console.log(error);
    }
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
          <Button content="Sign In" onClick={handleClick} />
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
