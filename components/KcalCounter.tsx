import { createClient } from "@/utils/supabase/server";
import { Database } from "../database.types";
import { GetStaticProps } from "next";

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

  let { data: KcalData, error } = await supabase
    .from("userData")
    .select("*")
    .eq("user_id", user!.id);

  if (error) {
    console.error("Error fetching user data:", error);
    KcalData = [];
  }

  if (KcalData && KcalData.length > 0) {
    const activityLevelNumber = KcalData[0].activity_level as ActivityLevel;
    let REE = calculateREE(KcalData[0]);
    let PAL = REE * ActivityLevelMap[activityLevelNumber];
    return PAL;
  } else return 0;
}

export default async function KcalCounter() {
  let PAL = await readKcalData();
  return <div>{PAL}</div>;
}
