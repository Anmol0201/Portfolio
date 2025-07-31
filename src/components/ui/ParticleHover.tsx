import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface ParticleHoverProps {
  children: React.ReactNode;
  particleColor?: string;
  particleCount?: number;
  className?: string;
}

const ParticleHover: React.FC<ParticleHoverProps> = ({
  children,
  particleColor = "hsl(var(--accent))",
  particleCount = 6,
  className = "",
}) => {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
    }>
  >([]);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const particleIdRef = useRef(0);

  const createParticles = (x: number, y: number) => {
    const newParticles = Array.from({ length: particleCount }, () => ({
      id: particleIdRef.current++,
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3 - 1,
      life: 30,
    }));

    setParticles((prev) => [...prev, ...newParticles]);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHovering(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createParticles(x, y);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isHovering && Math.random() < 0.1) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createParticles(x, y);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.1,
            life: p.life - 1,
          }))
          .filter((p) => p.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Particle overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full"
            style={
              {
                left: particle.x,
                top: particle.y,
                backgroundColor: particleColor,
                boxShadow: `0 0 6px ${particleColor}`,
              } as React.CSSProperties
            }
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: particle.life / 30,
              scale: particle.life / 30,
            }}
            transition={{ duration: 0.1 }}
          />
        ))}
      </div>
    </div>
  );
};

export default ParticleHover;
