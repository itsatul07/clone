import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function PhotoStack({ images }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".photo-card");

    const totalCards = cards.length;
    const radius = 180; // Radius of arc
    const centerX = 300; // Horizontal center offset
    const centerY = 160; // Vertical center offset

    gsap.set(cards, {
      opacity: 1,
      scale: 1,
      transformOrigin: "center center",
      zIndex: (i) => i,
    });

    cards.forEach((card, i) => {
      // Spread cards from -60deg to +60deg to create a wide fan
      const angle = (-60 + (120 / (totalCards - 1)) * i) * (Math.PI / 180); // radians

      // Calculate position along the arc (x,y)
      const x = centerX + radius * Math.sin(angle) - card.offsetWidth / 2;
      // Squash vertical offset a bit to form a shallow curve
      const y = centerY - radius * Math.cos(angle) * 0.3;

      // Rotate cards to align tangentially with the arc
      const rotation = (angle * 180) / Math.PI / 1.5; // degrees
const rotationY = (angle * 180) / Math.PI / 3; // smaller angle for Y rotation

gsap.set(card, {
  x,
  y,
  rotateZ: rotation,
  rotateY: rotationY,
  transformPerspective: 1200,
  transformOrigin: "center center",
});

     
    });

    // Hover effect to pop forward
    cards.forEach((card, i) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { scale: 1.15, zIndex: totalCards + 10, duration: 0.3 });
        cards.forEach((c) => {
          if (c !== card) {
            gsap.to(c, { scale: 0.9, filter: "brightness(0.7)", duration: 0.3 });
          }
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(cards, {
          scale: 1,
          zIndex: (idx) => idx,
          filter: "brightness(1)",
          duration: 0.3,
        });
      });
    });
  }, [images.length]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[700px] h-[350px]  mx-auto select-none"
      style={{ perspective: 1200 }}
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
          }}
        />
      ))}
    </div>
  );
}
