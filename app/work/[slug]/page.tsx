import { sanityFetch } from "@/sanity/lib/live";
import { imageUrl, imageUrls } from "@/sanity/lib/image";
import { PROJECT_DETAIL_QUERY, PROJECT_NAV_QUERY } from "@/sanity/lib/queries";
import ProjectDetailContent from "@/app/work/[slug]/ProjectDetailContent";
import { notFound } from "next/navigation";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

type ProjectDetail = {
  _id: string;
  title: string;
  slug: string;
  year?: number;
  skills?: string[];
  additionalInformation?: {
    title?: string;
    description?: string;
  } | null;
  coverImage?: SanityImageSource | null;
  boards?: (SanityImageSource | null)[];
};

type ProjectNavItem = {
  _id: string;
  title: string;
  slug: string;
  image?: SanityImageSource | null;
};

export default async function IndividualProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [{ data: project }, { data: projects }] = await Promise.all([
    sanityFetch<ProjectDetail>({
      query: PROJECT_DETAIL_QUERY,
      params: { slug },
    }),
    sanityFetch<ProjectNavItem[]>({ query: PROJECT_NAV_QUERY }),
  ]);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const nextItem =
    currentIndex >= 0 && projects.length > 1
      ? projects[(currentIndex + 1) % projects.length]
      : null;

  // Resolve image objects into URLs that respect the Studio crop/hotspot.
  const projectWithImages = {
    ...project,
    coverImage: imageUrl(project.coverImage),
    boards: imageUrls(project.boards),
  };

  const nextProject = nextItem
    ? { ...nextItem, image: imageUrl(nextItem.image) }
    : null;

  return (
    <ProjectDetailContent
      project={projectWithImages}
      nextProject={nextProject}
    />
  );
}
