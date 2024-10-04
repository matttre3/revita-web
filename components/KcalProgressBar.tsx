import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Database } from "../database.types";

type KcalProgressBarProps = {
  PAL: number;
};

async function getActualKcal() {
  let date = new Date().toISOString();
  const supabase = createClient<Database>();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.id) {
    let { data: meals, error } = await supabase
      .from("mealsLogs")
      .select("*")
      .eq("user_id", user.id)
      .eq("date", date);

    let kcal;
    console.log(meals);
    const totalKcal = meals?.reduce((acc, meal) => {
      const proteinKcal = (meal.protein ?? 0) * 4;
      const carbKcal = (meal.carbohydrate ?? 0) * 4;
      const fatKcal = (meal.fat ?? 0) * 9;

      return acc + proteinKcal + carbKcal + fatKcal;
    }, 0);
    return totalKcal;
  }
}

export default async function KcalProgressBar({ PAL }: KcalProgressBarProps) {
  const Totalkcal = await getActualKcal();
  console.log(PAL);
  let percentage = (Totalkcal ?? 0) / PAL;
  if (percentage >= 1) {
    percentage = 1;
  }
  return (
    <div className="w-full bg-gray-200 rounded-full">
      <div
        className="bg-red-500 flex items-center justify-center rounded-full transition-all duration-300 h-fit w-fit"
        style={{ width: `${percentage * 100}%` }}
      >
        <p className="text-neutral-50">
          {Totalkcal}/{PAL}
          <span className="font-bold">{percentage == 1 ? "⚠️⚠️⚠️" : ""}</span>
        </p>
      </div>
    </div>
  );
}
