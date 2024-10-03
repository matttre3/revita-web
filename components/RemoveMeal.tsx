"use client";
import { removeMeal } from "@/app/actions";
import React from "react";

type RemoveMealProps = {
  id: number;
};

export default function RemoveMeal({ id }: RemoveMealProps) {
  return (
    <div
      className="lg:static absolute top-3 right-3 cursor-pointer "
      onClick={() => {
        removeMeal(id);
      }}
    >
      &#x2715;
    </div>
  );
}
