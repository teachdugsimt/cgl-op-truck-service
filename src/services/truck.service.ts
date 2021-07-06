import { Service, Initializer, Destructor } from 'fastify-decorators';
import TruckRepository from '../repositories/truck-repository'
import { FastifyInstance } from 'fastify';
import { Truck, ParseUpdateTruck } from '../controllers/propsTypes'
import _ from 'lodash'
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

  countTrucks(response: Array<ModelTruck>): number {
    return response && response.length ? response.length : 0
  }
  countZones(response: Array<ModelTruck>) {
    let arr: Array<{ region: number, province: number }> = []
    response.map((e: ModelTruck) => {
      const workZone = JSON.parse(JSON.stringify(e.workingZones)) || []
      if (workZone && Array.isArray(workZone) && workZone.length > 0) {
        arr = [...arr, ...workZone]
      }
    })
    const zonesArr = _.uniqBy(arr, 'province')
    return zonesArr && zonesArr.length ? zonesArr.length : 0;
  }

  processTruckSummary(response: Array<ModelTruck>) {
    console.log("Process Truck service :: ", response)
    const parseResponse: Array<ModelTruck> = JSON.parse(JSON.stringify(response))
    const countTrucks = this.countTrucks(parseResponse)
    const countZones = this.countZones(parseResponse)
    return {
      trucks: countTrucks,
      zones: countZones
    }
  }

  @Destructor()
  async destroy(): Promise<void> {
  }
}



export interface ModelTruck {
  "id": string,
  "approveStatus": string | null,
  "loadingWeight": number | null,
  "registrationNumber": string[],
  "stallHeight": string | null,
  "tipper": boolean,
  "truckType": number,
  "createdAt": string | null,
  "updatedAt": string | null,
  "quotationNumber": number | null,
  "workingZones": Array<{ region: number | null, province: number | null }>
}
