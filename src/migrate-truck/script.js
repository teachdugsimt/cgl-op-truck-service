const { Pool } = require('pg');
const sql = require('sql');

const TruckNewModel = sql.define({
  name: 'truck',
  columns: ["id", "name", "carrier_id", "registration_number", "loading_weight",
    "truck_type", "approve_status", "approve_date", "group_truck_type",
    "is_tipper", "stall_height", "is_deleted",
    "created_at", "updated_at", "created_user", "updated_user", "created_from"],
});

const runTruck = async () => {
  const client = new Pool({
    host: 'cgl-dev-db.ccyrpfjhgi1v.ap-southeast-1.rds.amazonaws.com',
    user: 'postgres',
    password: '.9^Piv-.KlzZhZm.MU7vXZU7yE9I-4',
    database: 'cargolink',
    port: 5432,
  });

  const clientNew = new Pool({
    host: 'cgl-dev-db.ccyrpfjhgi1v.ap-southeast-1.rds.amazonaws.com',
    user: 'postgres',
    password: '.9^Piv-.KlzZhZm.MU7vXZU7yE9I-4',
    database: 'truck_service',
    port: 5432,
  });

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
    "approve_status": tr["approve_status"],
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
  const client = new Pool({
    host: 'cgl-dev-db.ccyrpfjhgi1v.ap-southeast-1.rds.amazonaws.com',
    user: 'postgres',
    password: '.9^Piv-.KlzZhZm.MU7vXZU7yE9I-4',
    database: 'cargolink',
    port: 5432,
  });

  const clientNew = new Pool({
    host: 'cgl-dev-db.ccyrpfjhgi1v.ap-southeast-1.rds.amazonaws.com',
    user: 'postgres',
    password: '.9^Piv-.KlzZhZm.MU7vXZU7yE9I-4',
    database: 'truck_service',
    port: 5432,
  });

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
  const client = new Pool({
    host: 'cgl-dev-db.ccyrpfjhgi1v.ap-southeast-1.rds.amazonaws.com',
    user: 'postgres',
    password: '.9^Piv-.KlzZhZm.MU7vXZU7yE9I-4',
    database: 'cargolink',
    port: 5432,
  });

  const clientNew = new Pool({
    host: 'cgl-dev-db.ccyrpfjhgi1v.ap-southeast-1.rds.amazonaws.com',
    user: 'postgres',
    password: '.9^Piv-.KlzZhZm.MU7vXZU7yE9I-4',
    database: 'truck_service',
    port: 5432,
  });

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

runTruckPhoto()
