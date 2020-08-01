import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: "oju94hgj",
  dataset: "production",
  useCdn: true
})
