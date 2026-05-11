"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Template({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
        transition={{
          duration: 0.52,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
