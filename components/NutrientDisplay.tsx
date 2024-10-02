import React from "react";
type NutrientDisplayProps = {
  nutrient: number;
  name: string;
};
export default function NutrientDisplay({
  nutrient,
  name,
}: NutrientDisplayProps) {
  return (
    <div>
      <p className="text-lg font-bold">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </p>
      <div className="text-2xl font-bold text-primary">{nutrient} Kcal</div>
      <div className="font-black text-slate-500">
        {name == "Fat" ? Math.floor(nutrient / 9) : Math.floor(nutrient / 4)} g
      </div>
    </div>
  );
}
