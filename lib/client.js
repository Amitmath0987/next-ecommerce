import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// create sanity client
export const client = sanityClient({
  projectId: "h9g666ls",
  dataset: "production",
  apiVersion: "2022-10-30",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source)