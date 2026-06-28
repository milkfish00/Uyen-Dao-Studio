/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import { hasSanityConfig, missingSanityEnvKeys } from "@/sanity/env";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!hasSanityConfig) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream px-6 text-center text-red">
        <div className="max-w-xl">
          <p className="mb-3 text-[0.65rem] uppercase tracking-[0.22em] text-red/45">
            Sanity Studio
          </p>
          <h1 className="mb-4 text-4xl font-bold uppercase tracking-[-0.05em]">
            Configure Sanity to open the studio
          </h1>
          <p className="text-base leading-relaxed text-red/65">
            Add {missingSanityEnvKeys.join(" and ")} to your environment, then
            restart the app.
          </p>
        </div>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
