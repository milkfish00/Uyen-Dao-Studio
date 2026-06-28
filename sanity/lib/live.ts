// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { createElement } from "react";
import { defineLive } from "next-sanity/live";
import type { QueryParams } from "next-sanity";

import { client } from "./client";
import { missingSanityConfigMessage } from "../env";

const live = client
  ? defineLive({
      client,
      serverToken: false,
      browserToken: false,
    })
  : null;

export async function sanityFetch<T = unknown>({
  query,
  params,
}: {
  query: string;
  params?: QueryParams;
}) {
  if (!live) {
    throw new Error(missingSanityConfigMessage);
  }

  return live.sanityFetch({ query, params }) as Promise<{ data: T }>;
}

export function SanityLive() {
  if (!live) {
    return null;
  }

  return createElement(live.SanityLive);
}
