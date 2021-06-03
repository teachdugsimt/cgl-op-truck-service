import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
  expression: `
  SELECT truck.id,
  truck.approve_status,
  truck.loading_weight,
  string_to_array(truck.registration_number::text, ' '::text) AS registration_number,
  truck.stall_height,
  truck.is_tipper AS tipper,
  truck.truck_type,
  truck.created_at,
  truck.updated_at,
  json_agg(json_build_object('region', wr.region, 'province', wr.province)) AS work_zone
 FROM dtb_truck truck
   LEFT JOIN dtb_truck_working_zone wr ON wr.truck_id = truck.id
GROUP BY truck.id;
  `
})
export class VwTruckList {

  @ViewColumn()
  id: number

  @ViewColumn()
  approve_status: number

  @ViewColumn()
  loading_weight: number

  @ViewColumn()
  registration_number: Array<number>

  @ViewColumn()
  stall_height: number

  @ViewColumn()
  tipper: boolean

  @ViewColumn()
  truck_type: number

  @ViewColumn()
  created_at: Date | null

  @ViewColumn()
  updated_at: Date | null

  @ViewColumn()
  work_zone: Array<{
    region: number | undefined, province?: number | undefined
  }>
}
