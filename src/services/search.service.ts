import { Service, Initializer, Destructor } from 'fastify-decorators';
import TruckRepository from '../repositories/truck-repository'
import { FastifyInstance } from 'fastify';
import { TruckFilter } from '../controllers/propsTypes'
import * as aws from "aws-sdk"
@Service()
export default class SearchService {
  @Initializer()
  async init(): Promise<void> {
  }

  async search(server: FastifyInstance, body: TruckFilter): Promise<any> {
    console.log("Filter :: ", body)
    let { rowsPerPage, page, truckTypes, workingZones } = body;
    let realPage: number;
    let realTake: number;
    if (rowsPerPage) realTake = +rowsPerPage;
    else {
      rowsPerPage = 10;
      realTake = 10;
    }
    if (page) realPage = +page === 1 ? 0 : (+page - 1) * realTake;
    else {
      realPage = 0;
      page = 1;
    }
    const findOptions: any = {
      take: realTake,
      skip: realPage,
      where: [],
    };
    if (truckTypes && truckTypes.length) truckTypes.map(e => findOptions.where.push({ truck_type: e }))
    // if (workingZones && workingZones.length) workingZones.map(e => findOptions.where.push({ workingZones: e }))

    // var lambda = new aws.Lambda({region: 'ap-southeast-1'});
    // var params = {
    //   FunctionName: "arn:aws:lambda:ap-southeast-1:911597493577:function:test-invoke",
    //   Payload: JSON.stringify({
    //     "transaction_code": "6931",
    //     "partner_abbreviation": "registerBlaz5App"
    //   }),
    // };
    // const response = await lambda.invoke(params).promise()
    // console.log("Response test invoke :: ", response)

    const repo = new TruckRepository()
    const data = await repo.findAllJoinTruck(server, findOptions)
    const response_final = {
      data: data[0],
      totalElements: data[1],
      size: rowsPerPage,
      numberOfElements: data[0].length,
      currentPage: page,
      totalPages: Math.ceil(data[1] / (+rowsPerPage))
    }
    console.log("Data in search FINAL :: ", response_final)
    return response_final
  }

  @Destructor()
  async destroy(): Promise<void> {
  }
}
