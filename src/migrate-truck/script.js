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

const salt = 'secretkeyforcargolinkproject'
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

const oldHost = "cgl-db.cj4ycxviwust.ap-southeast-1.rds.amazonaws.com"
const oldUser = 'postgres'
const oldPassword = "7uZrE546PzCjEV^e^tKpvs43PJTnHN"
const oldDB = 'cargolink'
const oldPort = 5432

const newHost = "cgl-db.cj4ycxviwust.ap-southeast-1.rds.amazonaws.com"
const newUser = 'postgres'
const newPassword = "7uZrE546PzCjEV^e^tKpvs43PJTnHN"
const newDB = 'truck_service'
const newPort = 5432

const newDBUser = 'user_service'

const oldConnection = {
  host: oldHost,
  user: oldUser,
  password: oldPassword,
  database: oldDB,
  port: oldPort,
}

const newConnection = {
  host: newHost,
  user: newUser,
  password: newPassword,
  database: newDB,
  port: newPort,
}

const productionConnection = {
  host: "cgl-db.cs7ingowcayi.ap-southeast-1.rds.amazonaws.com",
  user: "postgres",
  password: "FaOpNg13iRDxxHWR8iOmV=Mx-YHzGI",
  database: "truck_service",
  port: 5432,
}


const createTable = async () => {
  const clientTo = new Pool(newConnection);
  const connectTo = await clientTo.connect();
  const sqlCreateFavoriteSeq = `CREATE SEQUENCE IF NOT EXISTS favorite_seq;`
  const sqlCreateFavorite = `
  CREATE TABLE "public"."favorite" (
      "id" int4 NOT NULL DEFAULT nextval('favorite_seq'::regclass),
      "user_id" int4 NOT NULL,
      "truck_id" int4,
      "version" int4 NOT NULL DEFAULT 0,
      "created_at" timestamp(0) DEFAULT CURRENT_TIMESTAMP,
      "updated_at" timestamp(0) DEFAULT CURRENT_TIMESTAMP,
      "created_user" varchar(254) DEFAULT NULL::character varying,
      "updated_user" varchar(254) DEFAULT NULL::character varying,
      "is_deleted" bool NOT NULL DEFAULT false,
      PRIMARY KEY ("id")
  );`;

  const sqlCreateTruckSeq = `CREATE SEQUENCE IF NOT EXISTS truck_seq;`
  const sqlDropTruckEnum = `DROP TYPE IF EXISTS "public"."status_enum";`
  const sqlCreateTruckEnum = `CREATE TYPE "public"."status_enum" AS ENUM ('INACTIVE', 'ACTIVE');`
  const sqlCreateTruck = `
  CREATE TABLE "public"."truck" (
    "id" int4 NOT NULL DEFAULT nextval('truck_seq'::regclass),
    "name" varchar(255) DEFAULT NULL::character varying,
    "carrier_id" int4 NOT NULL DEFAULT 0,
    "registration_number" varchar(255) DEFAULT NULL::character varying,
    "loading_weight" float8 DEFAULT 0,
    "created_at" timestamp(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp(0) DEFAULT CURRENT_TIMESTAMP,
    "created_user" varchar(254) DEFAULT NULL::character varying,
    "updated_user" varchar(254) DEFAULT NULL::character varying,
    "is_deleted" bool NOT NULL DEFAULT false,
    "truck_type" int4 NOT NULL DEFAULT 0,
    "approve_status" "public"."status_enum" NOT NULL DEFAULT 'INACTIVE'::status_enum,
    "approve_date" timestamp(0) DEFAULT NULL::timestamp without time zone,
    "group_truck_type" int4,
    "is_tipper" bool DEFAULT false,
    "stall_height" varchar(10) DEFAULT NULL::character varying,
    "favorite" int4,
    "created_from" int4 DEFAULT 1,
    PRIMARY KEY ("id")
);`;

  const sqlCreateTruckPhotoSeq = `CREATE SEQUENCE IF NOT EXISTS truck_photo_seq;`
  const sqlCreateTruckPhoto = `
  CREATE TABLE "public"."truck_photo" (
      "id" int4 NOT NULL DEFAULT nextval('truck_photo_seq'::regclass),
      "truck_id" int4 NOT NULL,
      "photo_name" varchar(255) NOT NULL,
      "created_at" timestamp(0) DEFAULT CURRENT_TIMESTAMP,
      "updated_at" timestamp(0) DEFAULT CURRENT_TIMESTAMP,
      "created_user" varchar(254) DEFAULT NULL::character varying,
      "updated_user" varchar(254) DEFAULT NULL::character varying,
      "is_deleted" bool NOT NULL DEFAULT false,
      "type" int4,
      PRIMARY KEY ("id")
  );`;

  const sqlCreateTruckWorkingZoneSeq = `CREATE SEQUENCE IF NOT EXISTS truck_working_zone_seq;`
  const sqlCreateTruckWorkingZone = `
  CREATE TABLE "public"."truck_working_zone" (
      "id" int4 NOT NULL DEFAULT nextval('truck_working_zone_seq'::regclass),
      "truck_id" int4 NOT NULL,
      "region" int4,
      "province" int4,
      "created_at" timestamp(0) DEFAULT CURRENT_TIMESTAMP,
      "updated_at" timestamp(0) DEFAULT CURRENT_TIMESTAMP,
      "created_user" varchar(254) DEFAULT NULL::character varying,
      "updated_user" varchar(254) DEFAULT NULL::character varying,
      "is_deleted" bool NOT NULL DEFAULT false,
      PRIMARY KEY ("id")
  );`;

  await connectTo.query(sqlCreateFavoriteSeq);
  await connectTo.query(sqlCreateFavorite);

  await connectTo.query(sqlCreateTruckSeq);
  await connectTo.query(sqlDropTruckEnum);
  await connectTo.query(sqlCreateTruckEnum);
  await connectTo.query(sqlCreateTruck);

  await connectTo.query(sqlCreateTruckPhotoSeq);
  await connectTo.query(sqlCreateTruckPhoto);

  await connectTo.query(sqlCreateTruckWorkingZoneSeq);
  await connectTo.query(sqlCreateTruckWorkingZone);
}



const addDocumentColumnToTruck = async () => {
  const clientTo = new Pool(newConnection);
  const connectTo = await clientTo.connect();



  const sqlAddDocument = `ALTER TABLE truck ADD document jsonb NULL;`

  const sqlDropEnumDocumentStatus = `DROP TYPE IF EXISTS document_status_enum;`
  const sqlAddEnumDocumentStatus = `CREATE TYPE document_status_enum AS ENUM ('NO_DOCUMENT', 'WAIT_FOR_VERIFIED', 'VERIFIED', 'REJECTED');`

  const sqlAddDocumentStatusColumn = `alter table truck ADD document_status VARCHAR NULL;`
  const sqlChangeDefaultDocumentStatus = `ALTER TABLE truck
  ALTER COLUMN document_status DROP DEFAULT,
  ALTER COLUMN document_status
    SET DATA TYPE document_status_enum
    USING document_status::text::document_status_enum,
  ALTER COLUMN document_status SET DEFAULT 'NO_DOCUMENT';`
  const sqlUpdateDefaultDocumentStatusIfNull = `update truck set document_status='NO_DOCUMENT' where document_status ISNULL;`



  await connectTo.query(sqlAddDocument);
  await connectTo.query(sqlDropEnumDocumentStatus);
  await connectTo.query(sqlAddEnumDocumentStatus);
  await connectTo.query(sqlAddDocumentStatusColumn);
  await connectTo.query(sqlChangeDefaultDocumentStatus);
  await connectTo.query(sqlUpdateDefaultDocumentStatusIfNull);

  console.log("Finish add document column !!")
  return true
}




const TruckNewModel = sql.define({
  name: 'truck',
  columns: ["id", "name", "carrier_id", "registration_number", "loading_weight",
    "truck_type", "approve_status", "approve_date", "group_truck_type",
    "is_tipper", "stall_height", "is_deleted",
    "created_at", "updated_at", "created_user", "updated_user", "created_from"],
});

const runTruck = async () => {
  const client = new Pool(oldConnection);

  const clientNew = new Pool(newConnection);

  const connect = await client.connect();
  const connectNew = await clientNew.connect();

  // type : array
  const { rows: oldTruck } = await connect.query(`SELECT * FROM dtb_truck;`);

  console.log("Olf Truck :: ", oldTruck)
  // type :  array
  const newTruck = oldTruck.map((tr) => ({
    "id": tr["id"],
    "name": tr["name"],
    "carrier_id": tr["carrier_id"],
    "registration_number": tr["registration_number"],
    "loading_weight": tr["loading_weight"],
    "truck_type": tr["truck_type"],
    "approve_status": tr["approve_status"] == 0 ? "INACTIVE" : "ACTIVE",
    "approve_date": tr["approve_date"],
    "group_truck_type": tr["group_truck_type"],
    "is_tipper": tr["is_tipper"],
    "stall_height": tr["stall_height"],
    "is_deleted": tr["is_deleted"],
    "created_at": tr["created_at"],
    "updated_at": tr["updated_at"],
    "created_user": tr["created_user"],
    "updated_user": tr["updated_user"],
    "created_from": tr["created_from"]
  }));

  const rowQueryUserRole = TruckNewModel.insert(newTruck).toQuery();
  await connectNew.query(rowQueryUserRole);

};

const TruckWorkingZoneModel = sql.define({
  name: "truck_working_zone",
  columns: ["id", "truck_id", "region", "province", "is_deleted",
    "created_at", "updated_at", "created_user", "updated_user"]
})

const runTruckWorkingZone = async () => {
  const client = new Pool(oldConnection);

  const clientNew = new Pool(newConnection);

  const connect = await client.connect();
  const connectNew = await clientNew.connect();

  // type : array
  const { rows: oldTruckWorkingZone } = await connect.query(`SELECT * FROM dtb_truck_working_zone;`);

  // type :  array
  const newTruckWorking = oldTruckWorkingZone.map((tr) => ({
    "id": tr["id"],
    "truck_id": tr["truck_id"],
    "region": tr["region"],
    "province": tr["province"],
    "is_deleted": tr["is_deleted"],
    "created_at": tr["created_at"],
    "updated_at": tr["updated_at"],
    "created_user": tr["created_user"],
    "updated_user": tr["updated_user"]
  }));

  const rowQueryUserRole = TruckWorkingZoneModel.insert(newTruckWorking).toQuery();
  await connectNew.query(rowQueryUserRole);

};

const TruckPhotoModel = sql.define({
  name: "truck_photo",
  columns: ["id", "truck_id", "photo_name", "is_deleted", "type",
    "created_at", "updated_at", "created_user", "updated_user"]
})

const runTruckPhoto = async () => {
  const client = new Pool(oldConnection);

  const clientNew = new Pool(newConnection);

  const connect = await client.connect();
  const connectNew = await clientNew.connect();

  // type : array
  const { rows: oldTruckWorkingZone } = await connect.query(`SELECT * FROM dtb_truck_photo;`);

  // type :  array
  const newTruckWorking = oldTruckWorkingZone.map((tr) => ({
    "id": tr["id"],
    "truck_id": tr["truck_id"],
    "photo_name": tr["photo_name"],
    "is_deleted": tr["is_deleted"],
    "type": tr["type"],
    "created_at": tr["created_at"],
    "updated_at": tr["updated_at"],
    "created_user": tr["created_user"],
    "updated_user": tr["updated_user"]
  }));

  const rowQueryUserRole = TruckPhotoModel.insert(newTruckWorking).toQuery();
  await connectNew.query(rowQueryUserRole);

};

const TruckFavoriteModel = sql.define({
  name: "favorite",
  columns: ["id", "user_id", "truck_id", "version", "is_deleted",
    "created_at", "updated_at", "created_user", "updated_user"]
})

const runTruckFavorite = async () => {
  const client = new Pool(oldConnection);

  const clientNew = new Pool(newConnection);

  const connect = await client.connect();
  const connectNew = await clientNew.connect();

  // type : array
  const { rows: oldTruckFavorite } = await connect.query(`SELECT * FROM dtb_favorite_truck_job WHERE truck_id is not null;`);
  console.log("Old Favorite truck :> ", oldTruckFavorite)
  // type :  array
  const newTruckFavorite = oldTruckFavorite.map((tr) => ({
    "id": tr["id"],
    "user_id": tr["user_id"],
    "truck_id": tr["truck_id"],
    "version": tr["version"],
    "is_deleted": tr["is_deleted"],
    "created_at": tr["created_at"],
    "updated_at": tr["updated_at"],
    "created_user": tr["created_user"],
    "updated_user": tr["updated_user"]
  }));

  const rowQueryTruckFavorite = TruckFavoriteModel.insert(newTruckFavorite).toQuery();
  await connectNew.query(rowQueryTruckFavorite);

};



const createExtendsion = async () => {
  const connectNew = new Pool(newConnection)
  const connectNewDB = await connectNew.connect();
  const sqlCreateExtensionDblink = `CREATE EXTENSION IF NOT EXISTS dblink;`;

  const sqlCreateExtensionFdw = `CREATE EXTENSION IF NOT EXISTS postgres_fdw;`;

  const sqlCreateDblinkConnect = `GRANT EXECUTE ON FUNCTION dblink_connect(text) TO public;`;

  const sqlCreateUserService = `CREATE server userserver foreign data wrapper postgres_fdw
OPTIONS (dbname 'user_service', host '${newHost}');`;

  const sqlCreateUserMapping = `CREATE USER MAPPING FOR "public"
SERVER userserver OPTIONS (user '${newUser}', password '${newPassword}');`;

  const sqlCreateBookingService = `CREATE server bookingservice foreign data wrapper postgres_fdw
  OPTIONS (dbname 'booking_service', host '${newHost}');`;

  const sqlCreateBookingMapping = `CREATE USER MAPPING FOR "public"
  SERVER bookingservice OPTIONS(user '${newUser}', password '${newPassword}');`


  await connectNewDB.query(sqlCreateExtensionDblink);
  await connectNewDB.query(sqlCreateExtensionFdw);
  await connectNewDB.query(sqlCreateDblinkConnect);
  await connectNewDB.query(sqlCreateUserService);
  await connectNewDB.query(sqlCreateUserMapping);
  await connectNewDB.query(sqlCreateBookingService);
  await connectNewDB.query(sqlCreateBookingMapping);
}

const createView = async () => {
  const connectNew = new Pool(newConnection)
  const connectNewDB = await connectNew.connect();

  const sqlCreateViewMyTruck = `CREATE VIEW vw_my_truck AS 
  SELECT truck.id,
  truck.approve_status,
  truck.loading_weight,
  string_to_array(truck.registration_number::text, ','::text) AS registration_number,
  truck.stall_height,
  ( SELECT count(*) AS count
         FROM dblink('bookingservice'::text, 'SELECT id,truck_id,requester_type,accepter_user_id,status FROM booking'::text) book2(id integer, truck_id integer, requester_type text, accepter_user_id integer, status text)
        WHERE book2.truck_id = truck.id AND book2.requester_type = 'JOB_OWNER'::text AND book2.status = 'WAITING'::text) AS quotation_number,
  truck.is_tipper AS tipper,
  truck.truck_type,
  truck.created_at,
  truck.updated_at,
  truck.carrier_id,
      CASE
          WHEN (array_agg(wr.region))[1] IS NOT NULL THEN json_agg(json_build_object('region', wr.region, 'province', wr.province))
          ELSE COALESCE('[]'::json)
      END AS work_zone,
  truck.document,
  truck.document_status
 FROM truck truck
   LEFT JOIN truck_working_zone wr ON wr.truck_id = truck.id
GROUP BY truck.id;`

  const sqlCreateViewMyTruckId = `CREATE VIEW vw_my_truck_id AS 
SELECT truck.id,
truck.approve_status,
truck.loading_weight,
string_to_array(truck.registration_number::text, ','::text) AS registration_number,
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
    END AS work_zone,
   truck.document,
   truck.document_status
FROM truck truck
 LEFT JOIN truck_working_zone wr ON wr.truck_id = truck.id
 LEFT JOIN dblink('bookingservice'::text, 'SELECT id,truck_id,avatar,fullname,bookingdatetime,status FROM vw_job_booking_truck_list'::text) bookv(id integer, truck_id integer, avatar json, fullname text, bookingdatetime text, status text) ON bookv.truck_id = truck.id AND bookv.status = 'WAITING'::text
GROUP BY truck.id, bookv.truck_id, bookv.status;`

  const sqlCreateViewTruckDetails = `CREATE VIEW vw_truck_details AS 
SELECT truck.id,
truck.approve_status,
truck.loading_weight,
string_to_array(truck.registration_number::text, ','::text) AS registration_number,
truck.stall_height,
truck.is_tipper AS tipper,
truck.truck_type,
truck.created_at,
truck.updated_at,
truck.carrier_id,
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
    CASE
        WHEN (array_agg(wr.region))[1] IS NOT NULL THEN json_agg(json_build_object('region', wr.region, 'province', wr.province))
        ELSE COALESCE('[]'::json)
    END AS work_zone,
json_build_object('id', usr.id, 'fullName', usr.fullname, 'companyName', usr.fullname, 'email', usr.email, 'mobileNo', usr.phone_number, 'avatar', json_build_object('object', usr.avatar)) AS owner,
truck.created_from
FROM truck truck
 LEFT JOIN truck_working_zone wr ON wr.truck_id = truck.id
 LEFT JOIN dblink('userserver'::text, 'SELECT id,email,fullname,phone_number,avatar FROM user_profile'::text) usr(id integer, email text, fullname text, phone_number text, avatar text) ON usr.id = truck.carrier_id
GROUP BY truck.id, usr.id, usr.email, usr.fullname, usr.phone_number, usr.avatar;`

  const sqlCreateViewTruckFavorite = `CREATE VIEW vw_truck_favorite AS 
SELECT truck.id,
fav.user_id,
truck.approve_status,
truck.loading_weight,
string_to_array(truck.registration_number::text, ','::text) AS registration_number,
truck.stall_height,
truck.is_tipper AS tipper,
truck.truck_type,
truck.created_at,
truck.updated_at,
truck.carrier_id,
json_build_object('id', usr.id, 'fullName', usr.fullname, 'companyName', usr.fullname, 'email', usr.email, 'mobileNo', usr.phone_number, 'avatar', json_build_object('object', usr.avatar)) AS owner,
    CASE
        WHEN (array_agg(wr.region))[1] IS NOT NULL THEN json_agg(json_build_object('region', wr.region, 'province', wr.province))
        ELSE COALESCE('[]'::json)
    END AS work_zone
FROM favorite fav
 LEFT JOIN truck truck ON truck.id = fav.truck_id
 LEFT JOIN truck_working_zone wr ON wr.truck_id = truck.id
 LEFT JOIN dblink('userserver'::text, 'SELECT id,email,fullname,phone_number,avatar FROM user_profile'::text) usr(id integer, email text, fullname text, phone_number text, avatar text) ON usr.id = truck.carrier_id
GROUP BY fav.user_id, truck.id, usr.id, usr.email, usr.fullname, usr.phone_number, usr.avatar;`

  const sqlCreateViewTruckList = `CREATE VIEW vw_truck_list AS 
SELECT truck.id,
truck.approve_status,
truck.loading_weight,
string_to_array(truck.registration_number::text, ','::text) AS registration_number,
truck.stall_height,
( SELECT count(*) AS count
       FROM dblink('bookingservice'::text, 'SELECT id,truck_id,requester_type,accepter_user_id FROM booking'::text) book2(id integer, truck_id integer, requester_type text, accepter_user_id integer)
      WHERE book2.truck_id = truck.id AND book2.requester_type = 'JOB_OWNER'::text) AS quotation_number,
truck.is_tipper AS tipper,
truck.truck_type,
truck.created_at,
truck.updated_at,
truck.carrier_id,
json_build_object('id', usr.id, 'fullName', usr.fullname, 'companyName', usr.fullname, 'email', usr.email, 'mobileNo', usr.phone_number, 'avatar', json_build_object('object', usr.avatar)) AS owner,
    CASE
        WHEN (array_agg(wr.region))[1] IS NOT NULL THEN json_agg(json_build_object('region', wr.region, 'province', wr.province))
        ELSE COALESCE('[]'::json)
    END AS work_zone
FROM truck truck
 LEFT JOIN truck_working_zone wr ON wr.truck_id = truck.id
 LEFT JOIN dblink('userserver'::text, 'SELECT id,email,fullname,phone_number,avatar FROM user_profile'::text) usr(id integer, email text, fullname text, phone_number text, avatar text) ON usr.id = truck.carrier_id
GROUP BY truck.id, usr.id, usr.email, usr.fullname, usr.phone_number, usr.avatar;`

  await connectNewDB.query(sqlCreateViewMyTruck);
  await connectNewDB.query(sqlCreateViewMyTruckId);
  await connectNewDB.query(sqlCreateViewTruckDetails);
  await connectNewDB.query(sqlCreateViewTruckFavorite);
  await connectNewDB.query(sqlCreateViewTruckList);
  console.log("Finish Create View  !!")
  return true
}

const updateCarrierIdGroupNewUser = async () => {
  const clientUserService = new Pool({
    host: newHost,
    user: newUser,
    password: newPassword,
    database: newDBUser,
    port: newPort,
  });

  const clientTruckService = new Pool(newConnection)

  const sqlSelectBackupUserId = `SELECT current_user_id, user_ids FROM backup_user_id;`;

  const connectUserService = await clientUserService.connect();
  const newTruckConnection = await clientTruckService.connect();

  const { rows: backupUserId } = await connectUserService.query(sqlSelectBackupUserId);

  for (const attr of backupUserId) {
    await newTruckConnection.query(`UPDATE truck
      SET carrier_id = ${attr.current_user_id}
      WHERE carrier_id = ANY(ARRAY[${attr.user_ids}])`);
  }

  console.log('Finished');
  return true;

}






const getNewTruckType = (oldTruckType) => {
  if (oldTruckType == 3) return 9;        // oldName: รถ 6 ล้อตู้คอก
  else if (oldTruckType == 7) return 2;    // oldName: รถกระบะ 4 ล้อพื้นเรียบ
  else if (oldTruckType == 8) return 21;    // oldName: รถ 10 ล้อ เครน
  else if (oldTruckType == 10) return 27;   // oldName: รถบรรทุกรถ
  else if (oldTruckType == 13) return 12;   // oldName: รถบรรทุกของเหลว 6 ล้อ
  else if (oldTruckType == 14) return 18;   // oldName: รถ 10 ล้อ เคมีภัณฑ์
  else if (oldTruckType == 15) return 29;   // oldName: อื่นๆ
  else if (oldTruckType == 17) return 4;   // oldName: รถกระบะ 4 ล้อตู้ทึบ
  else if (oldTruckType == 18) return 5;   // oldName: รถกระบะ 4 ล้อ ห้องเย็น
  else if (oldTruckType == 19) return 6;   // oldName: รถกระบะ 4 ล้อหลังคาสูงทึบ
  else if (oldTruckType == 21) return 10;   // oldName: รถ 6 ล้อ ตู้ทึบ
  else if (oldTruckType == 22) return 7;   // oldName: รถ 6 ล้อพื้นเรียบ
  else if (oldTruckType == 23) return 28;   // oldName: รถบรรทุกจักรยานยนต์
  else if (oldTruckType == 24) return 8;   // oldName: รถ 6 ล้อ กระบะ
  else if (oldTruckType == 25) return 11;   // oldName: รถ 6 ล้อ ห้องเย็น
  else if (oldTruckType == 26) return 15;   // oldName: รถ 10 ล้อคอก
  else if (oldTruckType == 27) return 16;   // oldName: รถ 10 ล้อ ตู้ทึบ
  else if (oldTruckType == 28) return 14;   // oldName: รถ 10 ล้อ พื้นเรียบ
  else if (oldTruckType == 29) return 19;   // oldName: รถ 10 ล้อบรรทุกของเหลว
  else if (oldTruckType == 30) return 17;   // oldName: รถ10 ล้อ ห้องเย็น
  else if (oldTruckType == 31) return 22;   // oldName: รถเทรลเลอร์ พื้นเรียบ
  else if (oldTruckType == 33) return 25;   // oldName: รถ 10 ล้อ พ่วงตู้ทึบ
  else if (oldTruckType == 34) return 26;   // oldName: รถ 10 ล้อ พ่วง ห้องเย็น
  else if (oldTruckType == 36) return 24;   // oldName: รถ 10 ล้อ พ่วงคอก
  else if (oldTruckType == 37) return 31;   // oldName: รถหัวลาก ตู้ทึบ
  else if (oldTruckType == 38) return 32;   // oldName: รถหัวลาก ห้องเย็น
  else if (oldTruckType == 39) return 13;   // oldName: รถ 6 ล้อ เครน
  else if (oldTruckType == 40) return 1;   // oldName: รถกระบะ 4 ล้อ
  else if (oldTruckType == 41) return 20;   // oldName: รถ 10 ล้อ บรรทุกน้ำมัน
  else if (oldTruckType == 42) return 23;   // oldName: รถเทรลเลอร์คอก
  else if (oldTruckType == 48) return 30;   // oldName: รถหัวลาก
  else if (oldTruckType == 49) return 3;   // oldName: รถกระบะ 4 ล้อ คอก
  else return 1
}
const mapNewTruckType = async () => {
  const clientTruckService = new Pool(newConnection)
  const newTruckConnection = await clientTruckService.connect();
  const { rows: RowTruck } = await newTruckConnection.query(`SELECT * FROM truck;`);

  for (const attr of RowTruck) {
    const newTruckType = getNewTruckType(attr.truck_type)
    await newTruckConnection.query(`UPDATE truck
      SET truck_type = ${newTruckType}
      WHERE id = ${attr.id} and truck_type = ${attr.truck_type}`);
  }

  console.log('Finished');
  return true;
}


const updateSequenceAllTable = async () => {
  const clientTruckService = new Pool(newConnection)
  const newTruckConnection = await clientTruckService.connect();

  const sqlUpdateSeqTruck = `SELECT setval('truck_seq', (select count(*) from truck), true);`
  const sqlUpdateSeqTruckPhoto = `SELECT setval('truck_photo_seq', (select count(*) from truck_photo), true);`
  const sqlUpdateSeqTruckWorkingZone = `SELECT setval('truck_working_zone_seq', (select count(*) from truck_working_zone), true);`
  const sqlUpdateSeqFavorite = `SELECT setval('favorite_seq', (select count(*) from favorite), true);`
  // 
  await newTruckConnection.query(sqlUpdateSeqTruck);
  await newTruckConnection.query(sqlUpdateSeqTruckPhoto);
  await newTruckConnection.query(sqlUpdateSeqTruckWorkingZone);
  await newTruckConnection.query(sqlUpdateSeqFavorite);
  console.log('Update seq all table finish !!')
  return true;
}



const processRegistration = (registration) => {
  const newRegistration = registration.replace(/[@/]+/g, ",")
  return newRegistration
}
const parseRegistrationNumber = async () => {
  const clientTruckService = new Pool(newConnection)
  const newTruckConnection = await clientTruckService.connect();

  const { rows: RowTruck } = await newTruckConnection.query(`SELECT * FROM truck;`);

  for (const attr of RowTruck) {
    const newRegistration = processRegistration(attr.registration_number)
    await newTruckConnection.query(`UPDATE truck
      SET registration_number = '${newRegistration}'
      WHERE id = ${attr.id}`);
  }

  console.log('Finished update registration');
  return true;
}





const generateToken = (userId) => {
  const hashids = new Hashids(salt, 8, alphabet);
  const id = hashids.encode(userId);
  return jwt.sign(
    {
      sub: 'db98d3b0-5540-41b5-ad02-3f0eacb0e57c',
      roles: 'Admin|Driver',
      iss: 'https://cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_hIWBSYz7z',
      'cognito:username': 'db98d3b0-5540-41b5-ad02-3f0eacb0e57c',
      'custom:userId': id,
      origin_jti: '657b04a4-9ada-40ff-8fa7-1c5d51a59d34',
      aud: '4qkd14u6na0fo1tfhtrdari41i',
      event_id: 'bc81717a-0a24-4ba0-a39b-fa8ee2733907',
      token_use: 'id',
      jti: '9383cc14-f293-494d-9b94-3f096225d1e7',
      auth_time: Math.floor(new Date() / 1000),
      exp: Math.floor((new Date() + 100000) / 1000),
      iat: Math.floor(new Date() / 1000),
    },
    'JDbHwbVvTEgs9uRxEV6cCA3gdMmgSLJ8Da4lTfjAip8=',
    { algorithm: 'HS512' }
  );
}
const migrationImage = async () => {
  const clientNew = new Pool(newConnection);

  const connectNew = await clientNew.connect();

  // type : array
  const { rows: Truck } = await connectNew.query(`SELECT * FROM truck`);
  const { rows: TruckPhoto } = await connectNew.query(`SELECT * FROM truck_photo`);

  // type :  array
  const mappingTruckPhoto = await Promise.all(TruckPhoto.map(async (trp) => {
    const findTruckCarrier = Truck.find(e => e.id == trp.id)
    const carrier_id = findTruckCarrier.carrier_id || null
    if (carrier_id) {
      const authorization = generateToken(carrier_id)
      if (trp.photo_name.includes('staging.') || trp.photo_name.includes('trucking.')) {
        console.log("Url ::  ", trp.photo_name)
        const getImage = await axios.get(trp.photo_name, { headers: { Authorization: authorization || '' } })
        console.log("Image :: ", getImage.data)
      }
    }
  }))

  return true
}



const cleanDuplicateTruckByRegistration = async () => {
  const clientTruckService = new Pool(productionConnection)
  const newTruckConnection = await clientTruckService.connect();

  const { rows: RowTruck } = await newTruckConnection.query(`SELECT * FROM truck;`);
  const { rows: RowTruckClone } = await newTruckConnection.query(`SELECT * FROM truck_clone;`);

  const uniqTruckClone = _.uniqBy(RowTruckClone, 'registration_number')
  // console.log("Arr Uniq Truck Clonde :: ", uniqTruckClone)

  const uniqTruckCloneDiffTruck = _.differenceBy(RowTruck, uniqTruckClone, 'id');

  for (const attr of RowTruckClone) {
    let findId = uniqTruckCloneDiffTruck.find(e => e.id == attr.id)
    if (findId) {
      console.log("Find ID :: ", findId.registration_number)
      await newTruckConnection.query(`DELETE FROM truck WHERE id = ${findId.id};`);
    }
  }

  console.log("Finish cleanDuplicateTruckByRegistration !")
  return true;
}


const clearDuplicateRegistrationAdvance = async () => {
  const clientTruckService = new Pool(productionConnection)
  const newTruckConnection = await clientTruckService.connect();

  const { rows: RowTruck } = await newTruckConnection.query(`SELECT * FROM truck;`);
  const { rows: RowTruckClone } = await newTruckConnection.query(`SELECT * FROM truck_clone;`);



  let clone = RowTruckClone.map(attr => {
    const splitterRegistration = attr.registration_number.split(",")
    const parseRegistration = splitterRegistration.map(e => e.toString().replace(/\D/g, ""))
    return { ...attr, registration_number: parseRegistration }
  })
  let real = RowTruck.map((element, elindex) => {
    const splitterRegistration = element.registration_number.split(",")
    const parseRegistration = splitterRegistration.map(e => e.toString().replace(/\D/g, ""))
    return { ...element, registration_number: parseRegistration }
  })


  const uniqTruckClone = _.uniqBy(clone, 'registration_number[0]')
  // console.log("Uniq Truck clone : ", uniqTruckClone)
  const uniqTruckCloneDiffTruck = _.differenceBy(real, uniqTruckClone, 'id');
  console.log("Diff clone vs real : ", uniqTruckCloneDiffTruck.length)

  // let findId = uniqTruckCloneDiffTruck.find(e => e.id == attr.id)
  // if (findId) {
  //   console.log("Find ID :: ", findId)
  //   // await newTruckConnection.query(`DELETE FROM truck WHERE id = ${findId.id};`);
  // }

  console.log("Finish cleanDuplicateTruckByRegistration !")
  return true;
}
















const updateWorkingZone = async () => {
  const provinceListOld = [
    { "label": "กรุงเทพมหานคร", "value": 1, region: 1 },
    { "label": "สมุทรปราการ", "value": 57, region: 4 },
    { "label": "นนทบุรี", "value": 36, region: 1 },
    { "label": "ปทุมธานี", "value": 37, region: 1 },
    { "label": "พระนครศรีอยุธยา", "value": 46, region: 1 },
    { "label": "อ่างทอง", "value": 3, region: 1 },
    { "label": "ลพบุรี", "value": 22, region: 1 },
    { "label": "สิงห์บุรี", "value": 62, region: 1 },
    { "label": "ชัยนาท", "value": 7, region: 1 },
    { "label": "สระบุรี", "value": 60, region: 1 },
    { "label": "นครนายก", "value": 26, region: 1 },
    { "label": "ชลบุรี", "value": 12, region: 4 },
    { "label": "ระยอง", "value": 53, region: 4 },
    { "label": "จันทบุรี", "value": 9, region: 4 },
    { "label": "ตราด", "value": 71, region: 4 },
    { "label": "ฉะเชิงเทรา", "value": 6, region: 4 },
    { "label": "ปราจีนบุรี", "value": 49, region: 4 },
    { "label": "สระแก้ว", "value": 55, region: 4 },
    { "label": "นครราชสีมา", "value": 29, region: 6 },
    { "label": "บุรีรัมย์", "value": 5, region: 6 },
    { "label": "สุรินทร์", "value": 68, region: 6 },
    { "label": "ศรีสะเกษ", "value": 63, region: 6 },
    { "label": "อุบลราชธานี", "value": 72, region: 6 },
    { "label": "ยโสธร", "value": 77, region: 6 },
    { "label": "ชัยภูมิ", "value": 8, region: 6 },
    { "label": "อำนาจเจริญ", "value": 2, region: 6 },
    { "label": "บึงกาฬ", "value": 4, region: 6 },
    { "label": "หนองบัวลำภู", "value": 34, region: 6 },
    { "label": "ขอนแก่น", "value": 17, region: 6 },
    { "label": "อุดรธานี", "value": 73, region: 6 },
    { "label": "เลย", "value": 21, region: 6 },
    { "label": "หนองคาย", "value": 35, region: 6 },
    { "label": "มหาสารคาม", "value": 24, region: 6 },
    { "label": "ร้อยเอ็ด", "value": 54, region: 6 },
    { "label": "กาฬสินธุ์", "value": 14, region: 6 },
    { "label": "สกลนคร", "value": 56, region: 6 },
    { "label": "นครพนม", "value": 28, region: 6 },
    { "label": "มุกดาหาร", "value": 25, region: 6 },
    { "label": "เชียงใหม่", "value": 10, region: 2 },
    { "label": "ลำพูน", "value": 20, region: 2 },
    { "label": "ลำปาง", "value": 19, region: 2 },
    { "label": "อุตรดิตถ์", "value": 75, region: 2 },
    { "label": "แพร่", "value": 47, region: 2 },
    { "label": "น่าน", "value": 32, region: 2 },
    { "label": "พะเยา", "value": 41, region: 2 },
    { "label": "เชียงราย", "value": 11, region: 2 },
    { "label": "แม่ฮ่องสอน", "value": 23, region: 2 },
    { "label": "นครสวรรค์", "value": 30, region: 1 },
    { "label": "อุทัยธานี", "value": 74, region: 1 },
    { "label": "กำแพงเพชร", "value": 15, region: 1 },
    { "label": "ตาก", "value": 69, region: 5 },
    { "label": "สุโขทัย", "value": 65, region: 1 },
    { "label": "พิษณุโลก", "value": 45, region: 1 },
    { "label": "พิจิตร", "value": 44, region: 1 },
    { "label": "เพชรบูรณ์", "value": 42, region: 1 },
    { "label": "ราชบุรี", "value": 52, region: 5 },
    { "label": "กาญจนบุรี", "value": 16, region: 5 },
    { "label": "สุพรรณบุรี", "value": 66, region: 1 },
    { "label": "นครปฐม", "value": 27, region: 1 },
    { "label": "สมุทรสาคร", "value": 58, region: 1 },
    { "label": "สมุทรสงคราม", "value": 59, region: 1 },
    { "label": "เพชรบุรี", "value": 43, region: 5 },
    { "label": "ประจวบคีรีขันธ์", "value": 50, region: 5 },
    { "label": "นครศรีธรรมราช", "value": 31, region: 3 },
    { "label": "กระบี่", "value": 18, region: 3 },
    { "label": "พังงา", "value": 39, region: 3 },
    { "label": "ภูเก็ต", "value": 48, region: 3 },
    { "label": "สุราษฎร์ธานี", "value": 67, region: 3 },
    { "label": "ระนอง", "value": 51, region: 3 },
    { "label": "ชุมพร", "value": 13, region: 3 },
    { "label": "สงขลา", "value": 64, region: 3 },
    { "label": "สตูล", "value": 61, region: 3 },
    { "label": "ตรัง", "value": 70, region: 3 },
    { "label": "พัทลุง", "value": 40, region: 3 },
    { "label": "ปัตตานี", "value": 38, region: 3 },
    { "label": "ยะลา", "value": 76, region: 3 },
    { "label": "นราธิวาส", "value": 33, region: 3 },
  ]
  const provinceListNew = [
    {
      "id": 1,
      "code": 10,
      "name_in_thai": "กรุงเทพมหานคร",
      "name_in_english": "Bangkok",
      "zone_id": 1
    },
    {
      "id": 2,
      "code": 11,
      "name_in_thai": "สมุทรปราการ",
      "name_in_english": "Samut Prakarn",
      "zone_id": 1
    },
    {
      "id": 3,
      "code": 12,
      "name_in_thai": "นนทบุรี",
      "name_in_english": "Nonthaburi",
      "zone_id": 1
    },
    {
      "id": 4,
      "code": 13,
      "name_in_thai": "ปทุมธานี",
      "name_in_english": "Pathum Thani",
      "zone_id": 1
    },
    {
      "id": 5,
      "code": 14,
      "name_in_thai": "พระนครศรีอยุธยา",
      "name_in_english": "Phra Nakhon Si Ayutthaya",
      "zone_id": 1
    },
    {
      "id": 6,
      "code": 15,
      "name_in_thai": "อ่างทอง",
      "name_in_english": "Ang Thong",
      "zone_id": 1
    },
    {
      "id": 7,
      "code": 16,
      "name_in_thai": "ลพบุรี",
      "name_in_english": "Lop Buri",
      "zone_id": 1
    },
    {
      "id": 8,
      "code": 17,
      "name_in_thai": "สิงห์บุรี",
      "name_in_english": "Sing Buri",
      "zone_id": 1
    },
    {
      "id": 9,
      "code": 18,
      "name_in_thai": "ชัยนาท",
      "name_in_english": "Chai Nat",
      "zone_id": 1
    },
    {
      "id": 10,
      "code": 19,
      "name_in_thai": "สระบุรี",
      "name_in_english": "Saraburi",
      "zone_id": 1
    },
    {
      "id": 11,
      "code": 20,
      "name_in_thai": "ชลบุรี",
      "name_in_english": "Chon Buri",
      "zone_id": 4
    },
    {
      "id": 12,
      "code": 21,
      "name_in_thai": "ระยอง",
      "name_in_english": "Rayong",
      "zone_id": 4
    },
    {
      "id": 13,
      "code": 22,
      "name_in_thai": "จันทบุรี",
      "name_in_english": "Chanthaburi",
      "zone_id": 4
    },
    {
      "id": 14,
      "code": 23,
      "name_in_thai": "ตราด",
      "name_in_english": "Trat",
      "zone_id": 4
    },
    {
      "id": 15,
      "code": 24,
      "name_in_thai": "ฉะเชิงเทรา",
      "name_in_english": "Chachoengsao",
      "zone_id": 4
    },
    {
      "id": 16,
      "code": 25,
      "name_in_thai": "ปราจีนบุรี",
      "name_in_english": "Prachin Buri",
      "zone_id": 4
    },
    {
      "id": 17,
      "code": 26,
      "name_in_thai": "นครนายก",
      "name_in_english": "Nakhon Nayok",
      "zone_id": 1
    },
    {
      "id": 18,
      "code": 27,
      "name_in_thai": "สระแก้ว",
      "name_in_english": "Sa kaeo",
      "zone_id": 4
    },
    {
      "id": 19,
      "code": 30,
      "name_in_thai": "นครราชสีมา",
      "name_in_english": "Nakhon Ratchasima",
      "zone_id": 3
    },
    {
      "id": 20,
      "code": 31,
      "name_in_thai": "บุรีรัมย์",
      "name_in_english": "Buri Ram",
      "zone_id": 6
    },
    {
      "id": 21,
      "code": 32,
      "name_in_thai": "สุรินทร์",
      "name_in_english": "Surin",
      "zone_id": 6
    },
    {
      "id": 22,
      "code": 33,
      "name_in_thai": "ศรีสะเกษ",
      "name_in_english": "Si Sa Ket",
      "zone_id": 6
    },
    {
      "id": 23,
      "code": 34,
      "name_in_thai": "อุบลราชธานี",
      "name_in_english": "Ubon Ratchathani",
      "zone_id": 1
    },
    {
      "id": 24,
      "code": 35,
      "name_in_thai": "ยโสธร",
      "name_in_english": "Yasothon",
      "zone_id": 6
    },
    {
      "id": 25,
      "code": 36,
      "name_in_thai": "ชัยภูมิ",
      "name_in_english": "Chaiyaphum",
      "zone_id": 6
    },
    {
      "id": 26,
      "code": 37,
      "name_in_thai": "อำนาจเจริญ",
      "name_in_english": "Amnat Charoen",
      "zone_id": 6
    },
    {
      "id": 27,
      "code": 38,
      "name_in_thai": "บึงกาฬ",
      "name_in_english": "Bueng Kan",
      "zone_id": 6
    },
    {
      "id": 28,
      "code": 39,
      "name_in_thai": "หนองบัวลำภู",
      "name_in_english": "Nong Bua Lam Phu",
      "zone_id": 6
    },
    {
      "id": 29,
      "code": 40,
      "name_in_thai": "ขอนแก่น",
      "name_in_english": "Khon Kaen",
      "zone_id": 6
    },
    {
      "id": 30,
      "code": 41,
      "name_in_thai": "อุดรธานี",
      "name_in_english": "Udon Thani",
      "zone_id": 6
    },
    {
      "id": 31,
      "code": 42,
      "name_in_thai": "เลย",
      "name_in_english": "Loei",
      "zone_id": 6
    },
    {
      "id": 32,
      "code": 43,
      "name_in_thai": "หนองคาย",
      "name_in_english": "Nong Khai",
      "zone_id": 6
    },
    {
      "id": 33,
      "code": 44,
      "name_in_thai": "มหาสารคาม",
      "name_in_english": "Maha Sarakham",
      "zone_id": 6
    },
    {
      "id": 34,
      "code": 45,
      "name_in_thai": "ร้อยเอ็ด",
      "name_in_english": "Roi Et",
      "zone_id": 6
    },
    {
      "id": 35,
      "code": 46,
      "name_in_thai": "กาฬสินธุ์",
      "name_in_english": "Kalasin",
      "zone_id": 6
    },
    {
      "id": 36,
      "code": 47,
      "name_in_thai": "สกลนคร",
      "name_in_english": "Sakon Nakhon",
      "zone_id": 6
    },
    {
      "id": 37,
      "code": 48,
      "name_in_thai": "นครพนม",
      "name_in_english": "Nakhon Phanom",
      "zone_id": 6
    },
    {
      "id": 38,
      "code": 49,
      "name_in_thai": "มุกดาหาร",
      "name_in_english": "Mukdahan",
      "zone_id": 6
    },
    {
      "id": 39,
      "code": 50,
      "name_in_thai": "เชียงใหม่",
      "name_in_english": "Chiang Mai",
      "zone_id": 2
    },
    {
      "id": 40,
      "code": 51,
      "name_in_thai": "ลำพูน",
      "name_in_english": "Lamphun",
      "zone_id": 2
    },
    {
      "id": 41,
      "code": 52,
      "name_in_thai": "ลำปาง",
      "name_in_english": "Lampang",
      "zone_id": 2
    },
    {
      "id": 42,
      "code": 53,
      "name_in_thai": "อุตรดิตถ์",
      "name_in_english": "Uttaradit",
      "zone_id": 2
    },
    {
      "id": 43,
      "code": 54,
      "name_in_thai": "แพร่",
      "name_in_english": "Phrae",
      "zone_id": 2
    },
    {
      "id": 44,
      "code": 55,
      "name_in_thai": "น่าน",
      "name_in_english": "Nan",
      "zone_id": 2
    },
    {
      "id": 45,
      "code": 56,
      "name_in_thai": "พะเยา",
      "name_in_english": "Phayao",
      "zone_id": 2
    },
    {
      "id": 46,
      "code": 57,
      "name_in_thai": "เชียงราย",
      "name_in_english": "Chiang Rai",
      "zone_id": 2
    },
    {
      "id": 47,
      "code": 58,
      "name_in_thai": "แม่ฮ่องสอน",
      "name_in_english": "Mae Hong Son",
      "zone_id": 2
    },
    {
      "id": 48,
      "code": 60,
      "name_in_thai": "นครสวรรค์",
      "name_in_english": "Nakhon Sawan",
      "zone_id": 2
    },
    {
      "id": 49,
      "code": 61,
      "name_in_thai": "อุทัยธานี",
      "name_in_english": "Uthai Thani",
      "zone_id": 2
    },
    {
      "id": 50,
      "code": 62,
      "name_in_thai": "กำแพงเพชร",
      "name_in_english": "Kamphaeng Phet",
      "zone_id": 2
    },
    {
      "id": 51,
      "code": 63,
      "name_in_thai": "ตาก",
      "name_in_english": "Tak",
      "zone_id": 2
    },
    {
      "id": 52,
      "code": 64,
      "name_in_thai": "สุโขทัย",
      "name_in_english": "Sukhothai",
      "zone_id": 2
    },
    {
      "id": 53,
      "code": 65,
      "name_in_thai": "พิษณุโลก",
      "name_in_english": "Phitsanulok",
      "zone_id": 2
    },
    {
      "id": 54,
      "code": 66,
      "name_in_thai": "พิจิตร",
      "name_in_english": "Phichit",
      "zone_id": 2
    },
    {
      "id": 55,
      "code": 67,
      "name_in_thai": "เพชรบูรณ์",
      "name_in_english": "Phetchabun",
      "zone_id": 2
    },
    {
      "id": 56,
      "code": 70,
      "name_in_thai": "ราชบุรี",
      "name_in_english": "Ratchaburi",
      "zone_id": 1
    },
    {
      "id": 57,
      "code": 71,
      "name_in_thai": "กาญจนบุรี",
      "name_in_english": "Kanchanaburi",
      "zone_id": 1
    },
    {
      "id": 58,
      "code": 72,
      "name_in_thai": "สุพรรณบุรี",
      "name_in_english": "Suphan Buri",
      "zone_id": 1
    },
    {
      "id": 59,
      "code": 73,
      "name_in_thai": "นครปฐม",
      "name_in_english": "Nakhon Pathom",
      "zone_id": 1
    },
    {
      "id": 60,
      "code": 74,
      "name_in_thai": "สมุทรสาคร",
      "name_in_english": "Samut Sakhon",
      "zone_id": 1
    },
    {
      "id": 61,
      "code": 75,
      "name_in_thai": "สมุทรสงคราม",
      "name_in_english": "Samut Songkhram",
      "zone_id": 1
    },
    {
      "id": 62,
      "code": 76,
      "name_in_thai": "เพชรบุรี",
      "name_in_english": "Phetchaburi",
      "zone_id": 1
    },
    {
      "id": 63,
      "code": 77,
      "name_in_thai": "ประจวบคีรีขันธ์",
      "name_in_english": "Prachuap Khiri Khan",
      "zone_id": 1
    },
    {
      "id": 64,
      "code": 80,
      "name_in_thai": "นครศรีธรรมราช",
      "name_in_english": "Nakhon Si Thammarat",
      "zone_id": 6
    },
    {
      "id": 65,
      "code": 81,
      "name_in_thai": "กระบี่",
      "name_in_english": "Krabi",
      "zone_id": 3
    },
    {
      "id": 66,
      "code": 82,
      "name_in_thai": "พังงา",
      "name_in_english": "Phang-nga",
      "zone_id": 3
    },
    {
      "id": 67,
      "code": 83,
      "name_in_thai": "ภูเก็ต",
      "name_in_english": "Phuket",
      "zone_id": 3
    },
    {
      "id": 68,
      "code": 84,
      "name_in_thai": "สุราษฎร์ธานี",
      "name_in_english": "Surat Thani",
      "zone_id": 3
    },
    {
      "id": 69,
      "code": 85,
      "name_in_thai": "ระนอง",
      "name_in_english": "Ranong",
      "zone_id": 3
    },
    {
      "id": 70,
      "code": 86,
      "name_in_thai": "ชุมพร",
      "name_in_english": "Chumphon",
      "zone_id": 3
    },
    {
      "id": 71,
      "code": 90,
      "name_in_thai": "สงขลา",
      "name_in_english": "Songkhla",
      "zone_id": 3
    },
    {
      "id": 72,
      "code": 91,
      "name_in_thai": "สตูล",
      "name_in_english": "Satun",
      "zone_id": 3
    },
    {
      "id": 73,
      "code": 92,
      "name_in_thai": "ตรัง",
      "name_in_english": "Trang",
      "zone_id": 3
    },
    {
      "id": 74,
      "code": 93,
      "name_in_thai": "พัทลุง",
      "name_in_english": "Phatthalung",
      "zone_id": 3
    },
    {
      "id": 75,
      "code": 94,
      "name_in_thai": "ปัตตานี",
      "name_in_english": "Pattani",
      "zone_id": 3
    },
    {
      "id": 76,
      "code": 95,
      "name_in_thai": "ยะลา",
      "name_in_english": "Yala",
      "zone_id": 3
    },
    {
      "id": 77,
      "code": 96,
      "name_in_thai": "นราธิวาส",
      "name_in_english": "Narathiwat",
      "zone_id": 3
    }
  ]

  let mixArr = provinceListOld.map(e => {
    let slot = provinceListNew.find(item => e.label == item.name_in_thai)
    return {
      oldProvince: e.value,
      oldRegion: e.region,
      newProvince: slot.id,
      newRegion: slot.zone_id,
    }
  })

  // console.log("Mix array : ", mixArr)

  const devConnection = {
    host: "cgl-dev-db.ccyrpfjhgi1v.ap-southeast-1.rds.amazonaws.com",
    user: "postgres",
    password: ".9^Piv-.KlzZhZm.MU7vXZU7yE9I-4",
    database: 'truck_service',
    port: 5432,
  }
  const stgConnection = {
    host: "7uZrE546PzCjEV^e^tKpvs43PJTnHN",
    user: "postgres",
    password: "cgl-db.cj4ycxviwust.ap-southeast-1.rds.amazonaws.com",
    database: 'truck_service',
    port: 5432,
  }
  const prodConnection = {
    host: "cgl-db.cs7ingowcayi.ap-southeast-1.rds.amazonaws.com",
    user: "postgres",
    password: "FaOpNg13iRDxxHWR8iOmV=Mx-YHzGI",
    database: 'truck_service',
    port: 5432,
  }
  const clientTruckService = new Pool(prodConnection)
  const newTruckConnection = await clientTruckService.connect();

  const { rows: RowTruckWr } = await newTruckConnection.query(`SELECT * FROM truck_working_zone;`);

  for (const attr of RowTruckWr) {
    if (attr.region != 7) {

      const valObject = mixArr.find(e => e.oldRegion == attr.region && e.oldProvince == attr.province)
      console.log("Val object :: ", valObject)

      if (valObject) await newTruckConnection.query(`UPDATE truck_working_zone
      SET region = '${valObject.newRegion}' , province = '${valObject.newProvince}'
      WHERE id = '${attr.id}' and region = '${valObject.oldRegion}' and province = '${valObject.oldProvince}'`);
      else {
        if (attr.region >= 1 && attr.region < 78 && attr.province < 7) {
          const newZoneObject = provinceListNew.find(item => item.id == attr.region)
          if (newZoneObject)
            await newTruckConnection.query(`UPDATE truck_working_zone
          SET region = '${newZoneObject.zone_id}' , province = '${newZoneObject.id}'
          WHERE id = '${attr.id}' and region = '${attr.region}' and province = '${attr.province}'`);
          else { "Attr don't match 0 : ", attr }
        } else console.log("Attr don't match 1 : ", attr)
      }
    }
  }

  console.log('Finished update registration');
  return true;

}

// const checkingWorkingZone = async () => {
//   const oldProvinceTh = [
//     { "label": "กรุงเทพมหานคร", "value": 1, region: 1 },
//     { "label": "สมุทรปราการ", "value": 2, region: 1 },
//     { "label": "นนทบุรี", "value": 3, region: 1 },
//     { "label": "ปทุมธานี", "value": 4, region: 1 },
//     { "label": "พระนครศรีอยุธยา", "value": 5, region: 1 },
//     { "label": "อ่างทอง", "value": 6, region: 1 },
//     { "label": "ลพบุรี", "value": 7, region: 1 },
//     { "label": "สิงห์บุรี", "value": 8, region: 1 },
//     { "label": "ชัยนาท", "value": 9, region: 1 },
//     { "label": "สระบุรี", "value": 10, region: 1 },
//     { "label": "นครนายก", "value": 17, region: 1 },
//     { "label": "ชลบุรี", "value": 11, region: 4 },
//     { "label": "ระยอง", "value": 12, region: 4 },
//     { "label": "จันทบุรี", "value": 13, region: 4 },
//     { "label": "ตราด", "value": 14, region: 4 },
//     { "label": "ฉะเชิงเทรา", "value": 15, region: 4 },
//     { "label": "ปราจีนบุรี", "value": 16, region: 4 },
//     { "label": "สระแก้ว", "value": 18, region: 4 },
//     { "label": "นครราชสีมา", "value": 19, region: 3 },
//     { "label": "บุรีรัมย์", "value": 20, region: 6 },
//     { "label": "สุรินทร์", "value": 21, region: 6 },
//     { "label": "ศรีสะเกษ", "value": 22, region: 6 },
//     { "label": "อุบลราชธานี", "value": 23, region: 1 },
//     { "label": "ยโสธร", "value": 24, region: 6 },
//     { "label": "ชัยภูมิ", "value": 25, region: 6 },
//     { "label": "อำนาจเจริญ", "value": 26, region: 6 },
//     { "label": "บึงกาฬ", "value": 27, region: 6 },
//     { "label": "หนองบัวลำภู", "value": 28, region: 6 },
//     { "label": "ขอนแก่น", "value": 29, region: 6 },
//     { "label": "อุดรธานี", "value": 30, region: 6 },
//     { "label": "เลย", "value": 31, region: 6 },
//     { "label": "หนองคาย", "value": 32, region: 6 },
//     { "label": "มหาสารคาม", "value": 33, region: 6 },
//     { "label": "ร้อยเอ็ด", "value": 34, region: 6 },
//     { "label": "กาฬสินธุ์", "value": 35, region: 6 },
//     { "label": "สกลนคร", "value": 36, region: 6 },
//     { "label": "นครพนม", "value": 37, region: 6 },
//     { "label": "มุกดาหาร", "value": 38, region: 6 },
//     { "label": "เชียงใหม่", "value": 39, region: 2 },
//     { "label": "ลำพูน", "value": 40, region: 2 },
//     { "label": "ลำปาง", "value": 41, region: 2 },
//     { "label": "อุตรดิตถ์", "value": 42, region: 2 },
//     { "label": "แพร่", "value": 43, region: 2 },
//     { "label": "น่าน", "value": 44, region: 2 },
//     { "label": "พะเยา", "value": 45, region: 2 },
//     { "label": "เชียงราย", "value": 46, region: 2 },
//     { "label": "แม่ฮ่องสอน", "value": 47, region: 2 },
//     { "label": "นครสวรรค์", "value": 48, region: 2 },
//     { "label": "อุทัยธานี", "value": 49, region: 2 },
//     { "label": "กำแพงเพชร", "value": 50, region: 2 },
//     { "label": "ตาก", "value": 51, region: 2 },
//     { "label": "สุโขทัย", "value": 52, region: 2 },
//     { "label": "พิษณุโลก", "value": 53, region: 2 },
//     { "label": "พิจิตร", "value": 54, region: 2 },
//     { "label": "เพชรบูรณ์", "value": 55, region: 2 },
//     { "label": "ราชบุรี", "value": 56, region: 1 },
//     { "label": "กาญจนบุรี", "value": 57, region: 1 },
//     { "label": "สุพรรณบุรี", "value": 58, region: 1 },
//     { "label": "นครปฐม", "value": 59, region: 1 },
//     { "label": "สมุทรสาคร", "value": 60, region: 1 },
//     { "label": "สมุทรสงคราม", "value": 61, region: 1 },
//     { "label": "เพชรบุรี", "value": 62, region: 1 },
//     { "label": "ประจวบคีรีขันธ์", "value": 63, region: 1 },
//     { "label": "นครศรีธรรมราช", "value": 64, region: 6 },
//     { "label": "กระบี่", "value": 65, region: 3 },
//     { "label": "พังงา", "value": 66, region: 3 },
//     { "label": "ภูเก็ต", "value": 67, region: 3 },
//     { "label": "สุราษฎร์ธานี", "value": 68, region: 3 },
//     { "label": "ระนอง", "value": 69, region: 3 },
//     { "label": "ชุมพร", "value": 70, region: 3 },
//     { "label": "สงขลา", "value": 71, region: 3 },
//     { "label": "สตูล", "value": 72, region: 3 },
//     { "label": "ตรัง", "value": 73, region: 3 },
//     { "label": "พัทลุง", "value": 74, region: 3 },
//     { "label": "ปัตตานี", "value": 75, region: 3 },
//     { "label": "ยะลา", "value": 76, region: 3 },
//     { "label": "นราธิวาส", "value": 77, region: 3 },
//   ]
//   const oldProvinceEn = [
//     { "label": "Bangkok", "value": 1, region: 1 },
//     { "label": "Samut Prakarn", "value": 2, region: 1 },
//     { "label": "Nonthaburi", "value": 3, region: 1 },
//     { "label": "Pathum Thani", "value": 4, region: 1 },
//     { "label": "Phra Nakhon Si Ayutthaya", "value": 5, region: 1 },
//     { "label": "Ang Thong", "value": 6, region: 1 },
//     { "label": "Lop Buri", "value": 7, region: 1 },
//     { "label": "Sing Buri", "value": 8, region: 1 },
//     { "label": "Chai Nat", "value": 9, region: 1 },
//     { "label": "Saraburi", "value": 10, region: 1 },
//     { "label": "Nakhon Nayok", "value": 17, region: 1 },
//     { "label": "Chon Buri", "value": 11, region: 4 },
//     { "label": "Rayong", "value": 12, region: 4 },
//     { "label": "Chanthaburi", "value": 13, region: 4 },
//     { "label": "Trat", "value": 14, region: 4 },
//     { "label": "Chachoengsao", "value": 15, region: 4 },
//     { "label": "Prachin Buri", "value": 16, region: 4 },
//     { "label": "Sa kaeo", "value": 18, region: 4 },
//     { "label": "Nakhon Ratchasima", "value": 19, region: 3 },
//     { "label": "Buri Ram", "value": 20, region: 6 },
//     { "label": "Surin", "value": 21, region: 6 },
//     { "label": "Si Sa Ket", "value": 22, region: 6 },
//     { "label": "Ubon Ratchathani", "value": 23, region: 1 },
//     { "label": "Yasothon", "value": 24, region: 6 },
//     { "label": "Chaiyaphum", "value": 25, region: 6 },
//     { "label": "Amnat Charoen", "value": 26, region: 6 },
//     { "label": "Bueng Kan", "value": 27, region: 6 },
//     { "label": "Nong Bua Lam Phu", "value": 28, region: 6 },
//     { "label": "Khon Kaen", "value": 29, region: 6 },
//     { "label": "Udon Thani", "value": 30, region: 6 },
//     { "label": "Loei", "value": 31, region: 6 },
//     { "label": "Nong Khai", "value": 32, region: 6 },
//     { "label": "Maha Sarakham", "value": 33, region: 6 },
//     { "label": "Roi Et", "value": 34, region: 6 },
//     { "label": "Kalasin", "value": 35, region: 6 },
//     { "label": "Sakon Nakhon", "value": 36, region: 6 },
//     { "label": "Nakhon Phanom", "value": 37, region: 6 },
//     { "label": "Mukdahan", "value": 38, region: 6 },
//     { "label": "Chiang Mai", "value": 39, region: 2 },
//     { "label": "Lamphun", "value": 40, region: 2 },
//     { "label": "Lampang", "value": 41, region: 2 },
//     { "label": "Uttaradit", "value": 42, region: 2 },
//     { "label": "Phrae", "value": 43, region: 2 },
//     { "label": "Nan", "value": 44, region: 2 },
//     { "label": "Phayao", "value": 45, region: 2 },
//     { "label": "Chiang Rai", "value": 46, region: 2 },
//     { "label": "Mae Hong Son", "value": 47, region: 2 },
//     { "label": "Nakhon Sawan", "value": 48, region: 2 },
//     { "label": "Uthai Thani", "value": 49, region: 2 },
//     { "label": "Kamphaeng Phet", "value": 50, region: 2 },
//     { "label": "Tak", "value": 51, region: 2 },
//     { "label": "Sukhothai", "value": 52, region: 2 },
//     { "label": "Phitsanulok", "value": 53, region: 2 },
//     { "label": "Phichit", "value": 54, region: 2 },
//     { "label": "Phetchabun", "value": 55, region: 2 },
//     { "label": "Ratchaburi", "value": 56, region: 1 },
//     { "label": "Kanchanaburi", "value": 57, region: 1 },
//     { "label": "Suphan Buri", "value": 58, region: 1 },
//     { "label": "Nakhon Pathom", "value": 59, region: 1 },
//     { "label": "Samut Sakhon", "value": 60, region: 1 },
//     { "label": "Samut Songkhram", "value": 61, region: 1 },
//     { "label": "Phetchaburi", "value": 62, region: 1 },
//     { "label": "Prachuap Khiri Khan", "value": 63, region: 1 },
//     { "label": "Nakhon Si Thammarat", "value": 64, region: 6 },
//     { "label": "Krabi", "value": 65, region: 3 },
//     { "label": "Phang-nga", "value": 66, region: 3 },
//     { "label": "Phuket", "value": 67, region: 3 },
//     { "label": "Surat Thani", "value": 68, region: 3 },
//     { "label": "Ranong", "value": 69, region: 3 },
//     { "label": "Chumphon", "value": 70, region: 3 },
//     { "label": "Songkhla", "value": 71, region: 3 },
//     { "label": "Satun", "value": 72, region: 3 },
//     { "label": "Trang", "value": 73, region: 3 },
//     { "label": "Phatthalung", "value": 74, region: 3 },
//     { "label": "Pattani", "value": 75, region: 3 },
//     { "label": "Yala", "value": 76, region: 3 },
//     { "label": "Narathiwat", "value": 77, region: 3 },
//   ]

//   const provinceListNew = [
//     {
//       "id": 1,
//       "code": 10,
//       "name_in_thai": "กรุงเทพมหานคร",
//       "name_in_english": "Bangkok",
//       "zone_id": 1
//     },
//     {
//       "id": 2,
//       "code": 11,
//       "name_in_thai": "สมุทรปราการ",
//       "name_in_english": "Samut Prakarn",
//       "zone_id": 1
//     },
//     {
//       "id": 3,
//       "code": 12,
//       "name_in_thai": "นนทบุรี",
//       "name_in_english": "Nonthaburi",
//       "zone_id": 1
//     },
//     {
//       "id": 4,
//       "code": 13,
//       "name_in_thai": "ปทุมธานี",
//       "name_in_english": "Pathum Thani",
//       "zone_id": 1
//     },
//     {
//       "id": 5,
//       "code": 14,
//       "name_in_thai": "พระนครศรีอยุธยา",
//       "name_in_english": "Phra Nakhon Si Ayutthaya",
//       "zone_id": 1
//     },
//     {
//       "id": 6,
//       "code": 15,
//       "name_in_thai": "อ่างทอง",
//       "name_in_english": "Ang Thong",
//       "zone_id": 1
//     },
//     {
//       "id": 7,
//       "code": 16,
//       "name_in_thai": "ลพบุรี",
//       "name_in_english": "Lop Buri",
//       "zone_id": 1
//     },
//     {
//       "id": 8,
//       "code": 17,
//       "name_in_thai": "สิงห์บุรี",
//       "name_in_english": "Sing Buri",
//       "zone_id": 1
//     },
//     {
//       "id": 9,
//       "code": 18,
//       "name_in_thai": "ชัยนาท",
//       "name_in_english": "Chai Nat",
//       "zone_id": 1
//     },
//     {
//       "id": 10,
//       "code": 19,
//       "name_in_thai": "สระบุรี",
//       "name_in_english": "Saraburi",
//       "zone_id": 1
//     },
//     {
//       "id": 11,
//       "code": 20,
//       "name_in_thai": "ชลบุรี",
//       "name_in_english": "Chon Buri",
//       "zone_id": 4
//     },
//     {
//       "id": 12,
//       "code": 21,
//       "name_in_thai": "ระยอง",
//       "name_in_english": "Rayong",
//       "zone_id": 4
//     },
//     {
//       "id": 13,
//       "code": 22,
//       "name_in_thai": "จันทบุรี",
//       "name_in_english": "Chanthaburi",
//       "zone_id": 4
//     },
//     {
//       "id": 14,
//       "code": 23,
//       "name_in_thai": "ตราด",
//       "name_in_english": "Trat",
//       "zone_id": 4
//     },
//     {
//       "id": 15,
//       "code": 24,
//       "name_in_thai": "ฉะเชิงเทรา",
//       "name_in_english": "Chachoengsao",
//       "zone_id": 4
//     },
//     {
//       "id": 16,
//       "code": 25,
//       "name_in_thai": "ปราจีนบุรี",
//       "name_in_english": "Prachin Buri",
//       "zone_id": 4
//     },
//     {
//       "id": 17,
//       "code": 26,
//       "name_in_thai": "นครนายก",
//       "name_in_english": "Nakhon Nayok",
//       "zone_id": 1
//     },
//     {
//       "id": 18,
//       "code": 27,
//       "name_in_thai": "สระแก้ว",
//       "name_in_english": "Sa kaeo",
//       "zone_id": 4
//     },
//     {
//       "id": 19,
//       "code": 30,
//       "name_in_thai": "นครราชสีมา",
//       "name_in_english": "Nakhon Ratchasima",
//       "zone_id": 3
//     },
//     {
//       "id": 20,
//       "code": 31,
//       "name_in_thai": "บุรีรัมย์",
//       "name_in_english": "Buri Ram",
//       "zone_id": 6
//     },
//     {
//       "id": 21,
//       "code": 32,
//       "name_in_thai": "สุรินทร์",
//       "name_in_english": "Surin",
//       "zone_id": 6
//     },
//     {
//       "id": 22,
//       "code": 33,
//       "name_in_thai": "ศรีสะเกษ",
//       "name_in_english": "Si Sa Ket",
//       "zone_id": 6
//     },
//     {
//       "id": 23,
//       "code": 34,
//       "name_in_thai": "อุบลราชธานี",
//       "name_in_english": "Ubon Ratchathani",
//       "zone_id": 1
//     },
//     {
//       "id": 24,
//       "code": 35,
//       "name_in_thai": "ยโสธร",
//       "name_in_english": "Yasothon",
//       "zone_id": 6
//     },
//     {
//       "id": 25,
//       "code": 36,
//       "name_in_thai": "ชัยภูมิ",
//       "name_in_english": "Chaiyaphum",
//       "zone_id": 6
//     },
//     {
//       "id": 26,
//       "code": 37,
//       "name_in_thai": "อำนาจเจริญ",
//       "name_in_english": "Amnat Charoen",
//       "zone_id": 6
//     },
//     {
//       "id": 27,
//       "code": 38,
//       "name_in_thai": "บึงกาฬ",
//       "name_in_english": "Bueng Kan",
//       "zone_id": 6
//     },
//     {
//       "id": 28,
//       "code": 39,
//       "name_in_thai": "หนองบัวลำภู",
//       "name_in_english": "Nong Bua Lam Phu",
//       "zone_id": 6
//     },
//     {
//       "id": 29,
//       "code": 40,
//       "name_in_thai": "ขอนแก่น",
//       "name_in_english": "Khon Kaen",
//       "zone_id": 6
//     },
//     {
//       "id": 30,
//       "code": 41,
//       "name_in_thai": "อุดรธานี",
//       "name_in_english": "Udon Thani",
//       "zone_id": 6
//     },
//     {
//       "id": 31,
//       "code": 42,
//       "name_in_thai": "เลย",
//       "name_in_english": "Loei",
//       "zone_id": 6
//     },
//     {
//       "id": 32,
//       "code": 43,
//       "name_in_thai": "หนองคาย",
//       "name_in_english": "Nong Khai",
//       "zone_id": 6
//     },
//     {
//       "id": 33,
//       "code": 44,
//       "name_in_thai": "มหาสารคาม",
//       "name_in_english": "Maha Sarakham",
//       "zone_id": 6
//     },
//     {
//       "id": 34,
//       "code": 45,
//       "name_in_thai": "ร้อยเอ็ด",
//       "name_in_english": "Roi Et",
//       "zone_id": 6
//     },
//     {
//       "id": 35,
//       "code": 46,
//       "name_in_thai": "กาฬสินธุ์",
//       "name_in_english": "Kalasin",
//       "zone_id": 6
//     },
//     {
//       "id": 36,
//       "code": 47,
//       "name_in_thai": "สกลนคร",
//       "name_in_english": "Sakon Nakhon",
//       "zone_id": 6
//     },
//     {
//       "id": 37,
//       "code": 48,
//       "name_in_thai": "นครพนม",
//       "name_in_english": "Nakhon Phanom",
//       "zone_id": 6
//     },
//     {
//       "id": 38,
//       "code": 49,
//       "name_in_thai": "มุกดาหาร",
//       "name_in_english": "Mukdahan",
//       "zone_id": 6
//     },
//     {
//       "id": 39,
//       "code": 50,
//       "name_in_thai": "เชียงใหม่",
//       "name_in_english": "Chiang Mai",
//       "zone_id": 2
//     },
//     {
//       "id": 40,
//       "code": 51,
//       "name_in_thai": "ลำพูน",
//       "name_in_english": "Lamphun",
//       "zone_id": 2
//     },
//     {
//       "id": 41,
//       "code": 52,
//       "name_in_thai": "ลำปาง",
//       "name_in_english": "Lampang",
//       "zone_id": 2
//     },
//     {
//       "id": 42,
//       "code": 53,
//       "name_in_thai": "อุตรดิตถ์",
//       "name_in_english": "Uttaradit",
//       "zone_id": 2
//     },
//     {
//       "id": 43,
//       "code": 54,
//       "name_in_thai": "แพร่",
//       "name_in_english": "Phrae",
//       "zone_id": 2
//     },
//     {
//       "id": 44,
//       "code": 55,
//       "name_in_thai": "น่าน",
//       "name_in_english": "Nan",
//       "zone_id": 2
//     },
//     {
//       "id": 45,
//       "code": 56,
//       "name_in_thai": "พะเยา",
//       "name_in_english": "Phayao",
//       "zone_id": 2
//     },
//     {
//       "id": 46,
//       "code": 57,
//       "name_in_thai": "เชียงราย",
//       "name_in_english": "Chiang Rai",
//       "zone_id": 2
//     },
//     {
//       "id": 47,
//       "code": 58,
//       "name_in_thai": "แม่ฮ่องสอน",
//       "name_in_english": "Mae Hong Son",
//       "zone_id": 2
//     },
//     {
//       "id": 48,
//       "code": 60,
//       "name_in_thai": "นครสวรรค์",
//       "name_in_english": "Nakhon Sawan",
//       "zone_id": 2
//     },
//     {
//       "id": 49,
//       "code": 61,
//       "name_in_thai": "อุทัยธานี",
//       "name_in_english": "Uthai Thani",
//       "zone_id": 2
//     },
//     {
//       "id": 50,
//       "code": 62,
//       "name_in_thai": "กำแพงเพชร",
//       "name_in_english": "Kamphaeng Phet",
//       "zone_id": 2
//     },
//     {
//       "id": 51,
//       "code": 63,
//       "name_in_thai": "ตาก",
//       "name_in_english": "Tak",
//       "zone_id": 2
//     },
//     {
//       "id": 52,
//       "code": 64,
//       "name_in_thai": "สุโขทัย",
//       "name_in_english": "Sukhothai",
//       "zone_id": 2
//     },
//     {
//       "id": 53,
//       "code": 65,
//       "name_in_thai": "พิษณุโลก",
//       "name_in_english": "Phitsanulok",
//       "zone_id": 2
//     },
//     {
//       "id": 54,
//       "code": 66,
//       "name_in_thai": "พิจิตร",
//       "name_in_english": "Phichit",
//       "zone_id": 2
//     },
//     {
//       "id": 55,
//       "code": 67,
//       "name_in_thai": "เพชรบูรณ์",
//       "name_in_english": "Phetchabun",
//       "zone_id": 2
//     },
//     {
//       "id": 56,
//       "code": 70,
//       "name_in_thai": "ราชบุรี",
//       "name_in_english": "Ratchaburi",
//       "zone_id": 1
//     },
//     {
//       "id": 57,
//       "code": 71,
//       "name_in_thai": "กาญจนบุรี",
//       "name_in_english": "Kanchanaburi",
//       "zone_id": 1
//     },
//     {
//       "id": 58,
//       "code": 72,
//       "name_in_thai": "สุพรรณบุรี",
//       "name_in_english": "Suphan Buri",
//       "zone_id": 1
//     },
//     {
//       "id": 59,
//       "code": 73,
//       "name_in_thai": "นครปฐม",
//       "name_in_english": "Nakhon Pathom",
//       "zone_id": 1
//     },
//     {
//       "id": 60,
//       "code": 74,
//       "name_in_thai": "สมุทรสาคร",
//       "name_in_english": "Samut Sakhon",
//       "zone_id": 1
//     },
//     {
//       "id": 61,
//       "code": 75,
//       "name_in_thai": "สมุทรสงคราม",
//       "name_in_english": "Samut Songkhram",
//       "zone_id": 1
//     },
//     {
//       "id": 62,
//       "code": 76,
//       "name_in_thai": "เพชรบุรี",
//       "name_in_english": "Phetchaburi",
//       "zone_id": 1
//     },
//     {
//       "id": 63,
//       "code": 77,
//       "name_in_thai": "ประจวบคีรีขันธ์",
//       "name_in_english": "Prachuap Khiri Khan",
//       "zone_id": 1
//     },
//     {
//       "id": 64,
//       "code": 80,
//       "name_in_thai": "นครศรีธรรมราช",
//       "name_in_english": "Nakhon Si Thammarat",
//       "zone_id": 6
//     },
//     {
//       "id": 65,
//       "code": 81,
//       "name_in_thai": "กระบี่",
//       "name_in_english": "Krabi",
//       "zone_id": 3
//     },
//     {
//       "id": 66,
//       "code": 82,
//       "name_in_thai": "พังงา",
//       "name_in_english": "Phang-nga",
//       "zone_id": 3
//     },
//     {
//       "id": 67,
//       "code": 83,
//       "name_in_thai": "ภูเก็ต",
//       "name_in_english": "Phuket",
//       "zone_id": 3
//     },
//     {
//       "id": 68,
//       "code": 84,
//       "name_in_thai": "สุราษฎร์ธานี",
//       "name_in_english": "Surat Thani",
//       "zone_id": 3
//     },
//     {
//       "id": 69,
//       "code": 85,
//       "name_in_thai": "ระนอง",
//       "name_in_english": "Ranong",
//       "zone_id": 3
//     },
//     {
//       "id": 70,
//       "code": 86,
//       "name_in_thai": "ชุมพร",
//       "name_in_english": "Chumphon",
//       "zone_id": 3
//     },
//     {
//       "id": 71,
//       "code": 90,
//       "name_in_thai": "สงขลา",
//       "name_in_english": "Songkhla",
//       "zone_id": 3
//     },
//     {
//       "id": 72,
//       "code": 91,
//       "name_in_thai": "สตูล",
//       "name_in_english": "Satun",
//       "zone_id": 3
//     },
//     {
//       "id": 73,
//       "code": 92,
//       "name_in_thai": "ตรัง",
//       "name_in_english": "Trang",
//       "zone_id": 3
//     },
//     {
//       "id": 74,
//       "code": 93,
//       "name_in_thai": "พัทลุง",
//       "name_in_english": "Phatthalung",
//       "zone_id": 3
//     },
//     {
//       "id": 75,
//       "code": 94,
//       "name_in_thai": "ปัตตานี",
//       "name_in_english": "Pattani",
//       "zone_id": 3
//     },
//     {
//       "id": 76,
//       "code": 95,
//       "name_in_thai": "ยะลา",
//       "name_in_english": "Yala",
//       "zone_id": 3
//     },
//     {
//       "id": 77,
//       "code": 96,
//       "name_in_thai": "นราธิวาส",
//       "name_in_english": "Narathiwat",
//       "zone_id": 3
//     }
//   ]

//   const devConnection = {
//     host: "cgl-dev-db.ccyrpfjhgi1v.ap-southeast-1.rds.amazonaws.com",
//     user: "postgres",
//     password: ".9^Piv-.KlzZhZm.MU7vXZU7yE9I-4",
//     database: 'truck_service',
//     port: 5432,
//   }
//   const stgConnection = {
//     host: "cgl-db.cj4ycxviwust.ap-southeast-1.rds.amazonaws.com",
//     user: "postgres",
//     password: "7uZrE546PzCjEV^e^tKpvs43PJTnHN",
//     database: 'truck_service',
//     port: 5432,
//   }
//   const prodConnection = {
//     host: "cgl-db.cs7ingowcayi.ap-southeast-1.rds.amazonaws.com",
//     user: "postgres",
//     password: "FaOpNg13iRDxxHWR8iOmV=Mx-YHzGI",
//     database: 'truck_service',
//     port: 5432,
//   }
//   const clientTruckService = new Pool(stgConnection)
//   const newTruckConnection = await clientTruckService.connect();

//   // const { rows: RowTruckWr } = await newTruckConnection.query(`SELECT * FROM truck_working_zone;`);
//   // for (const attr of RowTruckWr) {
//   //   if(attr.province <=0 || attr.province > 77 ) console.log("attr : ", attr)
//   // }


//   // provinceListNew.map(e => {
//   //   let findSlotEN = oldProvinceEn.filter(oldEn => oldEn.value == e.id)
//   //   let findSlotTH = oldProvinceTh.filter(oldEn => oldEn.value == e.id)
//   // })

//   // oldProvinceTh.map(e => {
//   //   let findMatchNew = provinceListNew.find(newPro => newPro.id == e.value)
//   //   if (findMatchNew.zone_id != e.region) console.log("[TH] This slot not match ! :: ", e)
//   // })

//   // oldProvinceEn.map(e => {
//   //   let findMatchNew = provinceListNew.find(newPro => newPro.id == e.value)
//   //   if (findMatchNew.zone_id != e.region) console.log("[EN] This slot not match ! :: ", e)
//   // })

//   console.log("Finish scan check !")
//   return true

// }


const main = async () => {
  try {
    // await createExtendsion()
    // await createTable()
    // await addDocumentColumnToTruck()

    // await createView()

    // await runTruck()
    // await runTruckWorkingZone()
    // await runTruckPhoto()
    // await runTruckFavorite()
    // await updateCarrierIdGroupNewUser()
    // await mapNewTruckType()
    // await updateSequenceAllTable()

    //  ** CLEAN, CLEAR ... SCRIPT **
    // await parseRegistrationNumber()
    // await cleanDuplicateTruckByRegistration()
    // await clearDuplicateRegistrationAdvance()
    // await updateWorkingZone()

    await checkingWorkingZone()
    return true
  } catch (error) {
    throw error
  }
}
main()
