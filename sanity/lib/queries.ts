import { groq } from "next-sanity";

/**
 * Image fields are returned as whole objects (asset + crop + hotspot) rather
 * than `asset->url`, so the front end can rebuild the URL with `imageUrl()` and
 * honour the crop set in the Studio. An `asset->url` always resolves to the
 * uncropped original.
 */
const IMAGE_FIELDS = `
  _type,
  crop,
  hotspot,
  asset
`;

export const SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    studioName,
    focusLabel,
    descriptionText,
    email,
    phoneNumber,
    socialLinks[]{
      _key,
      platform,
      url
    },
    heroImages[] {
      _key,
      alt,
      ${IMAGE_FIELDS}
    }
  }
`;

const PROJECT_CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  skills,
  year,
  "boards": coalesce(boards[]{ ${IMAGE_FIELDS} }, gallery[]{ ${IMAGE_FIELDS} }, []),
  "hero": coalesce(
    coverImage{ ${IMAGE_FIELDS} },
    boards[0]{ ${IMAGE_FIELDS} },
    gallery[0]{ ${IMAGE_FIELDS} },
    mainImage{ ${IMAGE_FIELDS} }
  )
`;

const PROJECT_IMAGE_FALLBACK = `
  coalesce(
    coverImage{ ${IMAGE_FIELDS} },
    boards[0]{ ${IMAGE_FIELDS} },
    gallery[0]{ ${IMAGE_FIELDS} },
    mainImage{ ${IMAGE_FIELDS} }
  )
`;

export const FEATURED_PROJECTS_QUERY = groq`
  *[_type == "project"] | order(year desc, _createdAt desc) [0...4] {
    ${PROJECT_CARD_FIELDS}
  }
`;

export const WORK_CAROUSEL_QUERY = groq`
  *[_type == "project"] | order(year desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    skills,
    "category": coalesce(skills[0], "Project"),
    "img": ${PROJECT_IMAGE_FALLBACK}
  }
`;

export const PROJECTS_QUERY = groq`
  *[_type == "project"] | order(year desc, _createdAt desc) {
    ${PROJECT_CARD_FIELDS}
  }
`;

export const PROJECT_DETAIL_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    skills,
    year,
    additionalInformation {
      title,
      description
    },
    "coverImage": coverImage{ ${IMAGE_FIELDS} },
    "boards": coalesce(boards[]{ ${IMAGE_FIELDS} }, [])
  }
`;

export const PROJECT_NAV_QUERY = groq`
  *[_type == "project"] | order(year desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "image": coalesce(coverImage{ ${IMAGE_FIELDS} }, boards[0]{ ${IMAGE_FIELDS} })
  }
`;

export const SERVICES_QUERY = groq`
  *[_type == "service"] | order(coalesce(order, _createdAt) asc) {
    _id,
    title,
    "slug": slug.current,
    order,
    tagline,
    description,
    summary,
    items,
    learnMoreHref,
    "coverImage": coalesce(coverImage{ ${IMAGE_FIELDS} }, image{ ${IMAGE_FIELDS} })
  }
`;
export const ABOUT_PAGE_QUERY = groq`
  *[_type == "aboutPage"][0] {
    heading,
    intro,
    portrait,
    recognitions[]{
      _key,
      awardName,
      year,
      description,
      images
    }
  }
`;

export const PROCESS_STEPS_QUERY = groq`
  *[_type == "processStep"] | order(coalesce(order, stepNumber, _createdAt) asc) {
    _id,
    stepNumber,
    title,
    description
  }
`;

export const INDUSTRIAL_DESIGN_PROJECTS_QUERY = groq`
  *[_type == "project" && "Industrial Design" in skills]
  | order(year desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    skills,
    "summary": additionalInformation.description,
    "category": skills[0],
    "image": ${PROJECT_IMAGE_FALLBACK}
  }
`;

/**
 * Fetches projects tagged "Brand Direction" or "Fashion Styling" for the
 * Brand & Creative Direction sub-page carousels.
 * A project with both tags will appear in both carousels (filtered client-side).
 */
export const BRAND_CREATIVE_CASES_QUERY = groq`
  *[_type == "project" && ("Brand Direction" in skills || "Fashion Styling" in skills)]
  | order(year desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    skills,
    "summary": additionalInformation.description,
    "category": skills[0],
    "image": ${PROJECT_IMAGE_FALLBACK}
  }
`;
