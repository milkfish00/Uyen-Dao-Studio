import { sanityFetch } from "@/sanity/lib/live";
import { imageUrl } from "@/sanity/lib/image";
import { INDUSTRIAL_DESIGN_PROJECTS_QUERY } from "@/sanity/lib/queries";
import IndustrialDesignContent, {
  type IndustrialDesignProject,
} from "./IndustrialDesignContent";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

type ProjectSource = Omit<IndustrialDesignProject, "image"> & {
  image?: SanityImageSource | null;
};

export default async function IndustrialDesignPage() {
  const { data: projects } = await sanityFetch<ProjectSource[]>({
    query: INDUSTRIAL_DESIGN_PROJECTS_QUERY,
  });

  // Resolve image objects into URLs that respect the Studio crop/hotspot.
  const items: IndustrialDesignProject[] = (projects ?? []).map((project) => ({
    ...project,
    image: imageUrl(project.image),
  }));

  return <IndustrialDesignContent projects={items} />;
}
