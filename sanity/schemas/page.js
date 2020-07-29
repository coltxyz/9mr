import Album from 'react-icons/lib/io/ios-albums'

export default {
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    {
      name: 'page_title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'page_slug',
      title: 'Slug',
      type: 'slug'
    }, {
      name: 'page_content',
      title: 'Content',
      type: 'array',
      of: [
        {
          name: 'two_column_row',
          type: 'object',
          title: 'Split Row',
          fields: [
            {
              name: 'row_left',
              title: 'Left',
              type: 'array',
              of: [
                {type: 'block'}
              ]
            }, {
              name: 'row_right',
              title: 'Right',
              type: 'array',
              of: [
                {type: 'block'}
              ]
            }
        ]
      },
      {
        name: 'one_column_row',
        title: 'Full Row',
        type: 'object',
        icon: null,
        fields: [
          {
            name: 'row',
            title: 'Row',
            type: 'array',
            of: [
              {type: 'block'}
            ]
          }
        ]
      }]
    }
  ]
}
