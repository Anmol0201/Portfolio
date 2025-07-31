import React from "react";
import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon" | "text";
  className?: string;
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  size = "md",
  variant = "full",
  className = "",
  animated = true,
}) => {
  const sizes = {
    sm: { container: "h-8", text: "text-sm", icon: "w-6 h-6" },
    md: { container: "h-12", text: "text-lg", icon: "w-8 h-8" },
    lg: { container: "h-16", text: "text-2xl", icon: "w-12 h-12" },
  };

  const logoIcon = (
    <div className={`${sizes[size].icon} relative`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer hexagon */}
        <motion.path
          d="M50 5 L85 27.5 L85 72.5 L50 95 L15 72.5 L15 27.5 Z"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-accent"
          initial={animated ? { pathLength: 0, opacity: 0 } : {}}
          animate={animated ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Inner geometric pattern */}
        <motion.path
          d="M35 35 L65 35 L50 20 Z"
          fill="currentColor"
          className="text-accent"
          initial={animated ? { scale: 0, opacity: 0 } : {}}
          animate={animated ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        />

        <motion.path
          d="M35 65 L65 65 L50 80 Z"
          fill="currentColor"
          className="text-primary"
          initial={animated ? { scale: 0, opacity: 0 } : {}}
          animate={animated ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
        />

        {/* Central diamond */}
        <motion.path
          d="M50 35 L60 50 L50 65 L40 50 Z"
          fill="currentColor"
          className="text-foreground"
          initial={animated ? { rotate: 45, scale: 0 } : {}}
          animate={animated ? { rotate: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
        />

        {/* Code brackets */}
        <motion.text
          x="25"
          y="55"
          className="text-accent font-mono text-sm font-bold"
          fill="currentColor"
          initial={animated ? { opacity: 0 } : {}}
          animate={animated ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          &lt;
        </motion.text>

        <motion.text
          x="70"
          y="55"
          className="text-accent font-mono text-sm font-bold"
          fill="currentColor"
          initial={animated ? { opacity: 0 } : {}}
          animate={animated ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.7 }}
        >
          /&gt;
        </motion.text>
      </svg>
    </div>
  );

  const logoText = (
    <div className={`font-mono font-bold ${sizes[size].text} tracking-wider`}>
      <motion.span
        className="text-accent"
        initial={animated ? { opacity: 0, x: -20 } : {}}
        animate={animated ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 2 }}
      >
        DEV
      </motion.span>
      <motion.span
        className="text-primary"
        initial={animated ? { opacity: 0, x: 20 } : {}}
        animate={animated ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 2.2 }}
      >
        CRAFT
      </motion.span>
      <motion.div
        className="text-muted-foreground text-xs tracking-wider uppercase"
        initial={animated ? { opacity: 0, y: 10 } : {}}
        animate={animated ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 2.5 }}
      >
        STUDIO
      </motion.div>
    </div>
  );

  if (variant === "icon") {
    return (
      <motion.div
        className={`${className}`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {logoIcon}
      </motion.div>
    );
  }

  if (variant === "text") {
    return (
      <motion.div
        className={`${className}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {logoText}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`flex items-center gap-3 ${sizes[size].container} ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {logoIcon}
      {logoText}
    </motion.div>
  );
};

export default Logo;
