import React from "react";
import FoodInsert from "./FoodInsert";
import FoodLogs from "./FoodLogs";

export default function FoodTracker() {
  return (
    <div className="border border-slate-300 rounded-md mt-10 pr-4 pl-4 pt-5 pb-5">
      <FoodInsert></FoodInsert>
      <FoodLogs></FoodLogs>
    </div>
  );
}
