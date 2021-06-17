import { Service, Initializer, Destructor } from 'fastify-decorators';
import TruckRepository from '../repositories/truck-repository'
import { FastifyInstance } from 'fastify';
import { TruckFilterGet } from '../controllers/propsTypes'
import * as aws from "aws-sdk"
import { FindManyOptions } from 'typeorm';

@Service()
export default class SearchServiceGet {
  @Initializer()
  async init(): Promise<void> {
  }

  async search(server: FastifyInstance, query: TruckFilterGet): Promise<any> {
    console.log("Filter :: ", query)
    let { rowsPerPage, page, truckTypes: tt, workingZones: wr, descending } = query;
    const truckTypes = tt && typeof tt == 'string' ? JSON.parse(tt) : []
    const workingZones = wr && typeof wr == 'string' ? JSON.parse(wr) : []

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

    let tempString1: string
    let filterTruck: string = ''
    if (truckTypes && Array.isArray(truckTypes) && truckTypes.length > 0) {
      tempString1 = JSON.stringify(truckTypes)
      filterTruck = tempString1.slice(1, tempString1.length - 1)
    }


    let provinceFilterString: string = ""
    if (workingZones && Array.isArray(workingZones) && workingZones.length > 0) {
      if (workingZones.length == 1) provinceFilterString += `  ( "VwTruckList"."work_zone"::jsonb @> '[{"province":${workingZones[0]}}]' ) `
      else workingZones.map((e, i) => {
        if (workingZones && workingZones.length > 1 && i == 0) {
          provinceFilterString += `("VwTruckList"."work_zone"::jsonb @> '[{"province":${e}}]' or `
        } else if (workingZones && i == workingZones.length - 1) {
          provinceFilterString += `"VwTruckList"."work_zone"::jsonb @> '[{"province":${e}}]')`
        } else {
          provinceFilterString += `"VwTruckList"."work_zone"::jsonb @> '[{"province":${e}}]' or `
        }
      })
    } else {
      provinceFilterString = `"VwTruckList"."work_zone"::jsonb @> '[]'`
    }

    console.log("Filter Province :: ")

    const finalFilter: string = filterTruck ? `"VwTruckList"."truck_type" in (${filterTruck}) and ${provinceFilterString}`
      : `${provinceFilterString}`
    console.log("FinalFilter on  service :: ", finalFilter)

    const findOptions: FindManyOptions = {
      take: realTake,
      skip: realPage,
      where: finalFilter,
      order: {
        id: descending ? "DESC" : "ASC"
      },
    };
    // if (truckTypes && truckTypes.length) truckTypes.map(e => findOptions.where.push({ truck_type: e }))

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
      numberOfElements: data[0].length ?? 0,
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
