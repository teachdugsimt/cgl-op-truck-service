import { FastifySchema } from "fastify";

const searchSchema: FastifySchema = {
  body: {
    type: 'object',
    properties: {
      descending: { type: 'boolean', nullable: true },
      page: { type: 'number', nullable: true },
      rowsPerPage: { type: 'number', nullable: true },
      sortBy: { type: 'string', nullable: true },
      truckTypes: { type: 'array', items: { type: 'number' }, nullable: true },
      workingZones: { type: 'array', items: { type: 'number' }, nullable: true },
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: { type: 'array' },
        totalElements: { type: 'number' },
        size: { type: 'number' },
        numberOfElements: { type: 'number' },
        currentPage: { type: 'number' },
        totalPages: { type: 'number' },
      },
    }
  }
}

export default searchSchema
