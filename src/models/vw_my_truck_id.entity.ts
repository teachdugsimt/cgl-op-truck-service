import { RSA_X931_PADDING } from "constants";
import { ViewEntity, ViewColumn, AfterLoad } from "typeorm";
import Security from 'utility-layer/dist/security'
// import Security from 'utility-layer/src/helper/security'
import _ from 'lodash'

const util = new Security();
@ViewEntity({
  expression: `
  SELECT truck.id,
  truck.approve_status,
  truck.loading_weight,
  string_to_array(truck.registration_number::text, ' '::text) AS registration_number,
  truck.stall_height,
  ( SELECT count(*) AS count
         FROM dblink('bookingservice'::text, 'SELECT id,truck_id,requester_type,accepter_user_id,status FROM booking'::text) book2(id integer, truck_id integer, requester_type text, accepter_user_id integer, status text)
        WHERE book2.truck_id = truck.id AND book2.requester_type = 'JOB_OWNER'::text AND book2.status = 'WAITING'::text) AS quotation_number,
      CASE
          WHEN truck.id = bookv.truck_id THEN json_agg(json_build_object('id', bookv.id, 'avatar', bookv.avatar, 'fullname', bookv.fullname, 'bookingdatetime', bookv.bookingdatetime))
          ELSE COALESCE('[]'::json)
      END AS quotations,
  truck.is_tipper AS tipper,
  truck.truck_type,
  truck.created_at,
  truck.updated_at,
  ( SELECT json_object_agg(
              CASE
                  WHEN tp.type = 1 THEN 'front'::text
                  WHEN tp.type = 2 THEN 'back'::text
                  WHEN tp.type = 3 THEN 'left'::text
                  WHEN tp.type = 4 THEN 'right'::text
                  ELSE 'none'::text
              END, tp.photo_name) AS truck_photos
         FROM truck_photo tp
        WHERE tp.truck_id = truck.id) AS truck_photos,
  truck.carrier_id,
      CASE
          WHEN (array_agg(wr.region))[1] IS NOT NULL THEN json_agg(json_build_object('region', wr.region, 'province', wr.province))
          ELSE COALESCE('[]'::json)
      END AS work_zone
 FROM truck truck
   LEFT JOIN truck_working_zone wr ON wr.truck_id = truck.id
   LEFT JOIN dblink('bookingservice'::text, 'SELECT id,truck_id,avatar,fullname,bookingdatetime,status FROM vw_job_booking_truck_list'::text) bookv(id integer, truck_id integer, avatar json, fullname text, bookingdatetime text, status text) ON bookv.truck_id = truck.id AND bookv.status = 'WAITING'::text
GROUP BY truck.id, bookv.truck_id, bookv.status;
  `
})
export class VwMyTruckId {

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

  @ViewColumn({ name: "quotations" })
  quotations: Array<{
    avatar: {
      object: string | undefined
      token: string | undefined
    } | null
    id: string | undefined
    fullName: string | undefined
    bookingDatetime: string | undefined
  }> | [] | null

  @ViewColumn({ name: "truck_photos" })
  truckPhotos: {
    front: string | null
    back: string | null
    left: string | null
    right: string | null
  } | null

  @ViewColumn({ name: "work_zone" })
  workingZones: Array<{
    region: number | undefined, province?: number | undefined
  }>

  @AfterLoad()
  parseTruckId() {
    this.id = util.encodeUserId(+this.id)
  }

  @AfterLoad()
  uniqueQuotations() {
    this.quotations = this.quotations && this.quotations.length > 0 ?
      _.uniqBy(this.quotations, 'id') : this.quotations
  }

  @AfterLoad()
  parseQuotationNumber() {
    this.quotationNumber = Number(this.quotationNumber)
  }
}
