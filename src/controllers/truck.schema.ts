import { FastifySchema } from "fastify";
const whereSchema = {
  carrier_id: { type: "number" },
}
export const TruckFilterSchema: FastifySchema = {
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
        data: { type: 'array' },
      },
    }
  }
}


const truckProperties = {
  id: { type: 'number' },
  name: { type: 'string', nullable: true },
  carrier_id: { type: 'number' },
  insurance_policy_document: { type: 'string', nullable: true },
  receipt_annual_document: { type: 'string', nullable: true },
  registration_number: { type: 'string', nullable: true },
  registration_number_document: { type: 'string', nullable: true },
  technical_logbook_document: { type: 'string', nullable: true },
  loading_weight: { type: 'number', nullable: true },
  version: { type: 'number', nullable: true },
  created_at: { type: "string", format: "date-time" },
  updated_at: { type: "string", format: "date-time" },
  created_user: { type: 'string', nullable: true },
  updated_user: { type: 'string', nullable: true },
  is_deleted: { type: 'boolean', nullable: true },
  truck_type: { type: 'number' },
  approve_status: { type: 'number' },
  approve_date: { type: 'string' },
  vehicle_registration_year: { type: 'string', nullable: true },
  note: { type: 'string', nullable: true },
  type_of_cargo: { type: 'string', nullable: true },
  group_truck_type: { type: 'number' },
  dlt_sticker_expired_date: { type: "string", format: "date-time", nullable: true },
  is_tipper: { type: 'boolean', nullable: true },
  stall_height: { type: 'string', nullable: true },
}
export const TruckSchema: FastifySchema = {
  params: {
    id: { type: 'string' },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: { type: "object", properties: truckProperties },
      },
    }
  }
}


const modelJoinTruck = {
  id: { type: 'string' },
  approveStatus: { type: 'string' },
  loadingWeight: { type: 'number' },
  registrationNumber: { type: 'array', nullable: true },
  stallHeight: { type: 'string' },
  tipper: { type: 'boolean' },
  truckType: { type: "number" },
  createdAt: { type: "string", format: "date-time" },
  updatedAt: { type: "string", format: "date-time" },
  quotationNumber: { type: 'number', nullable: true },
  workingZones: { type: 'array' },
  owner: {
    type: 'object', properties: {
      id: { type: 'number', nullable: true },
      userId: { type: 'string', nullable: true },
      companyName: { type: 'string', nullable: true },
      fullName: { type: 'string', nullable: true },
      mobileNo: { type: 'string', nullable: true },
      email: { type: 'string', nullable: true },
      avatar: { type: 'object', properties: { object: { type: 'string', nullable: true } } },
    }
  },
  truckPhotos: {
    type: 'object', properties: {
      front: { type: 'string' },
      back: { type: 'string' },
      left: { type: 'string' },
      right: { type: 'string' },
    }
  }
}
export const TruckOne: FastifySchema = {  // without quotations data
  params: {
    id: { type: 'string' },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: { type: "object", properties: modelJoinTruck },
      },
    }
  }
}

const modelTruckMST = {
  id: { type: 'string' },
  carrierId: { type: 'number' },
  approveStatus: { type: 'string' },
  loadingWeight: { type: 'number' },
  registrationNumber: { type: 'string', nullable: true },
  stallHeight: { type: 'string' },
  tipper: { type: 'boolean' },
  truckType: { type: "number" },
  createdAt: { type: "string", format: "date-time" },
  updatedAt: { type: "string", format: "date-time" },
}
export const TruckOneMST: FastifySchema = {  // without quotations data
  params: {
    id: { type: 'string' },
  },
  response: {
    200: {
      type: 'object',
      properties: modelTruckMST
    }
  }
}



export const TruckOneOnlyMe: FastifySchema = {  // attach quotatitons data
  params: {
    id: { type: 'string' },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: "object", properties: {
            ...modelJoinTruck,
            quotations: { type: 'array' }
          }
        },
      },
    }
  }
}



export const FavoriteTruck: FastifySchema = {
  headers: {
    type: 'object',
    properties: {
      authorization: { type: 'string' }
    },
    require: ['authorization']
  },
  querystring: {
    type: 'object',
    properties: {
      descending: { type: 'boolean', nullable: true },
      page: { type: 'number', nullable: true },
      rowsPerPage: { type: 'number', nullable: true },
      sortBy: { type: 'string', nullable: true },
      truckTypes: { type: 'string', nullable: true },
      status: { type: 'number', nullable: true },
      workingZones: { type: 'string', nullable: true },
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

export const PostFavoriteTruck: FastifySchema = {
  headers: {
    type: 'object',
    properties: {
      authorization: { type: 'string' }
    },
    require: ['authorization']
  },
  body: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    }
  },
  response: {
    200: {
      type: 'boolean'
    }
  }
}


