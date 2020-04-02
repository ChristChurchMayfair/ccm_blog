import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "ip162aeb",
  dataset: "production",
  useCdn: true
});
