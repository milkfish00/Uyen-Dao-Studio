import AboutContent from "@/app/about/AboutContent";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import {
  ABOUT_PAGE_QUERY,
  SERVICES_QUERY,
  SETTINGS_QUERY,
} from "@/sanity/lib/queries";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type AboutPageData = {
  heading?: string;
  intro?: string;
  portrait?: any; // Sanity image object (contains asset, crop, hotspot)
  recognitions?: {
    _key?: string;
    awardName?: string;
    year?: number;
    description?: string;
    images?: any[];
  }[];
} | null;

type SiteSettingsData = {
  email?: string;
  phoneNumber?: string;
  socialLinks?: {
    _key?: string;
    platform?: string;
    url?: string;
  }[];
} | null;

type ServiceItem = {
  _id: string;
  title: string;
  slug?: string;
};

export default async function AboutPage() {
  const [{ data: aboutPage }, { data: settings }, { data: services }] =
    await Promise.all([
      sanityFetch<AboutPageData>({ query: ABOUT_PAGE_QUERY }),
      sanityFetch<SiteSettingsData>({ query: SETTINGS_QUERY }),
      sanityFetch<ServiceItem[]>({ query: SERVICES_QUERY }),
    ]);

  // Convert Sanity portrait image object to cropped URL string
  const portraitUrl = aboutPage?.portrait
    ? urlFor(aboutPage.portrait).auto("format").fit("crop").url()
    : null;

  // Convert recognition image objects to cropped URL strings
  const recognitions = aboutPage?.recognitions?.map((rec) => ({
    ...rec,
    images: rec.images
      ? rec.images
          .filter((img): img is SanityImageSource => Boolean(img))
          .map((img) => urlFor(img).auto("format").fit("crop").url())
      : [],
  }));

  return (
    <AboutContent
      content={{
        heading: aboutPage?.heading,
        intro: aboutPage?.intro,
        portrait: portraitUrl,
        recognitions,
        email: settings?.email,
        phoneNumber: settings?.phoneNumber,
        socialLinks: settings?.socialLinks,
        services: services ?? [],
      }}
    />
  );
}
