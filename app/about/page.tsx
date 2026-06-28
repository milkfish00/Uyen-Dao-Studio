import AboutContent from "@/app/about/AboutContent";
import { sanityFetch } from "@/sanity/lib/live";
import {
  ABOUT_PAGE_QUERY,
  SERVICES_QUERY,
  SETTINGS_QUERY,
} from "@/sanity/lib/queries";

type AboutPageData = {
  heading?: string;
  intro?: string;
  portrait?: string | null;
  recognitions?: {
    _key?: string;
    awardName?: string;
    year?: number;
    description?: string;
    image?: string | null;
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

  return (
    <AboutContent
      content={{
        heading: aboutPage?.heading,
        intro: aboutPage?.intro,
        portrait: aboutPage?.portrait,
        recognitions: aboutPage?.recognitions,
        email: settings?.email,
        phoneNumber: settings?.phoneNumber,
        socialLinks: settings?.socialLinks,
        services: services ?? [],
      }}
    />
  );
}
