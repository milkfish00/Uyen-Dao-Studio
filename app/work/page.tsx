import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";

import WorkContent from "@/app/work/WorkContent";

type Project = {
  _id: string;
  title: string;
  slug: string;
  skills?: string[];
  year?: number;
  boards?: (string | null)[];
  hero?: string | null;
};

export default async function WorkPage() {
  const { data: projects } = await sanityFetch<Project[]>({
    query: PROJECTS_QUERY,
  });

  return <WorkContent initialProjects={projects} />;
}
