// components/Starfield.tsx
"use client";

import React, { useEffect, useRef } from "react";

const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars = Array.from({ length: 800 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * width,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.x -= 2;
        if (star.x <= 0) {
          star.x = width;
          star.y = Math.random() * height;
          star.z = Math.random() * width;
        }

        const k = 128.0 / star.z;
        const x = (star.x - width / 2) * k + width / 2;
        const y = (star.y - height / 2) * k + height / 2;
        const radius = 0.5 * k;
        const opacity = 0.8 - star.z / width;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
      }}
    />
  );
};

export default Starfield;
