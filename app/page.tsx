import Hero from "./components/Homepage/Hero";
import ServicesSection from "./components/Homepage/ServicesSection";
import Description from "./components/Homepage/Description";
import GalleryAbout from "./components/Homepage/GalleryAbout";
import Process from "./components/Homepage/Process";
import ContactPage from "./components/Homepage/Contact";
import BigImage from "./components/Homepage/BigImage";
import Gallery from "./components/Homepage/Gallery";
import WorkSection from "./components/Homepage/WorkSection";

export default function Home() {
  return (
    <div className="bg-cream">
      <Hero />
      <Description />
      <Gallery />
      <GalleryAbout />
      <ServicesSection />
      <WorkSection />
    </div>
  );
}
