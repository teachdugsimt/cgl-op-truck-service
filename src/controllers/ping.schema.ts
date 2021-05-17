import { FastifySchema } from "fastify";
const whereSchema = {
  carrier_id: { type: "number" },
}
const pingSchema: FastifySchema = {
  querystring: {
    type: 'object',
    in: "query",
    properties: {
      filter: {
        where: {
          type: "array",
          items: {
            properties: whereSchema
          }
        }
      }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'array' },
      },
      additionalProperties: false
    }
  }
}

export default pingSchema
