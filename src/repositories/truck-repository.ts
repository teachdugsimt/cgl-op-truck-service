import { DtbTruck, DtbTruckWorkingZone, TruckPhoto, FavoriteTruck } from '../models'
import { Repository, FindOneOptions } from 'typeorm'
import { RawTruck, ParseUpdateTruck, TruckPhotoUpdate } from '../controllers/propsTypes'
import _ from "lodash";
import axios from 'axios'
import * as Types from '../controllers/propsTypes'
import { FastifyInstance } from 'fastify';
import { FastifyInstanceToken, getInstanceByToken } from 'fastify-decorators';
import Utility from 'utility-layer/dist/security'
const util = new Utility();

const enum_type_image = {
  front: 1, back: 2, left: 3, right: 4,
  FRONT: 1, BACK: 2, LEFT: 3, RIGHT: 4,
}
const enum_position = ['front', 'back', 'left', 'right']

interface ListNewUpload {
  truckId: number
  photoName: string
  type: number
}

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

  private instance: FastifyInstance = getInstanceByToken(FastifyInstanceToken);
  async findOne(id: number, options?: FindOneOptions): Promise<any> {
    const server: any = this.instance
    const truckRepository: Repository<DtbTruck> = server?.db?.truck;
    return truckRepository.findOne(id, options);
  }


  async update(data: Types.PureTruck): Promise<any> {
    const server: any = this.instance
    const truckRepository: Repository<DtbTruck> = server?.db?.truck;
    return truckRepository.save(truckRepository.create(data));
  }

  async findOneById(server: any, id: string | number) {
    try {
      let repository: any = await server?.db?.vwTruckDetails
      let truck_list: any = await repository.findOne({ id });
      console.log("Raw data query : ", truck_list)

      const parseData: any = JSON.parse(JSON.stringify(truck_list));
      let modelTruckPhotos: any = {
        front: null,
        back: null,
        left: null,
        right: null,
      }
      if (parseData.truckPhotos && Object.keys(parseData.truckPhotos).length > 0) {
        enum_position.map(e => {
          if (!parseData.truckPhotos[e]) {
            parseData.truckPhotos[e] = null
          }
        })

        Object.keys(parseData.truckPhotos).map(e => e == 'none' && delete parseData.truckPhotos[e])
      } else {
        parseData['truckPhotos'] = modelTruckPhotos
      }
      console.log("Parse truck  Photos :: ", parseData)
      return parseData
    } catch (error) {
      console.log("Error repository find  with id :: ", error)
      throw error
    }
  }
  async confirmMedia(url: string[]): Promise<any> {
    try {
      const apiUrl = process.env.API_URL ? process.env.API_URL + `/api/v1/media/confirm`
        : `https://2kgrbiwfnc.execute-api.ap-southeast-1.amazonaws.com/prod/api/v1/media/confirm`
      const result = await axios.post(apiUrl, { url })
      return result?.data
    } catch (error) {
      throw error
    }
  }
  async getFileWithAttachCode(list: string[]): Promise<any> {
    try {
      const apiUrl = process.env.API_URL ? process.env.API_URL + `/api/v1/media/file-by-attach-code`
        : `https://d3c8ovmhhst6ne.cloudfront.net/api/v1/media/file-by-attach-code`
      const result = await axios.get(apiUrl, { params: { url: JSON.stringify(list) } })
      // console.log("Result file dynamo : ", result)
      return result?.data
    } catch (error) {
      throw error
    }
  }

  processVehicleDocument(document: string[] | null) {
    if (!Array.isArray(document) || document.length < 1) return null
    else {
      let tmp = {}
      document.map((e, i) => tmp[i] = e)
      return tmp
    }
  }
  async createTruckV2(server: any, data: RawTruck) {
    try {

      let repository: Repository<DtbTruck> = await server?.db?.truck
      let repositoryTWR: Repository<DtbTruckWorkingZone> = await server?.db.truckWorkingZone
      let repositoryTPhoto: Repository<TruckPhoto> = await server?.db.truckPhoto


      const saveTruck: any = await repository.save(repository.create({
        carrierId: data?.carrierId,
        registrationNumber: data.registrationNumber && data.registrationNumber.length ? data.registrationNumber.join(',') : null,
        loadingWeight: data.loadingWeight || 0,
        stallHeight: data.stallHeight || "LOW",
        isTipper: data.tipper || false,
        truckType: data.truckType,
        createdUser: "" + data?.carrierId,
        document: data.document && typeof Array.isArray(data.document) &&
          data.document.length > 0 ? this.processVehicleDocument(data.document) : null,
        documentStatus: data.document && typeof Array.isArray(data.document) &&
          data.document.length > 0 ? 'WAIT_FOR_VERIFIED' : 'NO_DOCUMENT',
        createdFrom: data.createdFrom ? data.createdFrom : 1
      }))
      console.log("Save Truck  data :: ", saveTruck)


      let objectPhoto: any = {}
      let saveTPhoto: any
      let arr_tmp_attach_code: any = []
      if (data.truckPhotos?.front || data.truckPhotos?.back || data.truckPhotos?.left || data.truckPhotos?.right) {
        let tmp = data.truckPhotos

        Object.keys(Object.keys(data.truckPhotos).map((e) => {
          if (tmp[e]) {
            objectPhoto[e] = tmp[e]
            arr_tmp_attach_code.push(tmp[e])
          } else objectPhoto[e] = null
        }))
        if (data.document && typeof Array.isArray(data.document) &&
          data.document.length > 0) data.document.map(e => arr_tmp_attach_code.push(e))

        console.log("Array list File attach code :: ", arr_tmp_attach_code)
        const responseConfirm = await this.confirmMedia(arr_tmp_attach_code)
        console.log(" responseConfirm :  ", responseConfirm)

        if (responseConfirm.message == "confirm success") {
          const raw_file_data = await this.getFileWithAttachCode(arr_tmp_attach_code)
          console.log("Raw file data :: ", raw_file_data)

          const mapToSavePhotos = raw_file_data.data.map((e: any) => {
            e.type = enum_type_image[e.type.split("/")[1]]
            e.truckId = saveTruck.id
            e.photoName = e.attach_code // BEC : confirmCode  use attach_code
            delete e.attach_code
            delete e.user_id
            delete e.file_name
            delete e.expire
            delete e.status
            return e
          })
          console.log("Map to sAVE :: ", mapToSavePhotos)

          saveTPhoto = await repositoryTPhoto.createQueryBuilder().insert().into(TruckPhoto)
            .values(mapToSavePhotos)
            .execute();
        }
      }
      console.log("saveTPhoto :: ", saveTPhoto)

      let arrZone: any = []
      let saveTwr: any
      if (data.workingZones && Array.isArray(data.workingZones) && data.workingZones.length > 0) {
        const mappingZone: any = []
        data.workingZones.map(e => {
          let data_zone = {
            region: e.region,
            province: e.province,
          }
          mappingZone.push({ truck_id: saveTruck.id, ...data_zone })
          arrZone.push(data_zone)
        })
        saveTwr = await repositoryTWR.createQueryBuilder().insert().into(DtbTruckWorkingZone)
          .values(mappingZone)
          .execute();
      }
      console.log("saveTwr :: ", saveTwr)


      if (saveTPhoto && Object.keys(objectPhoto).length > 0) saveTruck.truckPhotos = objectPhoto
      if (saveTwr && Object.keys(saveTwr).length > 0) saveTruck.workingZones = arrZone

      const tmpSaveTruck = saveTruck
      tmpSaveTruck.registrationNumber = tmpSaveTruck.registrationNumber.split(' ')
      if (tmpSaveTruck.id) tmpSaveTruck.id = util.encodeUserId(saveTruck.id);
      console.log("Temp  save truck :: ", tmpSaveTruck)
      return saveTruck

    } catch (error) {
      console.log("Error truck repository :: ", error)
      throw error
    }
  }



  async deleteAttachCode(list: string[]) {
    try {
      const apiUrl = process.env.API_URL ? process.env.API_URL + `/api/v1/media/delete`
        : `https://d3c8ovmhhst6ne.cloudfront.net/api/v1/media/delete`
      const result = await axios.delete(apiUrl, { data: { list } })
      // console.log("Result file dynamo : ", result)
      return result?.data || false
    } catch (error) {
      throw error
    }
  }
  async updateTruck(server: any, data: ParseUpdateTruck, userId: string) {
    try {
      let repository: Repository<DtbTruck> = await server?.db?.truck
      let repositoryTWR: Repository<DtbTruckWorkingZone> = await server?.db.truckWorkingZone
      let repositoryTPhoto: Repository<TruckPhoto> = await server?.db.truckPhoto



      const saveTruck: any = await repository.save(repository.create({
        id: data.id,
        // carrierId: data?.carrierId,
        ...(data.registrationNumber && data.registrationNumber.length ? { registrationNumber: data.registrationNumber.join(',') } : undefined),
        ...(data.loadingWeight ? { loadingWeight: data.loadingWeight } : undefined),
        ...(data.stallHeight ? { stallHeight: data.stallHeight } : undefined),
        ...(typeof data?.tipper == 'boolean' ? { isTipper: data.tipper } : undefined),
        ...(data.truckType ? { truckType: data.truckType } : undefined),
        ...(data.document && typeof Array.isArray(data.document) &&
        data.document.length > 0 ? { document: this.processVehicleDocument(data.document) } : undefined),
        ...(data?.documentStatus ? { documentStatus: data.documentStatus } : undefined),
        updatedUser: "" + userId,
      }))
      if (data.document && typeof Array.isArray(data.document) &&
        data.document.length > 0) this.confirmMedia(data.document)
      console.log("SaveTruck : ", saveTruck)



      const oldZone = await repositoryTWR.find({ truck_id: data.id })
      const newZoneMap = data.workingZones && data.workingZones.length > 0 ? data.workingZones : []
      const oldZoneMap = oldZone && oldZone.length ? oldZone.map(e => ({ region: e.region, province: e.province })) : []

      const list_delete_zone = _.differenceWith(oldZoneMap, newZoneMap, _.isEqual);
      const list_add_new_zone = _.differenceWith(newZoneMap, oldZoneMap, _.isEqual);

      if (list_delete_zone && list_delete_zone.length > 0) {
        const provincePure = list_delete_zone.map(e => e.province)
        await repositoryTWR.createQueryBuilder()
          .delete().from(DtbTruckWorkingZone)
          .where('province IN (:...provinces)', {
            truck_id: data.id,
            provinces: provincePure
          }).execute()
      }
      if (list_add_new_zone && list_add_new_zone.length > 0) {
        const zone_add = list_add_new_zone.map((e: any) => ({ truck_id: data.id, ...e }))
        await repositoryTWR.save(zone_add)
      }


      const tmpPhoto: TruckPhotoUpdate = data.truckPhotos
      console.log("Truck Photos :: ", tmpPhoto)
      const listOldPhoto = await repositoryTPhoto.find({ truckId: data.id })
      console.log("List old Truck photos :: ", listOldPhoto)
      if (tmpPhoto) {
        const deleteList: any = [] // do first before insert
        const newList: ListNewUpload[] = []

        Object.keys(Object.keys(tmpPhoto).map((e) => {
          // ** front.action , back.action , left.action , right.action
          let tmpNameDelRow: any = listOldPhoto.find(row => row.type == enum_type_image[e])
          console.log("Slot old rows :: ", tmpNameDelRow)
          if (tmpPhoto[e] && tmpPhoto[e].action == 'REPLACE') {
            // delete on PQ, Dynamo & confirm (create new)
            deleteList.push({ truckIid: data.id, photoName: tmpNameDelRow.photoName, type: tmpNameDelRow.type })
            newList.push({ truckId: data.id, photoName: tmpPhoto[e].url, type: enum_type_image[e] })
          }
          else if (tmpPhoto[e] && tmpPhoto[e].action == 'NEW') {
            // confirm (create new)
            newList.push({ truckId: data.id, photoName: tmpPhoto[e].url, type: enum_type_image[e] })
          }
          else if (tmpPhoto[e] && tmpPhoto[e].action == 'NO_CHANGE') {
            // don't do anything
          }
          else if (tmpPhoto[e] && tmpPhoto[e].action == 'DELETE') {
            // delete on PQ, Dynamo
            deleteList.push({ truckIid: data.id, photoName: tmpNameDelRow.photoName, type: tmpNameDelRow.type })
          }
        }))
        const pick_delete_val = deleteList.map((e: any) => e.photoName)
        const pick_new_val = newList.map((e: any) => e.photoName)
        console.log("New list :: ", pick_new_val)

        if (deleteList && deleteList.length > 0) {
          await repositoryTPhoto.createQueryBuilder()
            .delete().from(TruckPhoto)
            .where('photoName IN (:...photoNames)', {
              photoNames: pick_delete_val
            }).execute()
          await this.deleteAttachCode(pick_delete_val)
          console.log("Delete List :: ", deleteList)
        }

        if (newList && newList.length > 0) {
          const resultCreateNew = await repositoryTPhoto.save(newList)
          this.confirmMedia(pick_new_val)
          console.log("Create new list result :: ", resultCreateNew)
        }

      }




      return true

    } catch (error) {
      console.log("Error update truck repository :: ", error)
      throw error
    }
  }



  async findAll(server: any, filter: any = this._defaultFilter) {
    try {
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

  async findMyTruck(server: any, filter: any) {
    try {
      console.log("Filter :: on repo :: ", filter)
      // let repository: any = await server?.db?.truck
      let repository: any = await server?.db?.vwMyTruck
      let truck_list = await repository.findAndCount(filter);

      console.log("My truck repository :: ", JSON.parse(JSON.stringify(truck_list)))
      return truck_list
    } catch (error) {
      console.log("Error My Truck repository :: ", error)
      throw error
    }
  }

  async findFavoriteTruck(server: any, filter: any) {
    try {
      console.log("Filter :: on repo :: ", filter)
      // let repository: any = await server?.db?.truck
      let repository: any = await server?.db?.vwTruckFavorite
      let truck_list = await repository.findAndCount(filter);

      console.log("My favorite truck repository :: ", JSON.parse(JSON.stringify(truck_list)))
      return truck_list
    } catch (error) {
      console.log("Error My Truck repository :: ", error)
      throw error
    }
  }



  async findMyTruckWithId(server: any, id: string | number) {
    try {
      let repository: any = await server?.db?.vwMyTruckId
      let truck_list: any = await repository.findOne({ id });
      console.log("query find my truck with id : ", truck_list)

      const parseData: any = JSON.parse(JSON.stringify(truck_list));
      let modelTruckPhotos: any = {
        front: null,
        back: null,
        left: null,
        right: null,
      }
      if (parseData.truckPhotos && Object.keys(parseData.truckPhotos).length > 0) {
        enum_position.map(e => {
          if (!parseData.truckPhotos[e]) {
            parseData.truckPhotos[e] = null
          }
        })

        Object.keys(parseData.truckPhotos).map(e => e == 'none' && delete parseData.truckPhotos[e])
      } else {
        parseData['truckPhotos'] = modelTruckPhotos
      }

      const tmpParseData = JSON.parse(JSON.stringify(parseData))
      // console.log("TmpParse data :: ", tmpParseData)
      if (tmpParseData.quotations && Array.isArray(tmpParseData.quotations) && tmpParseData.quotations.length > 0) {
        tmpParseData.quotations.map((q: any) => {
          let tmpId = q.id
          q.id = util.encodeUserId(tmpId)
          q.bookingDatetime = q.bookingdatetime
          delete q.bookingdatetime
          q.fullName = q.fullname
          delete q.fullname
          return q
        })
      }


      console.log("Repo find my truck by id :: ", tmpParseData)
      return tmpParseData
    } catch (error) {
      console.log("Error repository find  with id :: ", error)
      throw error
    }
  }

  async addFavoriteTruck(server: any, userId: number, truckId: number) {
    try {
      let repository: Repository<FavoriteTruck> = await server?.db.favoriteTruck
      await repository.save({
        userId, truckId,
        createdUser: userId.toString(), updatedUser: userId.toString()
      });
      return true
    } catch (error) {
      console.log("Error My Truck repository :: ", error)
      throw error
    }
  }

}

