import React from "react";

interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => {
  return (
    <>
      <p>Error: {message}</p>
    </>
  );
};

export default Error;
