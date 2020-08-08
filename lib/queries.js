export const projectsQuery = `*[_type == 'portfolio-item']{
  _id,
  title,
  year,
  month,
  location,
  slug,
  description,
  hidden,
  images[] {
    imageColor { asset ->{...}},
    imageMono { asset ->{...}},
    videoColor{ asset ->{...}},
    videoMono{ asset ->{...}},
    type,
    title,
    _key
  }
}`;

export const teamQuery = `*[_id == 'team-member-list'] {
  members[] -> {
    ...,
    photo { asset -> {...}}
  }
}`

export const aboutQuery = `*[_type == 'about-pages']`

export const featuredContent = `*[_id == 'portfolio-item-list']`
