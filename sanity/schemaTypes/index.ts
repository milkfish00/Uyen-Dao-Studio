import { type SchemaTypeDefinition } from "sanity";
import { siteSettings } from "./siteSettings";
import { project } from "./project";
import { service } from "./service";
import { processStep } from "./processStep";
import { aboutPage } from "./aboutPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, project, service, processStep, aboutPage],
};
