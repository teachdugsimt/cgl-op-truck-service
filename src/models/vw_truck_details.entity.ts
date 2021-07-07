import { ViewEntity, ViewColumn, AfterLoad } from "typeorm";
import Security from 'utility-layer/dist/security'
// import Security from 'utility-layer/src/helper/security'

const util = new Security();

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
    truck.carrier_id,
    json_agg(json_build_object(
        CASE
            WHEN tp.type = 1 THEN 'front'::text
            WHEN tp.type = 2 THEN 'back'::text
            WHEN tp.type = 3 THEN 'left'::text
            WHEN tp.type = 4 THEN 'right'::text
            WHEN tp.type IS NULL THEN 'left'::text
            ELSE ''::text
        END, tp.photo_name)) AS truck_photos,
        CASE
            WHEN (array_agg(wr.region))[1] IS NOT NULL THEN json_agg(json_build_object('region', wr.region, 'province', wr.province))
            ELSE COALESCE('[]'::json)
        END AS work_zone,
    json_build_object('id', usr.id, 'fullName', usr.fullname, 'companyName', usr.fullname, 'email', usr.email, 'mobileNo', usr.phone_number, 'avatar', json_build_object('object', usr.avatar)) AS owner
   FROM truck truck
     LEFT JOIN truck_working_zone wr ON wr.truck_id = truck.id
     LEFT JOIN truck_photo tp ON tp.truck_id = truck.id
     LEFT JOIN dblink('myserver'::text, 'SELECT id,email,fullname,phone_number,avatar FROM user_profile'::text) usr(id integer, email text, fullname text, phone_number text, avatar text) ON usr.id = truck.carrier_id
  GROUP BY truck.id, tp.truck_id, usr.id, usr.email, usr.fullname, usr.phone_number, usr.avatar;
  `
})
export class VwTruckDetails {

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

  // @ViewColumn({ name: "quotation_number" })
  // quotationNumber: number | null

  @ViewColumn({ name: "work_zone" })
  workingZones: Array<{
    region: number | undefined, province?: number | undefined
  }>

  @ViewColumn({ name: "owner" })
  owner: {
    "id": number
    "userId": string
    "companyName": string  | undefined
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
    // this.owner.companyName = this.owner.fullName
  }


  @ViewColumn({ name: "truck_photos" })
  truckPhotos: Array<object>
  // [{"left" : "d84c60ab67e64a7d23626e32e357e4c226da48f42dca803e3b058c03d95785f2c0becca9a0272a94c82155f08e2f94c61cd887d390ab0d87f84e01f5245e4ed0"},
  //  {"back" : "b16f7550f1fd3c5e361c7c1e3ab62be86b5f8f90f3736b1ebf512ab1f1282630f7e10a35d125ca96a32eea6196d72c4a0bde2c5c84020227f4700e1abd338d44"}]
  @AfterLoad()
  parseTruckId() {
    this.id = util.encodeUserId(+this.id)
  }
}