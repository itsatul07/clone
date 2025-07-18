import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const navbarRef = useRef();
  const heroContainerRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();

  useEffect(() => {
    const q = gsap.utils.selector(navbarRef);

    // Set initial state for all elements
    gsap.set(heroContainerRef.current, { opacity: 0, y: 50 });
    gsap.set(titleRef.current, { opacity: 0, y: 50 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
    gsap.set(q("li"), { opacity: 0, y: -30 });

    // Animation timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(navbarRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
    })
    .to(heroContainerRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8
    }, "-=0.2")
    .to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6
    }, "-=0.4")
    .to(subtitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6
    }, "-=0.4");

    // Clean up
    return () => tl.kill();
  }, []);

  return (
    <section className="relative min-h-screen bg-white">
      <Navbar ref={navbarRef} />

      <div
        ref={heroContainerRef}
        className="flex flex-col items-center justify-center h-[80vh] px-6 text-center"
      >
        <h1
          ref={titleRef}
          className="text-5xl font-bold mb-4 text-black font-michroma"
        >
          Pallet Ross
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl max-w-xl text-gray-700 font-light"
        >
          A visually stunning landing page animation using GSAP and Tailwind CSS.
        </p>
      </div>
    </section>
  );
}