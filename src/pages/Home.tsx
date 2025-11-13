// src/pages/Home.tsx

import About from "./About";
import FAQ from "./FAQ";
import Features from "./Features";
import HeroSection from "./Hero";
import Pricing from "./Pricing";



export default function Home() {
  return (
    <>
      <HeroSection />
      <About />
      <Features />
      <Pricing /> 
      <FAQ />
    </>
  );
}
