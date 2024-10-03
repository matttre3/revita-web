"use client";
import { removeMeal } from "@/app/actions";
import React from "react";

type RemoveMealProps = {
  id: number;
};

export default function RemoveMeal({ id }: RemoveMealProps) {
  return (
    <div
      className="lg:block absolute right-2 cursor-pointer font-black"
      onClick={() => {
        removeMeal(id);
      }}
    >
      &#x2715;
    </div>
  );
}
