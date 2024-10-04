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
  const types = ["breakfast", "lunch", "dinner", "snack"];

  return (
    <div className="flex flex-col gap-4">
      {types.map((type) => (
        <div key={type}>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-primary mb-2">
              {type.toUpperCase()}
            </h2>
            <div className="bg-primary w-full h-[3px] opacity-50"></div>
          </div>

          {mealLogs?.filter((meal) => meal.type === type).length === 0 ? (
            <p className="text-md  text-gray-400 lg:text-xl">
              Meals yet to be added
            </p>
          ) : (
            mealLogs
              ?.filter((meal) => meal.type === type)
              .map((meal) => {
                let kcal =
                  (meal.carbohydrate ?? 0) * 4 +
                  (meal.fat ?? 0) * 9 +
                  (meal.protein ?? 0) * 4;

                return (
                  <div
                    key={meal.id}
                    className="relative flex flex-col items-start lg:items-center lg:flex-row gap-4 justify-between border border-slate-300 rounded-md pl-4 pr-4 pt-1 pb-1"
                  >
                    <div className="flex w-1/6 flex-row gap-4 items-center">
                      <Image
                        width={50}
                        height={50}
                        src={`/images/${meal.type}.svg`}
                        alt={`${meal.type}`}
                      />
                      <p className="text-md font-bold lg:text-xl">
                        {meal.name}
                      </p>
                    </div>

                    <div className="flex flex-col lg:items-center">
                      <p>Carbohydrates</p>
                      <p className="text-primary text-2xl font-bold">
                        {meal.carbohydrate ?? 0}g
                      </p>
                    </div>

                    <div className="flex flex-col lg:items-center">
                      <p>Proteins</p>
                      <p className="text-primary text-2xl font-bold">
                        {meal.protein ?? 0}g
                      </p>
                    </div>

                    <div className="flex flex-col lg:items-center">
                      <p>Fat</p>
                      <p className="text-primary text-2xl font-bold">
                        {meal.fat ?? 0}g
                      </p>
                    </div>

                    <div className="flex flex-col lg:items-center">
                      <p>Calories</p>
                      <p className="text-primary text-2xl font-bold">
                        {kcal ?? 0}Kcal
                      </p>
                    </div>

                    <RemoveMeal id={meal.id} />
                  </div>
                );
              })
          )}
        </div>
      ))}
    </div>
  );
}
