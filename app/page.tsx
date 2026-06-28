import { sanityFetch } from "@/sanity/lib/live";
import {
  SETTINGS_QUERY,
  FEATURED_PROJECTS_QUERY,
  WORK_CAROUSEL_QUERY,
  SERVICES_QUERY,
  PROCESS_STEPS_QUERY,
} from "@/sanity/lib/queries";
import Hero from "./components/Homepage/Hero";
import ServicesSection from "./components/Homepage/ServicesSection";
import Description from "./components/Homepage/Description";
import Process from "./components/Homepage/Process";
import Gallery from "./components/Homepage/Gallery";
import WorkSection from "./components/Homepage/WorkSection";

type SiteSettings = {
  studioName?: string;
  focusLabel?: string;
  descriptionText?: string;
  heroImages?: { _key: string; url: string; alt?: string }[];
} | null;

type FeaturedProject = {
  _id: string;
  title: string;
  slug: string;
  skills?: string[];
  year?: number;
  boards?: (string | null)[];
  hero?: string | null;
};

type WorkCarouselItem = {
  _id: string;
  title: string;
  category: string;
  img: string;
  slug?: string;
};

type Service = {
  _id: string;
  title: string;
  slug?: string;
  coverImage?: string | null;
};

type ProcessStep = {
  _id?: string;
  stepNumber: string;
  title: string;
  description: string;
};

export default async function Home() {
  const [
    { data: settings },
    { data: featuredProjects },
    { data: workCarousel },
    { data: services },
    { data: processSteps },
  ] = await Promise.all([
    sanityFetch<SiteSettings>({ query: SETTINGS_QUERY }),
    sanityFetch<FeaturedProject[]>({ query: FEATURED_PROJECTS_QUERY }),
    sanityFetch<WorkCarouselItem[]>({ query: WORK_CAROUSEL_QUERY }),
    sanityFetch<Service[]>({ query: SERVICES_QUERY }),
    sanityFetch<ProcessStep[]>({ query: PROCESS_STEPS_QUERY }),
  ]);

  return (
    <div className="bg-cream">
      <Hero settings={settings} />
      <Description settings={settings} />
      <Gallery projects={featuredProjects} />
      <Process steps={processSteps} />
      <ServicesSection services={services} />
      <WorkSection works={workCarousel ?? undefined} />
    </div>
  );
}
