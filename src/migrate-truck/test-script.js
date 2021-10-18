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

  const { rows: RowJob } = await newJobConnection.query(`SELECT * FROM job_clone_v3;`);

  // ** ADD COLUMN
  // const sqlAddColumn = `ALTER TABLE job_clone_v3
  // ADD COLUMN family jsonb;`
  // await newJobConnection.query(sqlAddColumn);

  // ** UPDATE NULL
  // for (const attr of RowJob) {
  //     await newJobConnection.query(`UPDATE job_clone_v3
  //   SET family = null
  //   WHERE id = ${attr.id}`);
  // }


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
