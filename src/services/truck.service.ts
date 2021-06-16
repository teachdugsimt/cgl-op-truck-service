import { Service, Initializer, Destructor } from 'fastify-decorators';
import TruckRepository from '../repositories/truck-repository'
import { FastifyInstance } from 'fastify';
const dJSON = require('dirty-json');
@Service()
export default class TruckService {
  @Initializer()
  async init(): Promise<void> {
  }

  async findTruckByID(server: FastifyInstance, id: number): Promise<any> {
    // console.log("Server :: ", server)

    const repo = new TruckRepository()
    const data = await repo.findOneById(server, id)
    return data
  }

  @Destructor()
  async destroy(): Promise<void> {
  }
}
