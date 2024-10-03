import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/database.types";
import Image from "next/image";
import RemoveMeal from "./RemoveMeal";

async function readMeals() {
  let date = new Date().toISOString();

  const supabase = createClient<Database>();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.id) {
    let { data: mealLogs, error } = await supabase
      .from("mealsLogs")
      .select("*")
      .eq("user_id", `${user.id}`)
      .eq("date", date);

    if (error) {
      console.error("Error fetching weight logs:", error);
      return null;
    }
    return mealLogs;
  }
}

export default async function FoodLogs() {
  const mealLogs = await readMeals();
  return (
    <div className="flex flex-col gap-4">
      {mealLogs?.map((meal, index) => {
        let kcal =
          (meal.carbohydrate ?? 0) * 4 +
          (meal.fat ?? 0) * 9 +
          (meal.protein ?? 0) * 4;
        return (
          <div
            key={meal.id}
            className=" relative flex flex-col items-start lg:items-center lg:flex-row  gap-4 justify-between border border-slate-300 rounded-md pl-4 pr-4 pt-1 pb-1 "
          >
            <div className="flex w-1/6 flex-row gap-4 items-center">
              <Image
                width={50}
                height={50}
                src={`/images/${meal.type}.svg`}
                alt={`${meal.type}`}
              ></Image>
              <p className="text-md font-bold lg:text-xl">{meal.name}</p>
            </div>

            {meal.carbohydrate && (
              <div className="flex flex-col lg:items-center">
                <p>Carbohydrates</p>
                <p className="text-primary text-2xl font-bold">
                  {meal.carbohydrate}g
                </p>
              </div>
            )}
            {meal.protein && (
              <div className="flex flex-col lg:items-center">
                <p>Proteins</p>
                <p className="text-primary text-2xl font-bold">
                  {meal.protein}g
                </p>
              </div>
            )}
            {meal.fat && (
              <div className="flex flex-col lg:items-center">
                <p>Fat</p>
                <p className="text-primary text-2xl font-bold">{meal.fat}g</p>
              </div>
            )}

            {(meal.fat || meal.protein || meal.carbohydrate) && (
              <div className="flex flex-col lg:items-center">
                <p>Calories</p>
                <p className="text-primary text-2xl font-bold">{kcal}Kcal</p>
              </div>
            )}

            <RemoveMeal id={meal.id}></RemoveMeal>
          </div>
        );
      })}
    </div>
  );
}
