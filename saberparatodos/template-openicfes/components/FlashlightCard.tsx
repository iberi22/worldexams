import React, { useRef, useState, MouseEvent } from 'react';

interface FlashlightCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
}

const FlashlightCard: React.FC<FlashlightCardProps> = ({ 
  children, 
  className = "", 
  onClick,
  isActive = false
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-none border transition-all duration-300
        ${isActive ? 'border-emerald-500 bg-emerald-900/10' : 'border-white/10 bg-[#1E1E1E]/40'}
        backdrop-blur-sm group cursor-pointer
        ${className}
      `}
    >
      {/* The Flashlight Gradient Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.06), transparent 40%)`,
        }}
      />
      
      {/* Active Glow/Border Effect (Separate from flashlight to persist if active) */}
      <div 
         className={`pointer-events-none absolute inset-0 transition-opacity duration-500
           ${isActive ? 'opacity-100' : 'opacity-0'}
         `}
         style={{
            background: `radial-gradient(400px circle at 50% 50%, rgba(16, 185, 129, 0.1), transparent 60%)`
         }}
      />

      <div className="relative h-full">
        {children}
      </div>
    </div>
  );
};

export default FlashlightCard;