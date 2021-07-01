import { FastifyReply, FastifyRequest, FastifyInstance, FastifySchema } from 'fastify';
import { Controller, GET, POST, PUT, getInstanceByToken, FastifyInstanceToken } from 'fastify-decorators';
import PingService from '../services/ping.service';
import SearchService from '../services/search.service';
import SearchServiceGet from '../services/search-get.service';
import TruckService from '../services/truck.service';
import { TruckSchema, TruckOne, TruckFilterSchema } from './truck.schema';
import searchSchema, { searchGetSchema, createTruck, updateTruck, getMySchema } from './search.schema';
import { DtbTruck } from '../models'
import { TruckFilter, RawUpdateTruck, Truck, TruckListResponse, TruckFilterGet } from './propsTypes'
import Utility from 'utility-layer/dist/security'
const util = new Utility();
@Controller({ route: '/api/v1/trucks' })
export default class PingController {

  public static instance: FastifyInstance = getInstanceByToken(FastifyInstanceToken);
  private pingService = getInstanceByToken<PingService>(PingService);
  private searchService = getInstanceByToken<SearchService>(SearchService);
  private truckService = getInstanceByToken<TruckService>(TruckService);
  private searchServiceGet = getInstanceByToken<SearchServiceGet>(SearchServiceGet);

  @GET({
    url: '/:id',
    options: {
      schema: TruckOne
    },
  })
  async findMyTruckWithId(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<any> {
    try {
      const truck_id = util.decodeUserId(req.params.id)
      console.log("Request params :: ", truck_id)
      const data = await this.truckService?.findTruckByID(PingController.instance, truck_id)
      console.log("Final data find one :: ", data)
      return { data }
    } catch (err) {
      console.log("Raw Erorr Controller : ", err)
      return err
    }
  }

  // @POST({  // search by POST
  //   url: '/',
  //   options: {
  //     schema: searchSchema
  //   },
  // })
  // async searchTruckHandler(req: FastifyRequest<{ Body: TruckFilter }>, reply: FastifyReply): Promise<TruckListResponse> {
  //   try {
  //     const response = await this.searchService?.search(PingController.instance, req.body)
  //     return { ...response }

  //   } catch (err) {
  //     console.log("Raw Erorr Controller : ", err)
  //     return err
  //   }
  // }

  @POST({ // crerate new truck
    url: '/',
    options: {
      schema: createTruck
    },
  })
  async searchTruckHandler(req: FastifyRequest<{ Body: Truck }>, reply: FastifyReply): Promise<any> {
    try {
      const validateCarrierId: any = req.body
      if (validateCarrierId.carrierId && validateCarrierId.carrierId.match(/^[0-9A-Z]{8,15}$/)) {
        validateCarrierId.carrierId = util.decodeUserId(validateCarrierId.carrierId)
      }
      const result = await this.truckService?.createTruck(PingController.instance, req.body)
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

      const result = await this.truckService?.updateTruck(PingController.instance, data)
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
      const response = await this.searchServiceGet?.search(PingController.instance, req.query)
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

      const response = await this.searchServiceGet?.searchMe(PingController.instance, req.query, userId)
      return { ...response }
    } catch (err) {
      console.log("Raw Erorr Controller : ", err)
      return err
    }
  }

}
