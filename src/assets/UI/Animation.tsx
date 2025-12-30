import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AnimationProps = {
  children: React.ReactNode;
  currentIndex: number;
  NextDirection: number;
};
export default function Animation({
  children,
  currentIndex,
  NextDirection,
}: AnimationProps) {
  const variants = {
    enter: (NextDirection: number) => ({
      x: NextDirection > 0 ? 300 : -300, // Slide in from right if next, left if prev
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (NextDirection: number) => ({
      x: NextDirection < 0 ? 300 : -300, // Slide out to right if prev, left if next
      opacity: 0,
    }),
  };

  return (
    <div
      className="quiz-container"
      style={{ overflow: "hidden", position: "relative" }}
    >
      {/* AnimatePresence handles the component leaving the DOM */}
      <AnimatePresence mode="wait" custom={NextDirection}>
        <motion.div
          key={currentIndex} // CRITICAL: This triggers the animation when index changes
          custom={NextDirection}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.001,
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          style={{ width: "100%" }} // Ensure it takes full width
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
