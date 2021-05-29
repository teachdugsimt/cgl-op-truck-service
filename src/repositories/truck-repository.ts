
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
      let repository: any = await server?.db?.truck
      let truck_list = await repository.findAndCount(filter);
      console.log("Response in repository :: ", JSON.parse(JSON.stringify(truck_list)))
      return truck_list
    } catch (error) {
      console.log("Error repository :: ", error)
      throw error
    }
  }

}
