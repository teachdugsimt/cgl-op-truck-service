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
    id: { type: 'number' },
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

