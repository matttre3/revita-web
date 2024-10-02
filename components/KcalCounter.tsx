import { createClient } from "@/utils/supabase/server";
import { Database } from "../database.types";
import { Button } from "./ui/button";
import Link from "next/link";
import NutrientsCalculator from "./NutrientsCalculator";

async function readKcalData() {
  enum Gender {
    Male = 0,
    Female = 1,
  }

  enum ActivityLevel {
    No = 0,
    Light = 1,
    Moderate = 2,
    Heavy = 3,
    VeryHeavy = 4,
  }

  const dietMap: Record<number, number> = {
    0: 0.8,
    1: 1,
    2: 1.2,
  };

  const ActivityLevelMap = {
    [ActivityLevel.No]: 1.2,
    [ActivityLevel.Light]: 1.375,
    [ActivityLevel.Moderate]: 1.55,
    [ActivityLevel.Heavy]: 1.725,
    [ActivityLevel.VeryHeavy]: 1.9,
  };

  function calculateREE(
    KcalData: Database["public"]["Tables"]["userData"]["Row"]
  ) {
    if (KcalData.gender === Gender.Male) {
      return (
        66.47 +
        13.75 * KcalData.current_weight +
        5 * KcalData.height -
        6.8 * KcalData.age
      );
    } else if (KcalData.gender === Gender.Female) {
      return (
        665 +
        9.6 * KcalData.current_weight +
        1.8 * KcalData.height -
        4.7 * KcalData.age
      );
    } else {
      return 0;
    }
  }

  const supabase = createClient<Database>();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.id) {
    let { data: KcalData, error } = await supabase
      .from("userData")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching user data:", error);
      KcalData = [];
    }

    if (KcalData && KcalData.length > 0) {
      const activityLevelNumber = KcalData[0].activity_level as ActivityLevel;
      const REE = calculateREE(KcalData[0]);
      const PAL =
        REE * ActivityLevelMap[activityLevelNumber] * dietMap[KcalData[0].diet];
      return [PAL, dietMap[KcalData[0].diet]];
    }
    return [];
  }
  return [];
}

export default async function KcalCounter() {
  const result: number[] = await readKcalData();
  const PAL = result[0];
  const dietValue = result[1];

  return (
    <>
      {PAL && (
        <div className="flex flex-col gap-4 lg:gap-7 border rounded-md border-slate-300 pr-4 pl-4 pt-2 pb-2 mt-4">
          <div className="flex w-full gap-4 lg:flex-row flex-col justify-center text-center lg:text-left lg:justify-between items-center">
            <p className="text-xl">
              According to our calculation, your daily caloric requirement is:
            </p>
            <div className="flex items-center gap-10">
              <p className="text-4xl lg:text-6xl font-bold text-primary">
                {Math.floor(PAL)}
                <span className="text-2xl lg:text-3xl">KCal</span>
              </p>
              <Link href={"/protected"}>
                <Button>Recalculate</Button>
              </Link>
            </div>
          </div>

          <NutrientsCalculator
            dietValue={dietValue}
            PAL={Math.floor(PAL)}
          ></NutrientsCalculator>

          {!PAL && (
            <>
              <p className="text-xl">
                Input your information and calculate your daily kcal
              </p>
              <Link href={"/protected"}>
                <Button>Calculate your daily caloric requirement</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}
