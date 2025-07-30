import React from "react";

type Props = {
  className?: string;
  quantity: number;
};

const Particles: React.FC<Props> = ({ className = "", quantity }) => {
  // Generate an array of particles
  const particles = Array.from({ length: quantity });

  return (
    <div className={className} aria-hidden="true" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <svg width="100%" height="100%">
        {particles.map((_, i) => (
          <circle
            key={i}
            cx={Math.random() * 100 + "%"}
            cy={Math.random() * 100 + "%"}
            r={Math.random() * 4 + 1}
            fill="currentColor"
            opacity="0.15"
          />
        ))}
      </svg>
    </div>
  );
};

export default Particles;
