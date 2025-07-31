import React, { useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  opacity: number;
}

interface ParticleSystemProps {
  className?: string;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const particleIdRef = useRef(0);
  const animationFrameRef = useRef<number>();

  // Color palette matching your portfolio theme
  const colors = [
    "hsl(210, 85%, 62%)", // Blue for programming languages
    "hsl(45, 85%, 62%)", // Yellow for web development
    "hsl(150, 85%, 62%)", // Green for data science
    "hsl(250, 85%, 62%)", // Purple for core concepts
    "hsl(var(--accent))", // Accent color
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Create particles on mouse move
      if (Math.random() < 0.3) {
        createParticle(e.clientX, e.clientY);
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Create burst of particles on click
      for (let i = 0; i < 8; i++) {
        createParticle(
          e.clientX + (Math.random() - 0.5) * 20,
          e.clientY + (Math.random() - 0.5) * 20,
          true
        );
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const createParticle = (x: number, y: number, burst = false) => {
    const particle: Particle = {
      id: particleIdRef.current++,
      x,
      y,
      vx: (Math.random() - 0.5) * (burst ? 4 : 2),
      vy: (Math.random() - 0.5) * (burst ? 4 : 2) - (burst ? 1 : 0.5),
      life: burst ? 60 : 30,
      maxLife: burst ? 60 : 30,
      size: Math.random() * (burst ? 4 : 2) + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1,
    };

    setParticles((prev) => [...prev, particle]);
  };

  useEffect(() => {
    const animate = () => {
      setParticles((prev) => {
        return prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.1, // gravity
            life: particle.life - 1,
            opacity: particle.life / particle.maxLife,
            size: particle.size * 0.98, // shrink over time
          }))
          .filter((particle) => particle.life > 0);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw particles
    particles.forEach((particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = particle.color;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });
  }, [particles]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 pointer-events-none z-30 ${className}`}
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default ParticleSystem;
