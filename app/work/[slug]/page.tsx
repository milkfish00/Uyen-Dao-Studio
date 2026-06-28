import { sanityFetch } from "@/sanity/lib/live";
import { PROJECT_DETAIL_QUERY, PROJECT_NAV_QUERY } from "@/sanity/lib/queries";
import ProjectDetailContent from "@/app/work/[slug]/ProjectDetailContent";
import { notFound } from "next/navigation";

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
  boards?: (string | null)[];
};

type ProjectNavItem = {
  _id: string;
  title: string;
  slug: string;
  image?: string | null;
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
  const nextProject =
    currentIndex >= 0 && projects.length > 1
      ? projects[(currentIndex + 1) % projects.length]
      : null;

  return <ProjectDetailContent project={project} nextProject={nextProject} />;
}
