import { Service, Initializer, Destructor } from 'fastify-decorators';
import TruckRepository from '../repositories/truck-repository'
import { FastifyInstance } from 'fastify';
import { Truck, ParseUpdateTruck } from '../controllers/propsTypes'
@Service()
export default class TruckService {
  @Initializer()
  async init(): Promise<void> {
  }

  async findTruckByID(server: FastifyInstance, id: string): Promise<any> {
    // console.log("Server :: ", server)

    const repo = new TruckRepository()
    const data = await repo.findOneById(server, id)
    return data
  }

  async createTruck(server: FastifyInstance, data: Truck): Promise<any> {
    // console.log("Server :: ", server)
    console.log("Query String Create truck : ", data)
    const repo = new TruckRepository()
    const result = await repo.createTruckV2(server, data)
    return result
  }

  async updateTruck(server: FastifyInstance, data: ParseUpdateTruck): Promise<any> {
    const repo = new TruckRepository()
    const result = await repo.updateTruck(server, data)
    return result
  }

  @Destructor()
  async destroy(): Promise<void> {
  }
}
