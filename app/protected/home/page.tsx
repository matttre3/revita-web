import Container from "@/components/Container";
import FoodTracker from "@/components/FoodTracker";
import KcalCounter from "@/components/KcalCounter";
import WeightTracker from "@/components/WeightTracker";
import React from "react";

export default function page() {
  return (
    <Container>
      <KcalCounter></KcalCounter>
      <WeightTracker></WeightTracker>
      <FoodTracker></FoodTracker>
    </Container>
  );
}
