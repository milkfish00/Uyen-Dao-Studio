import { sanityFetch } from "@/sanity/lib/live";
import { imageUrl } from "@/sanity/lib/image";
import { BRAND_CREATIVE_CASES_QUERY } from "@/sanity/lib/queries";
import BrandCreativeDirectionContent, {
  type BrandCreativeCase,
} from "./BrandCreativeDirectionContent";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

type BrandCreativeCaseSource = Omit<BrandCreativeCase, "image"> & {
  image?: SanityImageSource | null;
};

export default async function BrandCreativeDirectionPage() {
  const { data: allCases } = await sanityFetch<BrandCreativeCaseSource[]>({
    query: BRAND_CREATIVE_CASES_QUERY,
  });

  // Resolve image objects into URLs that respect the Studio crop/hotspot.
  const cases: BrandCreativeCase[] = (allCases ?? []).map((item) => ({
    ...item,
    image: imageUrl(item.image),
  }));

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
