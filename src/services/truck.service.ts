import { Service, Initializer, Destructor } from 'fastify-decorators';
import TruckRepository from '../repositories/truck-repository'
import { FastifyInstance } from 'fastify';
import { RawTruck, ParseUpdateTruck } from '../controllers/propsTypes'
import _ from 'lodash'
import Utility from 'utility-layer/dist/security'
import { stat } from 'fs';

const utility = new Utility();
const deleteDocument = (document, docId) => {
  let tmpData = document

  Object.keys(document).map((e) => {
    if (document[e] == docId) {
      delete document[e]
    }
  })

  let newDocument = {}
  let minusIndex = false
  Object.keys(document).map((e, i) => {
    if (Number(e) != i) {
      minusIndex = true
    }
    if (minusIndex) {
      newDocument[(i).toString()] = tmpData[(i + 1).toString()] ? tmpData[(i + 1).toString()] : null
    } else {
      newDocument[e] = tmpData[e]
    }
  })
  return newDocument
}
@Service()
export default class TruckService {
  @Initializer()
  async init(): Promise<void> {
  }

  async deleteDocumentById(truckId: number, docId: string): Promise<any> {
    const repo = new TruckRepository()
    const data = await repo.findOne(truckId)

    if (data && data.document && typeof data.document == 'object') {
      let newDocument = deleteDocument(data.document, docId)
      console.log("New document affter delete : ", newDocument)
      data.document = typeof newDocument == 'object' && Object.keys(newDocument).length > 0 ? newDocument : null
      await repo.update(data)
      return { message: true }
    } else {
      return { message: false }
    }
  }

  async findMyTruckWithId(server: FastifyInstance, id: string): Promise<any> {
    const repo = new TruckRepository()
    const data = await repo.findMyTruckWithId(server, id)
    return data
  }

  async findTruckByID(server: FastifyInstance, id: string): Promise<any> {
    // console.log("Server :: ", server)
    const repo = new TruckRepository()
    const data = await repo.findOneById(server, id)
    return data
  }

  async createTruck(server: FastifyInstance, data: RawTruck): Promise<any> {
    // console.log("Server :: ", server)
    console.log("Query String Create truck : ", data)
    const repo = new TruckRepository()
    const result = await repo.createTruckV2(server, data)
    return result
  }

  async updateTruck(server: FastifyInstance, data: ParseUpdateTruck, userId: string): Promise<any> {
    const repo = new TruckRepository()
    return repo.updateTruck(server, data, userId)
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


  async updateUserDocumentStatus(truckId: string, status: 'NO_DOCUMENT' | 'WAIT_FOR_VERIFIED' | 'VERIFIED' | 'REJECTED'): Promise<any> {
    const repo = new TruckRepository()
    const id = utility.decodeUserId(truckId);
    const data = await repo.findOne(id)
    const newData = { ...data, documentStatus: status }
    console.log("New data ;: ", newData)
    return repo.update(newData);
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
