import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function PhotoStack({ images }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".photo-card");
    const totalCards = cards.length;

    // Initial stack animation — all cards at center, hidden
    gsap.set(cards, {
      opacity: 0,
      scale: 1,
      x: 0,
      y: 100,
      rotateZ: 0,
      rotateY: 0,
      transformPerspective: 1200,
      transformOrigin: "center center",
    });

    // Bring the top card upward as single stack
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: "power3.out",
      onComplete: () => {
        // After initial entrance, fan out
        cards.forEach((card, i) => {
          const radius = 180;
          const centerX = 300;
          const centerY = 160;

          const angle =
            (-60 + (120 / (totalCards - 1)) * i) * (Math.PI / 180);

          const x =
            centerX + radius * Math.sin(angle) - card.offsetWidth / 2;
          const y = centerY - radius * Math.cos(angle) * 0.3;
          const rotation = (angle * 180) / Math.PI / 1.5;
          const rotationY = (angle * 180) / Math.PI / 3;

          gsap.to(card, {
            x,
            y,
            rotateZ: rotation,
            rotateY: rotationY,
            delay: 0.1 * i,
            duration: 0.7,
            ease: "back.out(1.2)",
          });
        });
      },
    });

    // Hover effect
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
      className="relative w-full max-w-[700px] h-[300px] mb-6 mx-auto select-none"
      style={{ perspective: 1200 }}
    >
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`photo-${i}`}
          className="photo-card absolute w-[200px] h-[120px] object-cover rounded-xl border-4 border-white shadow-xl cursor-pointer"
          style={{
            boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
            userSelect: "none",
          }}
        />
      ))}
    </div>
  );
}
