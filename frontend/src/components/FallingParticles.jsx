import { useState, useEffect, useRef } from "react";
import "./FallingParticles.css";
import greenleaf from "../assets/images/greenleaf.png";
import lavenderbranch from "../assets/images/lavenderbranch.png";

function FallingParticles({ active }) {
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

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      const isGreenLeaf = Math.random() > 0.5;
      const particle = {
        id: Date.now() + Math.random(),
        x: Math.random() * rect.width,
        y: -30,
        size: Math.random() * 15 + 10,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.4 + 0.3,
        sway: Math.random() * 3 - 1.5,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 2 - 1,
        image: isGreenLeaf ? greenleaf : lavenderbranch,
      };

      setParticles((prev) => [...prev, particle]);
    };

    const animate = (timestamp) => {
      if (!active) return;

      // Create new particles periodically
      if (timestamp - lastParticleTime.current > 150) {
        createParticle();
        lastParticleTime.current = timestamp;
      }

      // Update existing particles
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            y: p.y + p.speed,
            x: p.x + Math.sin(p.y * 0.015) * p.sway,
            rotation: p.rotation + p.rotationSpeed,
          }))
          .filter((p) => {
            if (!containerRef.current) return false;
            const rect = containerRef.current.getBoundingClientRect();
            return p.y < rect.height + 30;
          })
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
    <div ref={containerRef} className="particles-container">
      {particles.map((particle) => (
        <img
          key={particle.id}
          src={particle.image}
          alt="Falling leaf"
          className="particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            transform: `rotate(${particle.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default FallingParticles;
