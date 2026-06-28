const requiredSanityEnvKeys = [
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
] as const;

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-15";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const missingSanityEnvKeys = requiredSanityEnvKeys.filter((key) => {
  const value = process.env[key];

  return value === undefined || value.trim().length === 0;
});

export const hasSanityConfig = missingSanityEnvKeys.length === 0;

export const missingSanityConfigMessage = [
  `Missing Sanity environment variables: ${missingSanityEnvKeys.join(", ")}.`,
  "Create .env.local from .env.example, add your Sanity project ID and dataset, then restart the Next.js server.",
].join(" ");
