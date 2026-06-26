import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

export default function TiltedCard({
  imageSrc,
  altText = "Tilted Card",
  containerClassName = "",
  imageClassName = "",
  scaleOnHover = 1.05,
  rotateAmplitude = 15, // Max rotation angle in degrees
}) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [rotateAmplitude, -rotateAmplitude]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [-rotateAmplitude, rotateAmplitude]
  );

  // Glare effect coordinates
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [100, 0]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [100, 0]);
  
  // Radial gradient for the glare that follows the opposite of mouse (simulating reflection)
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)`;

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      style={{ perspective: "1000px" }}
      className={`relative w-full h-full ${containerClassName}`}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ 
          scale: scaleOnHover,
          boxShadow: "0px 20px 50px rgba(0,0,0,0.4), 0px 0px 40px rgba(255,255,255,0.15)"
        }}
        className="group w-full h-full rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-border/50 cursor-pointer"
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <img
          src={imageSrc}
          alt={altText}
          className={`w-full h-full object-cover ${imageClassName}`}
          style={{
            transform: "translateZ(20px) scale(1.05)",
          }}
        />
        {/* Dynamic Glare Overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: glareBackground,
          }}
        />
      </motion.div>
    </div>
  );
}
