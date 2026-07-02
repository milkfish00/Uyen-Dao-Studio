import { sanityFetch } from "@/sanity/lib/live";
import { INDUSTRIAL_DESIGN_PROJECTS_QUERY } from "@/sanity/lib/queries";
import IndustrialDesignContent, {
  type IndustrialDesignProject,
} from "./IndustrialDesignContent";

export default async function IndustrialDesignPage() {
  const { data: projects } = await sanityFetch<IndustrialDesignProject[]>({
    query: INDUSTRIAL_DESIGN_PROJECTS_QUERY,
  });

  return <IndustrialDesignContent projects={projects ?? []} />;
}
