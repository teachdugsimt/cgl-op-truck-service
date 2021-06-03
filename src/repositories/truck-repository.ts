import { DtbTruckWorkingZone } from '../models'

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

      // let truck_list = await repository.findAndCount({
      //   ...filter,
      //   join: {
      //     alias: "dtb_truck_working_zone",
      //     leftJoinAndSelect: {
      //       workzone: "dtb_truck_working_zone.workzone",
      //       // region: "dtb_truck_working_zone.region",
      //       // province: "dtb_truck_working_zone.province"
      //     }
      //   }
      // });

      // let truck_list = await repository.findAndCount({
      //   ...filter,
      //   relations: ['dtb_truck_working_zone', 'dtb_truck_working_zone.truck_id',
      //     'dtb_truck_working_zone.region', 'dtb_truck_working_zone.province']
      // });

      // let truck_list = await repository.createQueryBuilder('dtb_truck')
      //   .leftJoinAndSelect(DtbTruckWorkingZone, 'w', 'dtb_truck.id = w.truck_id')
      //   // .where('truck.truck_type = :truck_type', { truck_type: 18 })
      //   .getMany();

      // let truck_list = await repository.createQueryBuilder('dtb_truck')
      //   .innerJoinAndSelect('dtb_truck.id', 'truck')
      //   .innerJoinAndMap("dtb_truck.id", DtbTruckWorkingZone, 'workzone', 'truck.id = workzone.truck_id and workzone.region = 1')
      //   .where('dtb_truck.id = :truckId', { truckId: 100 })

      console.log("Response in repository :: ", JSON.parse(JSON.stringify(truck_list)))
      return truck_list
    } catch (error) {
      console.log("Error repository :: ", error)
      throw error
    }
  }

}
