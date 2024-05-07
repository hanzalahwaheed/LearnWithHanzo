import React from "react";

interface SubHeadingProps {
  content: string;
}

const SubHeading: React.FC<SubHeadingProps> = ({ content }) => {
  return <div className="text-2xl font-bold text-center">{content}</div>;
};

export default SubHeading;
