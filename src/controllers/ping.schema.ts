import { FastifySchema } from "fastify";
const whereSchema = {
  carrier_id: { type: "number" },
}
const pingSchema: FastifySchema = {
  // params: {  // GET => require
  //   type: 'object',
  //   properties: {
  //     par1: { type: 'string' },
  //     par2: { type: 'number' }
  //   }
  // },
  // querystring: { // GET => don't require
  //   type: 'object',
  //   properties: {
  //     // filter: {
  //     //   type: 'object',
  //     //   // where: { type: "string" },
  //     //   // test1: { type: 'string' }
  //     //   // where: {
  //     //   //   type: 'array',
  //     //   //   items: {
  //     //   //     carrier_id: { type: 'number' }
  //     //   //   }
  //     //   //   // anyOf: [
  //     //   //   //   {
  //     //   //   //     type: 'object',
  //     //   //   //     properties: {
  //     //   //   //       carrier_id: { type: 'number' }
  //     //   //   //     },
  //     //   //   //     require: ['carrier_id']
  //     //   //   //   },
  //     //   //   // ]
  //     //   // }
  //     // }
  //     type: "array",
  //     items: {
  //       properties: whereSchema
  //     }
  //   }
  // },


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
