import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function PhotoStack({ images }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".photo-card");
    const totalCards = cards.length;

    const radius = 180; // Arc radius
    const centerX = containerRef.current.clientWidth / 2; // Dynamic horizontal center
    const centerY = 160; // Vertical center offset

    gsap.set(cards, {
      opacity: 1,
      scale: 1,
      transformOrigin: "center center",
      zIndex: (i) => i,
    });

    cards.forEach((card, i) => {
      const angle = (-60 + (120 / (totalCards - 1)) * i) * (Math.PI / 180); // radians

      const x = centerX + radius * Math.sin(angle) - card.offsetWidth / 2;
      const y = centerY - radius * Math.cos(angle) * 0.3;

      const rotationZ = (angle * 180) / Math.PI / 1.5; // rotation around Z-axis
      const rotationY = (angle * 180) / Math.PI / 3;   // subtle Y-axis 3D tilt

      const z = 50 * Math.cos(angle); // Z-depth for layering

      const brightness = 1 - 0.3 * Math.abs(i - totalCards / 2) / totalCards; // subtle shading

      gsap.set(card, {
        x,
        y,
        z,
        rotateZ: rotationZ,
        rotateY: rotationY,
        filter: `brightness(${brightness})`,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
        opacity: 1,
        scale: 1,
      });
    });

    // Hover handlers with cleanup
    function onMouseEnter(card) {
      return () => {
        gsap.to(card, {
          scale: 1.15,
          z: 100,
          zIndex: totalCards + 10,
          filter: "brightness(1.1)",
          duration: 0.3,
        });
        cards.forEach((c) => {
          if (c !== card) {
            gsap.to(c, {
              scale: 0.9,
              filter: "brightness(0.7)",
              duration: 0.3,
            });
          }
        });
      };
    }

    function onMouseLeave() {
      gsap.to(cards, {
        scale: 1,
        z: (i) =>
          50 * Math.cos((-60 + (120 / (totalCards - 1)) * i) * (Math.PI / 180)),
        zIndex: (i) => i,
        filter: (i) =>
          `brightness(${1 - 0.3 * Math.abs(i - totalCards / 2) / totalCards})`,
        duration: 0.3,
      });
    }

    cards.forEach((card) => {
      card.addEventListener("mouseenter", onMouseEnter(card));
      card.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", onMouseEnter(card));
        card.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, [images.length]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[700px] h-[350px] mx-auto select-none"
      style={{ perspective: 1200, transformStyle: "preserve-3d" }}
    >
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`photo-${i}`}
          className="photo-card absolute w-[250px] h-[180px] object-cover rounded-xl border-4 border-white shadow-xl cursor-pointer"
          style={{
            boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
            userSelect: "none",
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
          }}
        />
      ))}
    </div>
  );
}
