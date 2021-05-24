import 'reflect-metadata';
import fp from 'fastify-plugin';
import { createConnection } from 'typeorm';
import config from '../config/ormconfig'
import { DtbTruck } from '../models';

export default fp(async server => {
  try {
    console.log("Step 1 : connectionn database")
    // const connection = await createConnection(await config);
    const connection = await createConnection();
    console.log('database connected :: ', connection);
    console.log("Test get repo : ", connection.getRepository(DtbTruck))
    server.decorate('db', {
      truck: connection.getRepository(DtbTruck)
    });
  } catch (error) {
    console.log(error);
    console.log('make sure you have set .env variables - see .env.sample');
  }
});
