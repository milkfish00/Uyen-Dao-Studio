import ContactContent from "@/app/contact/ContactContent";
import { sanityFetch } from "@/sanity/lib/live";
import { SERVICES_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";

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

export default async function ContactPage() {
  const [{ data: settings }, { data: services }] = await Promise.all([
    sanityFetch<SiteSettingsData>({ query: SETTINGS_QUERY }),
    sanityFetch<ServiceItem[]>({ query: SERVICES_QUERY }),
  ]);

  return (
    <ContactContent
      email={settings?.email}
      phoneNumber={settings?.phoneNumber}
      socialLinks={settings?.socialLinks}
      services={services ?? []}
    />
  );
}
