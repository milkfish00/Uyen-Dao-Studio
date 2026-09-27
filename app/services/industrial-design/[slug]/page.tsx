import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { imageUrl, imageUrls } from "@/sanity/lib/image";
import { PROJECT_DETAIL_QUERY } from "@/sanity/lib/queries";
import IndustrialProjectDetail, {
  type IndustrialProjectDetailData,
} from "./IndustrialProjectDetail";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

type ProjectSource = Omit<
  IndustrialProjectDetailData,
  "coverImage" | "boards"
> & {
  coverImage?: SanityImageSource | null;
  boards?: (SanityImageSource | null)[];
};

export default async function IndustrialDesignProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: project } = await sanityFetch<ProjectSource>({
    query: PROJECT_DETAIL_QUERY,
    params: { slug },
  });

  if (!project) {
    notFound();
  }

  // Resolve image objects into URLs that respect the Studio crop/hotspot.
  const projectWithImages: IndustrialProjectDetailData = {
    ...project,
    coverImage: imageUrl(project.coverImage),
    boards: imageUrls(project.boards),
  };

  return <IndustrialProjectDetail project={projectWithImages} />;
}
