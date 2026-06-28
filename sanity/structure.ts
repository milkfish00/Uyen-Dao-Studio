import type { StructureResolver } from "sanity/structure";
import {
  CogIcon,
  UserIcon,
  ImageIcon,
  ComponentIcon,
  OlistIcon,
} from "@sanity/icons";

// Singleton document types — only one document exists per type
const SINGLETONS = ["siteSettings", "aboutPage"];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Studio")
    .items([
      // ── Singletons ──────────────────────────────────────────────────
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings"),
        ),

      S.listItem()
        .title("About Page")
        .icon(UserIcon)
        .child(
          S.document()
            .schemaType("aboutPage")
            .documentId("aboutPage")
            .title("About Page"),
        ),

      S.divider(),

      // ── Collections ─────────────────────────────────────────────────
      S.listItem()
        .title("Projects")
        .icon(ImageIcon)
        .child(
          S.documentTypeList("project")
            .title("Projects")
            .defaultOrdering([{ field: "year", direction: "desc" }]),
        ),

      S.listItem()
        .title("Services")
        .icon(ComponentIcon)
        .child(
          S.documentTypeList("service")
            .title("Services")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),

      S.listItem()
        .title("Process Steps")
        .icon(OlistIcon)
        .child(
          S.documentTypeList("processStep")
            .title("Process Steps")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
    ]);
