import { ViewEntity, ViewColumn, AfterLoad } from "typeorm";
import Security from 'utility-layer/dist/security'
// import Security from 'utility-layer/src/helper/security'

const util = new Security();

@ViewEntity({
  expression: `
  SELECT truck.id,
        CASE
            WHEN truck.approve_status = 0 THEN 'Pending'::text
            ELSE 'Approved'::text
        END AS approve_status,
    truck.loading_weight,
    string_to_array(truck.registration_number::text, ' '::text) AS registration_number,
    truck.stall_height,
    (CASE WHEN COUNT(qu) > 0 THEN COUNT(qu) END) AS quotation_number,
    truck.is_tipper AS tipper,
    truck.truck_type,
    truck.created_at,
    truck.updated_at,
    truck.carrier_id,
    json_build_object('id', usr.id, 'fullName', usr.fullname, 'email', usr.email, 'mobileNo', usr.phone_number, 'avatar', json_build_object('object', usr.avatar)) AS owner,
        CASE
            WHEN (array_agg(wr.region))[1] IS NOT NULL THEN json_agg(json_build_object('region', wr.region, 'province', wr.province))
            ELSE NULL::json
        END AS work_zone
   FROM truck truck
     LEFT JOIN truck_working_zone wr ON wr.truck_id = truck.id
     LEFT JOIN dblink('myserver'::text, 'SELECT id,email,fullname,phone_number,avatar FROM user_profile'::text) usr(id integer, email text, fullname text, phone_number text, avatar text) ON usr.id = truck.carrier_id
     LEFT JOIN dblink('cargolink'::text, 'SELECT id,order_id,truck_id FROM dtb_quotation_truck'::text) qu(id integer, order_id integer, truck_id integer) ON qu.truck_id = truck.id
  GROUP BY truck.id, usr.id, usr.email, usr.fullname, usr.phone_number, usr.avatar;
  `
})
export class VwTruckList {

  @ViewColumn()
  id: number | string

  @ViewColumn({ name: "approve_status" })
  approveStatus: string

  @ViewColumn({ name: "loading_weight" })
  loadingWeight: number

  @ViewColumn({ name: "registration_number" })
  registrationNumber: Array<string>

  @ViewColumn({ name: "stall_height" })
  stallHeight: number

  @ViewColumn({ name: "tipper" })
  tipper: boolean

  @ViewColumn({ name: "truck_type" })
  truckType: number

  @ViewColumn({ name: "created_at" })
  createdAt: Date | null

  @ViewColumn({ name: "updated_at" })
  updatedAt: Date | null

  @ViewColumn({ name: "quotation_number" })
  quotationNumber: number | null

  @ViewColumn({ name: "work_zone" })
  workingZones: Array<{
    region: number | undefined, province?: number | undefined
  }>
  @ViewColumn({ name: "owner" })
  owner: {
    "id": number
    "userId": string
    // "companyName": "Maya Moya"
    fullName: string | undefined
    mobileNo: string | undefined
    email: string | undefined
    avatar: {
      object: string | undefined
    } | undefined
  }

  @AfterLoad()
  getUserId() {
    this.owner.userId = util.encodeUserId(+this.owner.id);
  }

  @AfterLoad()
  parseTruckId() {
    this.id = util.encodeUserId(+this.id)
  }
}
