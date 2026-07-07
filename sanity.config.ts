"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { buildLegacyTheme, defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { Logo } from "./sanity/components/Logo";

const studioTheme = buildLegacyTheme({
  "--black": "#000000",
  "--white": "#f7f7f7",
  "--gray": "#666666",
  "--gray-base": "#666666",
  "--component-bg": "#f7f7f7",
  "--component-text-color": "#000000",
  "--brand-primary": "#8c0014",
  "--default-button-color": "#666666",
  "--default-button-primary-color": "#8c0014",
  "--default-button-success-color": "#0f9d58",
  "--default-button-warning-color": "#b7791f",
  "--default-button-danger-color": "#8c0014",
  "--state-info-color": "#8c0014",
  "--state-success-color": "#0f9d58",
  "--state-warning-color": "#b7791f",
  "--state-danger-color": "#8c0014",
  "--main-navigation-color": "#8c0014",
  "--main-navigation-color--inverted": "#f7f7f7",
  "--focus-color": "#8c0014",
});

export default defineConfig({
  basePath: "/studio",
  title: "Uyen Dao Design",
  icon: Logo,
  projectId: projectId || "missing-project-id",
  dataset: dataset || "missing-dataset",
  theme: studioTheme,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
