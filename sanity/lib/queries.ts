import { groq } from "next-sanity";

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
      "url": asset->url
    }
  }
`;

const PROJECT_CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  skills,
  year,
  "boards": coalesce(boards[].asset->url, gallery[].asset->url, []),
  "hero": coalesce(boards[0].asset->url, gallery[0].asset->url, mainImage.asset->url)
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
    "category": coalesce(skills[0], "Project"),
    "img": coalesce(boards[0].asset->url, gallery[0].asset->url, mainImage.asset->url)
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
    "boards": coalesce(boards[].asset->url, [])
  }
`;

export const PROJECT_NAV_QUERY = groq`
  *[_type == "project"] | order(year desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "image": boards[0].asset->url
  }
`;

export const SERVICES_QUERY = groq`
  *[_type == "service"] | order(coalesce(order, _createdAt) asc) {
    _id,
    title,
    "slug": slug.current,
    "coverImage": coalesce(coverImage.asset->url, image.asset->url)
  }
`;

export const ABOUT_PAGE_QUERY = groq`
  *[_type == "aboutPage"][0] {
    heading,
    intro,
    "portrait": portrait.asset->url,
    recognitions[]{
      _key,
      awardName,
      year,
      description,
      "image": image.asset->url
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
