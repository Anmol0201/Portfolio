import React, { useEffect, useRef, useState } from "react";

interface TrailPoint {
  x: number;
  y: number;
  age: number;
  maxAge: number;
}

interface CursorTrailProps {
  className?: string;
  trailLength?: number;
  fadeSpeed?: number;
}

const CursorTrail: React.FC<CursorTrailProps> = ({
  className = "",
  trailLength = 20,
  fadeSpeed = 2,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const animationFrameRef = useRef<number>();

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
      setTrail((prev) => {
        const newTrail = [
          { x: e.clientX, y: e.clientY, age: 0, maxAge: trailLength },
          ...prev.slice(0, trailLength - 1),
        ];
        return newTrail;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [trailLength]);

  useEffect(() => {
    const animate = () => {
      setTrail((prev) => {
        return prev
          .map((point) => ({
            ...point,
            age: point.age + fadeSpeed,
          }))
          .filter((point) => point.age < point.maxAge);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [fadeSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw trail
    if (trail.length > 1) {
      for (let i = 0; i < trail.length - 1; i++) {
        const current = trail[i];
        const next = trail[i + 1];

        const opacity = (1 - current.age / current.maxAge) * 0.5;
        const size = (1 - current.age / current.maxAge) * 3;

        if (opacity > 0) {
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = "hsl(var(--accent))";
          ctx.lineWidth = size;
          ctx.lineCap = "round";

          ctx.beginPath();
          ctx.moveTo(current.x, current.y);
          ctx.lineTo(next.x, next.y);
          ctx.stroke();

          ctx.restore();
        }
      }
    }
  }, [trail]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 pointer-events-none z-20 ${className}`}
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default CursorTrail;
