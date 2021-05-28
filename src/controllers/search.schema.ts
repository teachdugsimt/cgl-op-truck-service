import { FastifySchema } from "fastify";

const searchSchema: FastifySchema = {
  body: {
    type: 'object',
    properties: {
      descending: { type: "boolean", nullable: true },
      page: { type: "number", nullable: true },
      rowsPerPage: { type: "number", nullable: true },
      sortBy: { type: "string", nullable: true },
      truckTypes: { type: "array", nullable: true },
      workingZones: { type: 'array', nullable: true },
      // truckAmount: { type: "number", nullable: true },
      // id: { type: 'string', nullable: true },
      // truckType: { type: 'number', nullable: true },
      // loadingWeight: { type: "number", nullable: true },
      // stallHeight: { type: 'string', nullable: true },
      // createdAt: { type: 'string', nullable: true },
      // updatedAt: { type: 'string', nullable: true },
      // approveStatus: { type: 'string', nullable: true },
      // registrationNumber: { type: 'array', items: { type: 'string' }, nullable: true },
      // tipper: { type: 'boolean', nullable: true },
      // phoneNumber: { type: 'string', nullable: true },
      // isLiked: { type: 'boolean', nullable: true },
      // owner: {
      //   type: 'object',
      //   properties: {
      //     id: { type: "number", nullable: true },
      //     userId: { type: "string", nullable: true },
      //     companyName: { type: "string", nullable: true },
      //     fullName: { type: "string", nullable: true },
      //     mobileNo: { type: "string", nullable: true },
      //     email: { type: "string", nullable: true },
      //     avatar: {
      //       type: 'object', properties: {
      //         object: { type: 'string', nullable: true },
      //         token: { type: 'string', nullable: true },
      //       }, nullable: true
      //     },
      //   }, nullable: true
      // }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: { type: 'array' },
        totalElements: { type: 'number' },
        size: { type: 'number' },
        totalPages: { type: 'number' },
      },
    }
  }
}

export default searchSchema
