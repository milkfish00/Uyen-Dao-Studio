import Hero from "./components/Homepage/Hero";
import AboutSection from "./components/Homepage/AboutSection";
import ServicesSection from "./components/Homepage/ServicesSection";
import Description from "./components/Homepage/Description";
import Gallery from "./components/Homepage/Gallery";
import Process from "./components/Homepage/Process";

export default function Home() {
  return (
    <div
      className="bg-[#EDEDDD]"
      style={{ marginBottom: "var(--footer-height)" }}>
      <Hero />
      <Description />
      <Gallery />
      <Process />
      <AboutSection />
      <ServicesSection />
    </div>
  );
}
