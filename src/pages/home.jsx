import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";

export default function Home(){
 const heroRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();

  useEffect(() => {
    // GSAP timeline for sequence animations
    const tl = gsap.timeline();

    tl.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(titleRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.6
    }, "-=0.3")
    .from(subtitleRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6
    }, "-=0.4");
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Navbar here */}
      <Navbar/>
      {/* Hero */}
      <h1 ref={titleRef} className="text-5xl font-bold mb-4">Pallet Ross</h1>
      <p ref={subtitleRef} className="text-xl max-w-xl text-gray-700 text-center">Website animation clone</p>
    </section>
  );
}

