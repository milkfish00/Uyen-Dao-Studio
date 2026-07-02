import { sanityFetch } from "@/sanity/lib/live";
import { SERVICES_QUERY } from "@/sanity/lib/queries";
import ServicesContent, { type ServiceItem } from "./ServicesContent";

export default async function ServicesPage() {
  const { data: services } = await sanityFetch<ServiceItem[]>({
    query: SERVICES_QUERY,
  });

  return <ServicesContent services={services ?? []} />;
}
