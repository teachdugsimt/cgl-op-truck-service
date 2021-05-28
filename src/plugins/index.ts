import 'reflect-metadata';
import fp from 'fastify-plugin';
import { createConnection } from 'typeorm';
// import config from '../config/ormconfig'
import { DtbTruck, DtbTruckPhoto, DtbUser, DtbWaybill } from '../models';

export default fp(async server => {
  try {
    console.log("Step 1 : connectionn database")
    // const connection = await createConnection(await config);
    const connection = await createConnection();
    console.log('database connected :: ');
    server.decorate('db', {
      truck: connection.getRepository(DtbTruck),
      truckPhoto: connection.getRepository(DtbTruckPhoto),
      user: connection.getRepository(DtbUser),
      wayBill: connection.getRepository(DtbWaybill)
    });
  } catch (error) {
    console.log(error);
    console.log('make sure you have set .env variables - see .env.sample');
  }
});
