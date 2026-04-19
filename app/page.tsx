import Hero from "./components/Homepage/Hero";
import AboutSection from "./components/Homepage/AboutSection";
import WorkSection from "./components/Homepage/WorkSection";
import ServicesSection from "./components/Homepage/ServicesSection";
import Description from "./components/Homepage/Description";
import Gallery from "./components/Homepage/Gallery";
import Process from "./components/Homepage/Process";

const works = [
  {
    title: "Lorem Ipsum Dolor",
    subtitle: "Lorem ipsum dolor sit amet",
    category: "Branding",
    img: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Sit Amet Consect",
    subtitle: "Consectetur adipiscing elit",
    category: "Strategy",
    img: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Adipiscing Elit",
    subtitle: "Sed do eiusmod tempor",
    category: "Identity",
    img: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Eiusmod Tempor",
    subtitle: "Ut labore et dolore magna",
    category: "Digital",
    img: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />

      {/* ── DESCRIPTION ── */}
      <Description />

      <div style={{ position: "relative" }}>
        <Gallery />
        <Process />
        <AboutSection />
        <ServicesSection />
      </div>

      {/* ── CONTACT CTA — inverted ── */}
    </div>
  );
}
