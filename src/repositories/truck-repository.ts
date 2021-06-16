import { DtbTruckWorkingZone } from '../models'
import { DtbTruck } from '../models'
import { Repository } from 'typeorm'
export default class TruckRepository {
  _entityname: string
  _defaultFilter: {
    where: Array<any>
  }
  constructor() {
    this._entityname = TruckRepository.name;
    this._defaultFilter = {
      where: [
        // { id: "ROLE_DEV" },
      ]
    }
  }

  async findOneById(server: any, id: string | number) {
    try {
      let repository: Repository<DtbTruck> = await server?.db?.truck
      let truck_list = await repository.findOne(Number(id));
      console.log("data in repo :: ", truck_list)
      return truck_list
    } catch (error) {
      console.log("Error repository :: ", error)
      throw error
    }
  }

  async findAll(server: any, filter: any = this._defaultFilter) {
    try {
      // await repository.save({
      //   fullname: "Manager",
      //   name: "ROLE_MANAGER",
      //   version: 0,
      //   is_deleted: false,
      // });
      // let truck_list = await repository.find({
      //   where: [
      //     // { id: "ROLE_DEV" },
      //   ]
      // });

      // console.log("Server => DB => : ", server.db)
      let repository: any = await server?.db?.truck
      let truck_list = await repository.find(filter);
      return truck_list
    } catch (error) {
      console.log("Error repository :: ", error)
      throw error
    }
  }

  async findAllJoinTruck(server: any, filter: any) {
    try {
      console.log("Filter :: on repo :: ", filter)
      // let repository: any = await server?.db?.truck
      let repository: any = await server?.db?.vwTruck
      let truck_list = await repository.findAndCount(filter);

      console.log("Response in repository :: ", JSON.parse(JSON.stringify(truck_list)))
      return truck_list
    } catch (error) {
      console.log("Error repository :: ", error)
      throw error
    }
  }

}
