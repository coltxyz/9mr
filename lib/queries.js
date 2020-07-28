export const contentQuery = `*[_type == 'page']{
  ...
}`;
export const globalQuery = `*[_type == 'global']{
  ...,
  homepage_background_images[] {
    asset ->{ ... }
  }
}`
