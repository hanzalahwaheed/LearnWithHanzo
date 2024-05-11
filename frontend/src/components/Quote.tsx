import Heading from "./Heading";
import SubHeading from "./SubHeading";

const Quote = () => {
  const headingContent = '"To TEACH is to learn TWICE"';
  const subHeadingContent = "-Hanzalah Waheed";
  return (
    <div className="bg-slate-200 h-screen lg:w-1/2 flex flex-col justify-center items-center">
      <div className="w-9/12">
        <Heading content={headingContent} />
        <SubHeading content={subHeadingContent} />
      </div>
    </div>
  );
};

export default Quote;
