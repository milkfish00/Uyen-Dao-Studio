import { sanityFetch } from "@/sanity/lib/live";
import { imageUrl, imageUrls } from "@/sanity/lib/image";
import {
  SETTINGS_QUERY,
  FEATURED_PROJECTS_QUERY,
  WORK_CAROUSEL_QUERY,
  SERVICES_QUERY,
  PROCESS_STEPS_QUERY,
} from "@/sanity/lib/queries";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
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
  heroImages?: (SanityImageSource & { _key: string; alt?: string })[];
} | null;

type FeaturedProject = {
  _id: string;
  title: string;
  slug: string;
  skills?: string[];
  year?: number;
  boards?: (SanityImageSource | null)[];
  hero?: SanityImageSource | null;
};

type WorkCarouselItem = {
  _id: string;
  title: string;
  category: string;
  skills?: string[];
  img?: SanityImageSource | null;
  slug?: string;
};

type Service = {
  _id: string;
  title: string;
  slug?: string;
  coverImage?: SanityImageSource | null;
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

  // Image objects carry the Studio's crop/hotspot; resolve them to cropped URLs
  // before handing them to the client components.
  const heroSettings = settings
    ? {
        ...settings,
        heroImages: (settings.heroImages ?? []).flatMap((img) => {
          const url = imageUrl(img);
          return url ? [{ _key: img._key, alt: img.alt, url }] : [];
        }),
      }
    : settings;

  const galleryProjects = (featuredProjects ?? []).map((project) => ({
    ...project,
    boards: imageUrls(project.boards),
    hero: imageUrl(project.hero),
  }));

  const carouselWorks = (workCarousel ?? []).map((work) => ({
    ...work,
    img: imageUrl(work.img) ?? "",
  }));

  const serviceCards = (services ?? []).map((service) => ({
    ...service,
    coverImage: imageUrl(service.coverImage),
  }));

  return (
    <div className="bg-cream">
      <Hero settings={heroSettings} />
      <Description settings={settings} />
      <Gallery projects={galleryProjects} />
      <Process steps={processSteps} />
      <ServicesSection services={serviceCards} />
      <WorkSection works={carouselWorks} />
    </div>
  );
}
