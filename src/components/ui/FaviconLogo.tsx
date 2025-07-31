import React from "react";

const FaviconLogo: React.FC = () => {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="#0f172a"
        stroke="#3b82f6"
        strokeWidth="4"
      />

      {/* Outer hexagon */}
      <path
        d="M50 15 L75 32.5 L75 67.5 L50 85 L25 67.5 L25 32.5 Z"
        stroke="#3b82f6"
        strokeWidth="2"
        fill="none"
      />

      {/* Inner geometric pattern */}
      <path d="M40 40 L60 40 L50 30 Z" fill="#3b82f6" />

      <path d="M40 60 L60 60 L50 70 Z" fill="#f59e0b" />

      {/* Central diamond */}
      <path d="M50 40 L57 50 L50 60 L43 50 Z" fill="#f8fafc" />

      {/* Code brackets */}
      <text
        x="32"
        y="55"
        className="font-mono text-sm font-bold"
        fill="#3b82f6"
        fontSize="12"
      >
        &lt;
      </text>

      <text
        x="62"
        y="55"
        className="font-mono text-sm font-bold"
        fill="#3b82f6"
        fontSize="12"
      >
        /&gt;
      </text>
    </svg>
  );
};

export default FaviconLogo;
