import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import { Controller, GET, POST, PUT, getInstanceByToken, FastifyInstanceToken } from 'fastify-decorators';
import PingService from '../services/ping.service';
import SearchService from '../services/search.service';
import SearchServiceGet from '../services/search-get.service';
import TruckService from '../services/truck.service';
import FavoriteService from '../services/favorite.service'
import { TruckOne, TruckOneOnlyMe, TruckOneMST, FavoriteTruck, PostFavoriteTruck } from './truck.schema';
import {
  searchGetSchema, createTruck, updateTruck, getMySchema, getAllMeSchema,
  getMyTruckSummary, getAllMeWithoutAuthorizeSchema
} from './search.schema';
import { RawUpdateTruck, Truck, TruckListResponse, TruckFilterGet } from './propsTypes'
import Utility from 'utility-layer/dist/security'
const util = new Utility();
@Controller({ route: '/api/v1/trucks' })
export default class TruckController {

  public static instance: FastifyInstance = getInstanceByToken(FastifyInstanceToken);
  private pingService = getInstanceByToken<PingService>(PingService);
  private searchService = getInstanceByToken<SearchService>(SearchService);
  private truckService = getInstanceByToken<TruckService>(TruckService);
  private searchServiceGet = getInstanceByToken<SearchServiceGet>(SearchServiceGet);
  private favoriteTruckService = getInstanceByToken<FavoriteService>(FavoriteService);




  @GET({
    url: '/:id/mst',
    options: {
      schema: TruckOneMST
    },
  })
  async findTruckMst(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<any> {
    try {
      const truck_id = util.decodeUserId(req.params.id)
      const server: any = TruckController.instance
      const repository: any = server?.db?.truck
      const data = await repository.findOne({
        where: [{ id: truck_id }], select: ['id', 'carrierId', 'approveStatus',
          'loadingWeight', 'registrationNumber', 'stallHeight', 'isTipper', 'truckType',
          'createdAt', 'updatedAt']
      })
      console.log("Final data find one :: ", data)
      return { ...data }
    } catch (err) {
      console.log("Raw Erorr Controller : ", err)
      return err
    }
  }

  @GET({
    url: '/view/:id',
    options: {
      schema: TruckOne
    },
  })
  async findTruckDetailWithId(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<any> {
    try {
      const truck_id = util.decodeUserId(req.params.id)
      console.log("Request params :: ", truck_id)
      const data = await this.truckService?.findTruckByID(TruckController.instance, truck_id)
      console.log("Final data find one :: ", data)
      return { data }
    } catch (err) {
      console.log("Raw Erorr Controller : ", err)
      return err
    }
  }


  @GET({
    url: '/:id',
    options: {
      schema: TruckOneOnlyMe
    },
  })
  async findMyTruckDetail(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<any> {
    try {
      const truck_id = util.decodeUserId(req.params.id)
      console.log("Request params :: ", truck_id)
      const data = await this.truckService?.findMyTruckWithId(TruckController.instance, truck_id)
      console.log("Final data find one (my truck) :: ", data)
      return { data }
    } catch (err) {
      console.log("Raw Erorr Controller : ", err)
      return err
    }
  }



  @POST({ // crerate new truck
    url: '/',
    options: {
      schema: createTruck
    },
  })
  async searchTruckHandler(req: FastifyRequest<{ Body: Truck, Headers: { authorization: string } }>, reply: FastifyReply): Promise<any> {
    try {
      const result = await this.truckService?.createTruck(TruckController.instance, req.body)
      console.log("Result create new truck  :: ", result)
      return { data: result }

    } catch (err) {
      console.log("Raw Erorr Controller : ", err)
      return err
    }
  }

  @PUT({ // update new truck
    url: '/:id',
    options: {
      schema: updateTruck
    },
  })
  async updateTruck(req: FastifyRequest<{ Body: RawUpdateTruck, Params: { id: string } }>, reply: FastifyReply): Promise<any> {
    try {
      const data: any = req.body
      const id = util.decodeUserId(req.params.id);
      const carrierId = util.decodeUserId(req.body.carrierId);
      console.log("Decode id :  ", id)
      console.log("Carrierr id ::  ", carrierId)
      data.id = id
      data.carrierId = carrierId

      const result = await this.truckService?.updateTruck(TruckController.instance, data)
      return result ? true : false

    } catch (err) {
      console.log("Raw Erorr Controller : ", err)
      return err
    }
  }

  @GET({
    url: '/',
    options: {
      schema: searchGetSchema
    },
  })
  async searchGetTruckHandler(req: FastifyRequest<{ Querystring: TruckFilterGet }>, reply: FastifyReply): Promise<TruckListResponse> {
    try {
      const response = await this.searchServiceGet?.search(TruckController.instance, req.query)
      return { ...response }

    } catch (err) {
      console.log("Raw Erorr Controller : ", err)
      return err
    }
  }

  @GET({
    url: '/me',
    options: {
      schema: getMySchema
    },
  })
  async getListMyTruck(req: FastifyRequest<{ Querystring: TruckFilterGet, Headers: { authorization: string }, }>, reply: FastifyReply): Promise<any> {
    try {
      console.log("HEADERS :: ", req.headers)
      const token = req.headers.authorization
      const rawObject = util.getUserIdByToken(token)
      console.log("Raw  object  :: ", rawObject)
      const userId = util.decodeUserId(rawObject)
      console.log("Real User id : ", userId)
      // const userId = 7

      const response = await this.searchServiceGet?.searchMe(TruckController.instance, req.query, userId)
      return { ...response }
    } catch (err) {
      console.log("Raw Erorr Controller : ", err)
      return err
    }
  }

  @GET({
    url: '/me/all',
    options: {
      schema: getAllMeSchema
    },
  })
  async getListAllMyTruck(req: FastifyRequest<{ Querystring: TruckFilterGet, Headers: { authorization: string }, }>, reply: FastifyReply): Promise<any> {
    try {
      const token = req.headers.authorization
      const rawObject = util.getUserIdByToken(token)
      const userId = util.decodeUserId(rawObject)
      const response = await this.searchServiceGet?.searchMyAll(TruckController.instance, req.query, userId)
      return { ...response }
    } catch (err) {
      console.log("Raw Erorr Controller : ", err)
      return err
    }
  }

  @GET({
    url: '/me/list-all/:id',
    options: {
      schema: getAllMeWithoutAuthorizeSchema
    },
  })
  async getListAllMyTruckWithoutAuthorize(req: FastifyRequest<{ Querystring: TruckFilterGet, Params: { id: string }, Headers: { authorization: string } }>, reply: FastifyReply): Promise<any> {
    try {
      const enId = req.params.id
      const userId = util.decodeUserId(enId)
      const response = await this.searchServiceGet?.searchMyAll(TruckController.instance, req.query, userId)
      return { ...response }
    } catch (err) {
      console.log("Raw Erorr Controller : ", err)
      return err
    }
  }

  @GET({
    url: '/my-truck',
    options: {
      schema: getMyTruckSummary
    },
  })
  async getTruckSummary(req: FastifyRequest<{ Querystring: TruckFilterGet, Headers: { authorization: string }, }>, reply: FastifyReply): Promise<any> {
    try {
      const repo = new TruckController()
      const response = await repo.getListAllMyTruck(req, reply)
      const processSummary = this.truckService.processTruckSummary(response.data)
      console.log("Finalresponse summary :: ", processSummary)
      return { ...processSummary }
    } catch (err) {
      console.log("Raw Erorr Controller : ", err)
      return err
    }
  }





  @GET({
    url: '/favorite',
    options: {
      schema: FavoriteTruck
    },
  })
  async getFavoriteTruck(req: FastifyRequest<{ Querystring: TruckFilterGet, Headers: { authorization: string } }>, reply: FastifyReply): Promise<any> {
    try {
      const token = req.headers.authorization
      const rawObject = util.getUserIdByToken(token)
      const userId = util.decodeUserId(rawObject)
      const response = await this.favoriteTruckService?.getFavorite(TruckController.instance, req.query, userId)
      return { ...response }
    } catch (err) {
      console.log("Raw Erorr Controller : ", err)
      return err
    }
  }

  @POST({
    url: '/favorite',
    options: {
      schema: PostFavoriteTruck
    },
  })
  async postFavoriteTruck(req: FastifyRequest<{ Body: { id: string }, Headers: { authorization: string } }>, reply: FastifyReply): Promise<any> {
    try {
      const token = req.headers.authorization
      const rawObject = util.getUserIdByToken(token)
      const userId = util.decodeUserId(rawObject)
      const response = await this.favoriteTruckService?.addFavoriteTruck(TruckController.instance, userId, util.decodeUserId(req.body.id))
      return response
    } catch (err) {
      console.log("Raw Erorr Controller : ", err)
      return err
    }
  }

}
