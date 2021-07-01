import 'reflect-metadata';
import fp from 'fastify-plugin';
import { createConnection } from 'typeorm';
// import config from '../config/ormconfig'
import { DtbTruck, TruckPhoto, DtbTruckWorkingZone, VwTruckList, VwTruckDetails, VwMyTruck } from '../models';

export default fp(async server => {
  try {
    console.time()
    console.log("Step 1 : connectionn database")
    // const connection = await createConnection(await config);
    const connection = await createConnection();
    console.log('database connected :: ');
    server.decorate('db', {
      truck: connection.getRepository(DtbTruck),
      truckWorkingZone: connection.getRepository(DtbTruckWorkingZone),
      truckPhoto: connection.getRepository(TruckPhoto),
      vwTruck: connection.getRepository(VwTruckList),
      vwTruckDetails: connection.getRepository(VwTruckDetails),
      vwMyTruck: connection.getRepository(VwMyTruck)
    });
    console.timeEnd()
  } catch (error) {
    console.log(error);
    console.log('make sure you have set .env variables - see .env.sample');
  }
});
