
export default class TruckWorkingZoneRepository {
  _entityname: string
  _defaultFilter: {
    where: Array<any>
  }
  constructor() {
    this._entityname = TruckWorkingZoneRepository.name;
    this._defaultFilter = { where: [] }
  }

  async findAllTruckWorkingZone(server: any, filter: any = this._defaultFilter) {
    try {
      console.log("Filter :: on repo :: ", filter)
      let repository: any = await server?.db?.truckWorkingZone
      let truck_list = await repository.find(filter);
      console.log("Response in repository :: ", JSON.parse(JSON.stringify(truck_list)))
      return truck_list
    } catch (error) {
      console.log("Error repository :: ", error)
      throw error
    }
  }

}
