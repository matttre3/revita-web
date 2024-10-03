"use client";
import { removeWeight } from "@/app/actions";
import React from "react";

type RemoveWeightProps = {
  id: number;
};

export default function RemoveWeight({ id }: RemoveWeightProps) {
  return (
    <div
      className="lg:static  right-2 cursor-pointer font-black"
      onClick={() => {
        removeWeight(id);
      }}
    >
      &#x2715;
    </div>
  );
}
