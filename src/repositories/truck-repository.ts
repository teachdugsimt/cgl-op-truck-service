
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
    let repository: any = await server?.db?.truck

    // await repository.save({
    //   fullname: "Manager",
    //   name: "ROLE_MANAGER",
    //   version: 0,
    //   is_deleted: false,
    // });

    let truck_list = await repository.find(filter);
    // let truck_list = await repository.find({
    //   where: [
    //     // { id: "ROLE_DEV" },
    //   ]
    // });
    return truck_list
  }

}
