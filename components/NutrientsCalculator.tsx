import React from "react";
import NutrientDisplay from "./NutrientDisplay";

type NutrientsCalculatorProps = {
  PAL: number;
  dietValue: number;
};
export default function NutrientsCalculator({
  PAL,
  dietValue,
}: NutrientsCalculatorProps) {
  const dietValuesMap: Record<number, "loss" | "maintain" | "bulk"> = {
    0.8: "loss",
    1: "maintain",
    1.2: "bulk",
  };

  type Macronutrients = {
    carbs: number;
    fat: number;
    protein: number;
  };

  type Splits = {
    loss: Macronutrients;
    maintain: Macronutrients;
    bulk: Macronutrients;
  };

  const splits: Splits = {
    loss: {
      carbs: PAL * 0.35,
      fat: PAL * 0.35,
      protein: PAL * 0.3,
    },
    maintain: {
      carbs: PAL * 0.3,
      fat: PAL * 0.4,
      protein: PAL * 0.3,
    },
    bulk: {
      carbs: PAL * 0.25,
      fat: PAL * 0.5,
      protein: PAL * 0.25,
    },
  };

  const currentSplit: Macronutrients = splits[dietValuesMap[dietValue]];

  type MacronutrientKeys = keyof Macronutrients;
  const nutrientKeys: MacronutrientKeys[] = ["protein", "carbs", "fat"];

  return (
    <div className="flex justify-between sm:flex-row flex-col items-start gap-4">
      {nutrientKeys.map((element) => {
        return (
          <NutrientDisplay
            name={element}
            nutrient={Math.floor(currentSplit[element])}
          ></NutrientDisplay>
        );
      })}
    </div>
  );
}
