"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "./ui/input";

export default function () {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div className="flex lg:flex-row flex-col justify-center text-center lg:text-left lg:justify-between items-center gap-3 lg:gap-7 border rounded-md border-slate-300 pr-4 pl-4 pt-2 pb-2 mt-4">
        <Button onClick={() => setOpen((prev) => !prev)}>+</Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-96 shadow-lg relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                className="absolute top-2 right-2"
                onClick={() => setOpen(false)}
              >
                X
              </Button>
              <form action="">
                <Input type="number" />
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
