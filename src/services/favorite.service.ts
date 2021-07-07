import { Service, Initializer, Destructor } from 'fastify-decorators';
import TruckRepository from '../repositories/truck-repository'
import { FastifyInstance } from 'fastify';
import { TruckFilterGet } from '../controllers/propsTypes'
import { FindManyOptions } from 'typeorm';

const enum_status = {
  0: 'INACTIVE', 1: 'ACTIVE'
}
@Service()
export default class FavoriteService {
  @Initializer()
  async init(): Promise<void> {
  }

  async getFavorite(server: FastifyInstance, query: TruckFilterGet, userId: string): Promise<any> {
    console.log("Filter :: ", query)
    let { rowsPerPage, page, truckTypes: tt, workingZones: wr, descending, sortBy = "id", status } = query;
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


    let filterProvince: string = ""
    if (workingZones && Array.isArray(workingZones) && workingZones.length > 0) {
      if (workingZones.length == 1) filterProvince += `  ( "VwTruckFavorite"."work_zone"::jsonb @> '[{"province":${workingZones[0]}}]' ) `
      else workingZones.map((e, i) => {
        if (workingZones && workingZones.length > 1 && i == 0) {
          filterProvince += `("VwTruckFavorite"."work_zone"::jsonb @> '[{"province":${e}}]' or `
        } else if (workingZones && i == workingZones.length - 1) {
          filterProvince += `"VwTruckFavorite"."work_zone"::jsonb @> '[{"province":${e}}]')`
        } else {
          filterProvince += `"VwTruckFavorite"."work_zone"::jsonb @> '[{"province":${e}}]' or `
        }
      })
    } else {
      filterProvince = ``
    }


    const filterTruckFinal = filterTruck ? `"VwTruckFavorite"."truck_type" in (${filterTruck}) ` : ``
    const filterStatus = (status != undefined || status != null) ? `${`"VwTruckFavorite"."approve_status" = '${enum_status[status]}'`}` : ``

    const finalFilter: string = filterTruck ? `${filterTruckFinal} ${filterProvince ? `and ${filterProvince}` : ``} ${filterStatus ? `and ${filterStatus}` : ``}`
      : `${filterProvince} ${filterProvince && filterStatus ? `and ${filterStatus}` : filterStatus}`

    console.log("FinalFilter on  service :: ", finalFilter, finalFilter.length)
    const filterAddUserId: string = finalFilter && finalFilter.length > 4 ? `${finalFilter} and "VwTruckFavorite"."user_id" = ${userId} ` : ` "VwTruckFavorite"."user_id" = ${userId}`

    const findOptions: FindManyOptions = {
      take: realTake,
      skip: realPage,
      where: filterAddUserId,
      select: ['id', 'approveStatus', 'loadingWeight', 'registrationNumber',
        'stallHeight', 'tipper', 'truckType', 'createdAt', 'updatedAt', 'workingZones', 'owner'],
      order: {
        [`${sortBy}`]: descending ? "ASC" : "DESC"
      },
    };

    const repo = new TruckRepository()
    const data = await repo.findFavoriteTruck(server, findOptions)
    const response_final = {
      data: data[0],
      totalElements: data[1],
      size: rowsPerPage,
      numberOfElements: data[0].length ?? 0,
      currentPage: page,
      totalPages: Math.ceil(data[1] / (+rowsPerPage))
    }
    console.log("Data in favorite truck FINAL :: ", response_final)
    return response_final
  }

  async addFavoriteTruck(server: FastifyInstance, userId: number, truckId: number) {
    const repo = new TruckRepository()
    return repo.addFavoriteTruck(server, userId, truckId)
  }

  @Destructor()
  async destroy(): Promise<void> {
  }
}
