import React from "react";

interface HeadingProps {
  content: string;
}

const Heading: React.FC<HeadingProps> = ({ content }) => {
  return <h1 className="text-6xl font-extrabold text-center">{content}</h1>;
};

export default Heading;
