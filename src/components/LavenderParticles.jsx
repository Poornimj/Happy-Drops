import { useState, useEffect, useRef } from "react";
import "./LavenderParticles.css";

function LavenderParticles({ active }) {
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastParticleTime = useRef(0);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const createParticle = () => {
      if (!containerRef.current) return;

      const particle = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100 - 50, // Relative to center of welcome-header2
        y: 0,
        size: Math.random() * 10 + 6,
        speed: Math.random() * 0.5 + 0.3,
        opacity: Math.random() * 0.5 + 0.3,
        sway: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 1 - 0.5,
        hue: Math.random() * 30 + 250, // Purple/lavender hue range (250-280)
      };

      setParticles((prev) => [...prev, particle]);
    };

    const animate = (timestamp) => {
      if (!active) return;

      // Create new particles periodically
      if (timestamp - lastParticleTime.current > 200) {
        createParticle();
        lastParticleTime.current = timestamp;
      }

      // Update existing particles
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            y: p.y + p.speed,
            x: p.x + Math.sin(p.y * 0.02) * p.sway,
            rotation: p.rotation + p.rotationSpeed,
            opacity: Math.max(0, p.opacity - 0.002),
          }))
          .filter((p) => p.y < 300 && p.opacity > 0)
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [active]);

  return (
    <div ref={containerRef} className="lavender-particles-container">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="lavender-particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            transform: `rotate(${particle.rotation}deg)`,
            backgroundColor: `hsla(${particle.hue}, 70%, 75%, ${particle.opacity})`,
          }}
        />
      ))}
    </div>
  );
}

export default LavenderParticles;
