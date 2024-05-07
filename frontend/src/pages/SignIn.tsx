import BottomWarning from "../Components/BottomWarning";
import Heading from "../Components/Heading";
// import Input from "../Components/Input";
import Quote from "../Components/Quote";
import SubHeading from "../Components/SubHeading";

const SignIn = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="h-screen lg:w-1/2 flex items-center justify-center">
        <div className="flex flex-col">
          <Heading content="Get Reading" />
          <br />
          <br />
          <SubHeading content="Sign In" />
          {/* <Input type="text" placeholder="email" label="Email" /> */}
          {/* <Input type="password" placeholder="password" label="Password" /> */}
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
