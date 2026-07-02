import { sanityFetch } from "@/sanity/lib/live";
import { BRAND_CREATIVE_CASES_QUERY } from "@/sanity/lib/queries";
import BrandCreativeDirectionContent, {
  type BrandCreativeCase,
} from "./BrandCreativeDirectionContent";

export default async function BrandCreativeDirectionPage() {
  const { data: allCases } = await sanityFetch<BrandCreativeCase[]>({
    query: BRAND_CREATIVE_CASES_QUERY,
  });

  const cases = allCases ?? [];
  const brandCases = cases.filter((c) => c.skills?.includes("Brand Direction"));
  const stylingCases = cases.filter((c) =>
    c.skills?.includes("Fashion Styling"),
  );

  return (
    <BrandCreativeDirectionContent
      brandCases={brandCases}
      stylingCases={stylingCases}
    />
  );
}
