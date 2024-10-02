import React from "react";

import { Button } from "./ui/button";
import FlowQuestion from "./FlowQuestion";
import { insertUserDataAction } from "@/app/actions";
export default function Flow() {
  const FlowQuestions = [
    {
      question: "What is your gender?",
      type: "radio",
      radioAnswers: ["Male", "Female"],
      name: "gender",
    },
    {
      question: "What is your weight? (kg)",
      type: "number",
      name: "weight",
      placeHolder: "Your weight",
    },
    {
      question: "What is your height? (cm)",
      type: "number",
      name: "height",
      placeHolder: "Your height",
    },
    {
      question: "How old are you?",
      type: "number",
      name: "age",
      placeHolder: "Your age",
    },
    {
      question: "How much physical activity do you engage in? (hours per week)",
      type: "radio",
      radioAnswers: [
        "No exercise",
        "Light exercise (1 or 2 x week)",
        "Moderate exercise (3 or 5 x week)",
        "Heavy exercise (6 or 7 x week)",
        "Very heavy (Twice x day)",
      ],
      name: "activity",
    },
    {
      question: "What is your objective?",
      type: "radio",
      radioAnswers: ["Losing weight", "Mantaining weight", "Gaining weight"],
      name: "diet",
    },
  ];

  return (
    <div className="">
      <form
        className="flex flex-col gap-8 mt-8"
        action={insertUserDataAction}
        method="POST"
      >
        {FlowQuestions.map((question, index) => (
          <FlowQuestion
            key={index}
            question={question.question}
            type={question.type}
            name={question.name}
            radioAnswers={question.radioAnswers}
            placeHolder={question.placeHolder}
          />
        ))}
        <Button type="submit">Find out your daily KCal</Button>
      </form>
    </div>
  );
}
