"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "./ui/input";
import { submitWeight } from "@/app/actions";

export default function WeightInsert() {
  const [isOpen, setOpen] = useState(false);
  let date = new Date().toISOString().split("T")[0];
  return (
    <>
      <div className="flex lg:flex-row flex-col justify-center text-center lg:text-left  items-center gap-3 lg:gap-7  rounded-md pr-4 pl-4 pt-2 pb-2 mt-3">
        <Button onClick={() => setOpen((prev) => !prev)}>
          Insert your daily weight
        </Button>
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
              className="bg-white rounded-lg p-6 w-96 shadow-lg relative"
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
              <form
                className="flex flex-col gap-4 text-neutral-900"
                action={submitWeight}
              >
                <p>
                  Insert your daily <br></br>
                  <span className="text-4xl lg:text-6xl font-bold text-primarymodal">
                    weight
                  </span>
                </p>
                <p className="text-neutral-900">{date}</p>
                <Input
                  type="number"
                  step="0.01"
                  name="weight"
                  placeholder="Your weight"
                />
                <Button onClick={() => setOpen(false)} type="submit">
                  Insert weight
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
