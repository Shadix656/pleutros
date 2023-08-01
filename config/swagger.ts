export default {
  path: __dirname + '../',
  title: 'Pleutros',
  version: '1.0.0',
  tagIndex: 1,
  ignore: ['/swagger', '/docs', '/uploads/*'],
  snakeCase: false,
  preferredPutPatch: 'PUT',
  common: {
    parameters: {
      sortable: [
        {
          in: 'query',
          name: 'sortBy',
          schema: { type: 'string', example: 'foo' },
        },
        {
          in: 'query',
          name: 'sortType',
          schema: { type: 'string', example: 'ASC' },
        },
      ],
    },
    headers: {
      paginated: {
        'X-Total-Pages': {
          description: 'Total amount of pages',
          schema: { type: 'integer', example: 5 },
        },
        'X-Total': {
          description: 'Total amount of results',
          schema: { type: 'integer', example: 100 },
        },
        'X-Per-Page': {
          description: 'Results per page',
          schema: { type: 'integer', example: 20 },
        },
      },
    },
  },
}
