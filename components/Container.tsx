import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return <div className="container mx-auto pl-3 pr-3 h-full">{children}</div>;
}
