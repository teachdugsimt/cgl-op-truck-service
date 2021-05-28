import { Service, Initializer, Destructor } from 'fastify-decorators';
import TruckRepository from '../repositories/truck-repository'
import { FastifyInstance } from 'fastify';
const dJSON = require('dirty-json');
@Service()
export default class PingService {
  @Initializer()
  async init(): Promise<void> {
  }


  validateFilter = (filter) => {
    let objFilter = {}
    if (!filter) {
      return {}
    } else if (typeof filter === 'object' && Object.keys(filter).length == 0) {
      return filter
    } else if (typeof filter === 'object' && filter.filter && typeof filter.filter == "string") {
      let w = filter.filter
      Object.assign(objFilter, dJSON.parse(w))
    }
    return objFilter
  }

  async ping(server: FastifyInstance, filter?: any): Promise<any> {
    // console.log("Server :: ", server)
    console.log("Filter :: ", this.validateFilter(filter))

    const repo = new TruckRepository()
    const data = await repo.findAll(server, this.validateFilter(filter))
    return data
  }

  @Destructor()
  async destroy(): Promise<void> {
  }
}
