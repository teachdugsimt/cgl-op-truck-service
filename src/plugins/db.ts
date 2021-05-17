import 'reflect-metadata';
import fp from 'fastify-plugin';
import { createConnection, ConnectionOptions } from 'typeorm';
import config from '../config/ormconfig'
import { DtbTruck } from '../models';

export default fp(async server => {
  try {
    const configure: any = await config
    const connection = await createConnection(configure);
    console.log(':: database connected :: ');

    server.decorate('db', {
      truck: connection.getRepository(DtbTruck)
    });
  } catch (error) {
    console.log(error);
    console.log('make sure you have set .env variables - see .env.sample');
  }
});
