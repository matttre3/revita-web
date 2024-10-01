import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/database.types";
import H2 from "./ui/H2";

async function readWeight() {
  const supabase = createClient<Database>();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log({ user });

  if (user?.id) {
    let { data: weightLogs, error } = await supabase
      .from("weightLogs")
      .select("*")
      .eq("user_id", `${user.id}`)
      .limit(5);

    if (error) {
      console.error("Error fetching weight logs:", error);
      return null;
    }

    return weightLogs;
  }
  return null;
}

export default async function LatestWeightLogs() {
  const latestWeightLogs = await readWeight();
  console.log(latestWeightLogs?.length);
  return (
    latestWeightLogs && (
      <div className="w-full lg:w-1/3">
        <H2>Most recent weight logs</H2>
        <div className=" flex flex-col items-center">
          <div className="flex w-full flex-col gap-3 mt-4">
            {latestWeightLogs.map((log) => (
              <div
                className="flex justify-between text-xl border border-slate-300 rounded-md pl-4 pr-4 pt-1 pb-1"
                key={log.id}
              >
                <p className="text-primary font-semibold text-xl">
                  {log.weight} Kg
                </p>
                <p className="text-md">{log.date}</p>
              </div>
            ))}
          </div>
          {latestWeightLogs.length > 4 && (
            <div className="text-primary font-semibold text-md  w-fit p-1 pl-5 pr-5 text-center">
              See more logs
            </div>
          )}
        </div>
      </div>
    )
  );
}
