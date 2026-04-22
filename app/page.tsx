import Hero from "./components/Homepage/Hero";
import ServicesSection from "./components/Homepage/ServicesSection";
import Description from "./components/Homepage/Description";
import Process from "./components/Homepage/Process";
import Gallery from "./components/Homepage/Gallery";
import WorkSection from "./components/Homepage/WorkSection";

export default function Home() {
  return (
    <div className="bg-cream">
      <Hero />
      <Description />
      <Gallery />
      <Process />

      <ServicesSection />
      <WorkSection />
    </div>
  );
}
