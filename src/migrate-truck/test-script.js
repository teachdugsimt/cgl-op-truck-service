const { Pool } = require('pg');
const sql = require('sql');
const jwt = require('jsonwebtoken')
const axios = require('axios')
const Hashids = require('hashids');
const _ = require('lodash');
const { EEXIST } = require('constants');
const { xor } = require('lodash');
// const Utility = require('utility-layer/dist/security');
// const util = new Utility();

const addFamilyColumn = async () => {

  // console.log("Mix array : ", mixArr)

  const devConnection = {
    host: "cgl-dev-db.ccyrpfjhgi1v.ap-southeast-1.rds.amazonaws.com",
    user: "postgres",
    password: ".9^Piv-.KlzZhZm.MU7vXZU7yE9I-4",
    database: 'job_service',
    port: 5432,
  }
  const stgConnection = {
    host: "cgl-db.cj4ycxviwust.ap-southeast-1.rds.amazonaws.com",
    user: "postgres",
    password: "7uZrE546PzCjEV^e^tKpvs43PJTnHN",
    database: 'job_service',
    port: 5432,
  }
  const prodConnection = {
    host: "cgl-db.cs7ingowcayi.ap-southeast-1.rds.amazonaws.com",
    user: "postgres",
    password: "FaOpNg13iRDxxHWR8iOmV=Mx-YHzGI",
    database: 'job_service',
    port: 5432,
  }
  const clientJobService = new Pool(devConnection)
  const newJobConnection = await clientJobService.connect();

  // const { rows: RowJob } = await newJobConnection.query(`SELECT * FROM job_clone_v3;`);

  // ** ADD VIEW
  const sqlCreateViewJobListV2 = `CREATE OR REPLACE VIEW vw_job_list_v2 AS  SELECT j.id,
  j.user_id,
  j.product_type_id,
  j.product_name,
  j.truck_type,
  j.total_weight AS weight,
  j.truck_amount AS required_truck_amount,
  j.loading_address,
  j.loading_datetime,
  j.loading_contact_name,
  j.loading_contact_phone,
  j.loading_latitude,
  j.loading_longitude,
  j.status,
  j.offered_total AS price,
  j.price_type,
  j.tipper,
  j.is_deleted,
  j.public_as_cgl,
  json_agg(json_build_object('name', s.address_dest, 'dateTime', s.delivery_datetime, 'contactName', s.fullname_dest, 'contactMobileNo', s.phone_dest, 'lat', s.latitude_dest::character varying, 'lng', s.longitude_dest::character varying)) AS shipments,
  j.full_text_search,
  j.created_at,
  j.family
 FROM job j
   LEFT JOIN shipment s ON s.job_id = j.id
GROUP BY j.id, j.user_id, j.product_type_id, j.product_name, j.truck_type, j.total_weight, j.truck_amount, j.loading_address, j.loading_datetime, j.loading_contact_name, j.loading_contact_phone, j.loading_latitude, j.loading_longitude, j.status, j.offered_total, j.price_type, j.tipper, j.is_deleted, j.full_text_search, j.public_as_cgl, j.family, j.created_at;`
  await newJobConnection.query(sqlCreateViewJobListV2);

  // ** ADD COLUMN
  const sqlAddColumn = `ALTER TABLE job
  ADD COLUMN family jsonb;`
  await newJobConnection.query(sqlAddColumn);



  console.log('Finished add job family Column');
  return true;

}



const main = async () => {
  try {

    await addFamilyColumn()

    return true
  } catch (error) {
    throw error
  }
}
main()
