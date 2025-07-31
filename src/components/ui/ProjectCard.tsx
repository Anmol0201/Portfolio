import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { useState } from "react";

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    tech: string[];
    category: string;
    githubUrl?: string;
    liveUrl?: string;
    featured?: boolean;
  };
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`nothing-card group relative overflow-hidden cursor-pointer ${
        project.featured
          ? "ring-2 ring-accent/50 shadow-lg shadow-accent/20"
          : ""
      }`}
    >
      {/* Background gradient effect */}
      <motion.div
        className="absolute inset-0 opacity-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/10"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent/30 rounded-full"
            style={
              {
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
              } as any
            }
            animate={{
              y: isHovered ? [-10, -20, -10] : [0],
              opacity: isHovered ? [0.3, 0.7, 0.3] : [0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <motion.h4
                className="text-sm font-bold text-foreground tracking-wide transition-colors duration-300"
                animate={{
                  color: isHovered
                    ? "hsl(var(--accent))"
                    : "hsl(var(--foreground))",
                }}
              >
                {project.title}
              </motion.h4>

              {project.featured && (
                <motion.div
                  className="px-2 py-1 bg-accent text-accent-foreground text-[10px] font-bold rounded uppercase tracking-wider"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  Featured
                </motion.div>
              )}

              <motion.div
                animate={{
                  rotate: isHovered ? 45 : 0,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
              </motion.div>
            </div>

            <motion.span
              className="text-[10px] px-2 py-1 rounded border transition-all duration-300"
              animate={{
                backgroundColor: isHovered
                  ? "hsl(var(--accent) / 0.2)"
                  : "hsl(var(--accent) / 0.1)",
                borderColor: isHovered
                  ? "hsl(var(--accent) / 0.4)"
                  : "hsl(var(--accent) / 0.2)",
              }}
            >
              {project.category}
            </motion.span>
          </div>
        </div>

        <motion.p
          className="text-muted-foreground text-xs leading-relaxed mb-4"
          animate={{
            color: isHovered
              ? "hsl(var(--foreground) / 0.8)"
              : "hsl(var(--muted-foreground))",
          }}
        >
          {project.description}
        </motion.p>

        <div className="flex flex-wrap gap-1 mb-4">
          {project.tech.map((tech, techIndex) => (
            <motion.span
              key={techIndex}
              className="text-[10px] px-2 py-1 bg-secondary rounded text-muted-foreground border border-border transition-all duration-300"
              whileHover={{
                scale: 1.05,
                backgroundColor: "hsl(var(--accent) / 0.1)",
                borderColor: "hsl(var(--accent) / 0.3)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ delay: index * 0.1 + techIndex * 0.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-4">
          {project.githubUrl && project.githubUrl !== "#" && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 bg-secondary hover:bg-accent hover:text-accent-foreground transition-all duration-300 rounded text-xs border border-border cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-3 h-3" />
              Code
            </motion.a>
          )}

          {project.liveUrl && project.liveUrl !== "#" && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 rounded text-xs cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-3 h-3" />
              Live
            </motion.a>
          )}
        </div>
      </div>

      {/* Corner decoration */}
      <motion.div
        className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-accent/20 rounded-tr-lg"
        animate={{
          borderColor: isHovered
            ? "hsl(var(--accent) / 0.6)"
            : "hsl(var(--accent) / 0.2)",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ProjectCard;
