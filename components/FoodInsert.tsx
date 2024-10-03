"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Button } from "./ui/button";

import { insertFood } from "@/app/actions";
import InsertMealFlow from "./InsertMealFlow";
import H2 from "./ui/H2";

export default function FoodInsert() {
  const [isOpen, setOpen] = useState(false);
  let date = new Date().toISOString().split("T")[0];
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex w-full md:justify-between items-center mb-4 sm:flex-row flex-col">
          <H2>Most recent meal logs</H2>
          <div className="flex lg:flex-row flex-col justify-center text-center lg:text-left  items-center gap-3 lg:gap-7 rounded-md pr-4 pl-4 pt-2 pb-2 ">
            <Button onClick={() => setOpen((prev) => !prev)}>
              Insert a meal
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            >
              <motion.div
                className="bg-white rounded-lg p-6 w-fit shadow-lg relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                transition={{ duration: 0.2 }}
              >
                <Button
                  className="absolute top-2 right-2"
                  onClick={() => setOpen(false)}
                >
                  &#10005;
                </Button>
                <form className="flex flex-col gap-4" action={insertFood}>
                  <p>
                    Insert your <br></br>
                    <span className="text-4xl lg:text-6xl font-bold text-primary">
                      meals
                    </span>
                  </p>
                  <p>{date}</p>
                  <div>
                    <div className="flex flex-col gap-3">
                      <InsertMealFlow></InsertMealFlow>
                    </div>
                  </div>

                  <Button onClick={() => setOpen(false)} type="submit">
                    Insert Meal
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
