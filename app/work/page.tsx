import { sanityFetch } from "@/sanity/lib/live";
import { imageUrl, imageUrls } from "@/sanity/lib/image";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import WorkContent from "@/app/work/WorkContent";

type Project = {
  _id: string;
  title: string;
  slug: string;
  skills?: string[];
  year?: number;
  boards?: (SanityImageSource | null)[];
  hero?: SanityImageSource | null;
};

export default async function WorkPage() {
  const { data: projects } = await sanityFetch<Project[]>({
    query: PROJECTS_QUERY,
  });

  // Resolve image objects into URLs that respect the Studio crop/hotspot.
  const initialProjects = (projects ?? []).map((project) => ({
    ...project,
    boards: imageUrls(project.boards),
    hero: imageUrl(project.hero),
  }));

  return <WorkContent initialProjects={initialProjects} />;
}
