import { sanityFetch } from "@/sanity/lib/live";
import { imageUrl } from "@/sanity/lib/image";
import { SERVICES_QUERY } from "@/sanity/lib/queries";
import ServicesContent, { type ServiceItem } from "./ServicesContent";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

type ServiceSource = Omit<ServiceItem, "coverImage"> & {
  coverImage?: SanityImageSource | null;
};

export default async function ServicesPage() {
  const { data: services } = await sanityFetch<ServiceSource[]>({
    query: SERVICES_QUERY,
  });

  // Resolve image objects into URLs that respect the Studio crop/hotspot.
  const items: ServiceItem[] = (services ?? []).map((service) => ({
    ...service,
    coverImage: imageUrl(service.coverImage),
  }));

  return <ServicesContent services={items} />;
}
