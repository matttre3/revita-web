import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Image from "next/image";

const meals = [
  { id: 1, name: "breakfast", displayName: "Breakfast" },
  { id: 2, name: "lunch", displayName: "Lunch" },
  { id: 3, name: "dinner", displayName: "Dinner" },
  { id: 4, name: "snack", displayName: "Snack" },
];

const macroNutrients = [
  { id: 1, name: "protein", displayName: "Protein" },
  { id: 2, name: "fat", displayName: "Fat" },
  { id: 3, name: "carbohydrate", displayName: "Carbohydrate" },
];

export default function InsertMealFlow() {
  return (
    <div className="flex flex-col gap-8 w-fit">
      <div className="w-full flex gap-2 flex-col">
        <Label className="text-2xl text-primary font-bold" htmlFor={"mealName"}>
          Meal Name
        </Label>
        <Input
          type="text"
          name={"mealName"}
          placeholder={"Meal Name"}
          required
        />
      </div>
      <div className="flex flex-wrap flex-row gap-3">
        {meals.map((meal) => (
          <div className="flex flex-row flex-wrap items-center" key={meal.id}>
            <Input
              type="radio"
              id={meal.name}
              name="mealType"
              value={meal.name}
              className="absolute cursor-pointer opacity-0 peer"
              required
            />
            <Label
              htmlFor={meal.name}
              className="flex w-32 flex-col items-center justify-center border border-gray-300 p-4 rounded-lg cursor-pointer  peer-checked:bg-gray-100 transition-colors"
            >
              <Image
                src={`/images/${meal.name}.svg`}
                width={30}
                height={30}
                alt={meal.name}
              />
              <div className="flex flex-col items-center">
                <p className="mt-2">{meal.displayName}</p>
              </div>
            </Label>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row justify-between">
        {macroNutrients.map((macronutrient) => {
          return (
            <div className="flex flex-col gap-2">
              <Label
                className="text-2xl text-primary font-bold"
                htmlFor={macronutrient.name}
              >
                {macronutrient.displayName}
              </Label>
              <Input
                type="number"
                name={macronutrient.name}
                placeholder={"(g)"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
