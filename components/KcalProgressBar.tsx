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
  const percentage = (Totalkcal ?? 0) / PAL;
  console.log(percentage * 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-red-500 h-4 rounded-full transition-all duration-300"
        style={{ width: `${percentage * 100}%` }}
      ></div>
    </div>
  );
}
