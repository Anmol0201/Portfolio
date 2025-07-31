import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

interface AnimatedSkillBarProps {
  skill: string;
  percentage: number;
  delay?: number;
  category?: string;
}

const AnimatedSkillBar = ({
  skill,
  percentage,
  delay = 0,
  category = "skill",
}: AnimatedSkillBarProps) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setAnimatedPercentage(percentage);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [inView, percentage, delay]);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "languages":
        return "hsl(210 85% 62%)"; // Blue color for programming languages
      case "webDev":
        return "hsl(45 85% 62%)"; // Yellow color for web development
      case "dataScience":
        return "hsl(150 85% 62%)"; // Green color (existing)
      case "concepts":
        return "hsl(250 85% 62%)"; // Purple color (existing)
      default:
        return "hsl(var(--accent))";
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-foreground">{skill}</span>
        <span className="text-xs text-muted-foreground">
          {animatedPercentage}%
        </span>
      </div>

      <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={
            {
              background: getCategoryColor(category),
              boxShadow: `0 0 10px ${getCategoryColor(category)}40`,
            } as any
          }
          initial={{ width: 0 }}
          animate={{ width: inView ? `${animatedPercentage}%` : 0 }}
          transition={{
            duration: 1.5,
            delay: delay * 0.1 + 0.3,
            ease: "easeInOut",
          }}
        />

        {/* Glowing effect */}
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full opacity-50"
          style={
            {
              background: getCategoryColor(category),
              filter: "blur(4px)",
            } as any
          }
          initial={{ width: 0 }}
          animate={{ width: inView ? `${animatedPercentage}%` : 0 }}
          transition={{
            duration: 1.5,
            delay: delay * 0.1 + 0.3,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
};

export default AnimatedSkillBar;
