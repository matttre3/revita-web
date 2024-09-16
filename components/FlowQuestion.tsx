import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type FlowQuestionProps = {
  question: string;
  type: string;
  radioAnswers?: string[];
  name: string;
  placeHolder?: string;
};

export default function FlowQuestion({
  question,
  type,
  radioAnswers,
  name,
  placeHolder,
}: FlowQuestionProps) {
  return (
    <>
      {type === "radio" ? (
        <div className="flex flex-col gap-3">
          <Label className="text-2xl text-primary font-bold" htmlFor={name}>
            {question}
          </Label>
          {radioAnswers &&
            radioAnswers.map((answer, index) => (
              <div key={answer} className="flex items-center">
                <Input
                  type="radio"
                  id={answer}
                  name={name}
                  value={index}
                  required
                />
                <Label htmlFor={answer} className="ml-2">
                  {answer}
                </Label>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <Label className="text-2xl text-primary font-bold" htmlFor={name}>
            {question}
          </Label>
          <Input
            type="number"
            name={name}
            placeholder={placeHolder ? placeHolder : ""}
            required
          />
        </div>
      )}
    </>
  );
}
