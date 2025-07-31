import React from "react";
import { motion } from "framer-motion";

interface FloatingElementProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  duration = 3,
  delay = 0,
  className = "",
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-5, 5, -5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
