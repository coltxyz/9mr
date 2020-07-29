import Album from 'react-icons/lib/io/ios-albums'

export default {
  name: 'global',
  title: 'Global',
  type: 'document',
  fieldsets: [
    { name: 'metadata', title: 'Site Metadata', options: {collapsible: true, collapsed: true}},
    { name: 'homepage', title: 'Home Page', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    {
      name: 'page_title',
      title: 'Site Title',
      type: 'string',
      fieldset: 'metadata'
    },
    {
      name: 'page_description',
      title: 'Site Description',
      type: 'string',
      fieldset: 'metadata'
    },
    {
      name: 'page_share_image',
      title: 'Share Image',
      description: 'Will be displayed when someone shares a link to the site',
      type: 'image',
      fieldset: 'metadata'
    },
    {
      name: 'gid',
      title: 'Google Analytics Key',
      description: 'Add the google analytics ID here to track user behavior. Note: not activated if blank',
      type: 'string',
      fieldset: 'metadata'
    },
    {
      name: 'page_url',
      title: 'Page URL',
      description: 'Page canonical URL',
      type: 'string',
      fieldset: 'metadata'
    },
    {
      name: 'homepage_background_images',
      title: 'Background Images',
      type: 'array',
      of: [
        {type: 'image'}
      ],
      fieldset: 'homepage'
    },
    {
      name: 'homepage_description',
      title: 'Description',
      type: 'string',
      fieldset: 'homepage'
    },
    {
      name: 'homepage_section_1',
      title: 'Row One Text',
      type: 'string',
      fieldset: 'homepage'
    },
    {
      name: 'homepage_section_2',
      title: 'Row Two Text',
      type: 'string',
      fieldset: 'homepage'
    },
    {
      name: 'homepage_section_3',
      title: 'Row Three Text',
      type: 'string',
      fieldset: 'homepage'
    },
    {
      name: 'gallery_url',
      title: 'Gallery Url',
      description: 'Will be triggered when the Gallery menu item is clicked',
      type: 'string'
    }
  ]
}
