import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function H2({ children }: Props) {
  return <h2 className="text-3xl text-primary font-bold ">{children}</h2>;
}
