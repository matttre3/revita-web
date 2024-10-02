import React from "react";
import WeightChart from "./WeightChart";
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/database.types";
import WeightInsert from "./WeightInsert";
import LatestWeightLogs from "./LatestWeightLogs";

async function readWeight() {
  const supabase = createClient<Database>();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  //console.log({ user });

  if (user?.id) {
    let { data: weightLogs, error } = await supabase
      .from("weightLogs")
      .select("*")
      .eq("user_id", `${user.id}`);

    if (error) {
      console.error("Error fetching weight logs:", error);
      return null;
    }

    return weightLogs;
  }
  return null;
}

export default async function WeightTracker() {
  const weightLogs = await readWeight();
  //console.log(weightLogs);
  return (
    <>
      <div className="border border-slate-300 rounded-md mt-10 pr-4 pl-4 pt-5 pb-5">
        <div className="flex flex-col gap-5 lg:flex-row">
          {weightLogs && <WeightChart weightLogs={weightLogs} />}
          <LatestWeightLogs></LatestWeightLogs>
        </div>

        <WeightInsert />
      </div>
    </>
  );
}
