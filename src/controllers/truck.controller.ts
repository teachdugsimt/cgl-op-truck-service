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
    url: '/mobile',
    options: {
      schema: TruckFilterSchema
    },
  })
  async pingHandler(req: FastifyRequest, reply: FastifyReply): Promise<{ data: DtbTruck[] }> {
    try {
      console.log("Request params :: ", req.query)
      const data = await this.pingService?.ping(PingController.instance, req.query || null)
      // console.log("Final data : ", JSON.parse(JSON.stringify(data)))
      return { data }
    } catch (err) {
      console.log("Raw Erorr Controller : ", err)
      return err
    }
  }

  @GET({
    url: '/:id',
    options: {
      schema: TruckOne
    },
  })
  async findMyTruckWithId(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<any> {
    try {
      console.log("Request params :: ", req.params)
      const truck_id = util.decodeUserId(req.params.id)
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
        validateCarrierId.carrierId= util.decodeUserId(validateCarrierId.carrierId)
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
      const token = req.headers.authorization || "eyJraWQiOiJKRGJId2JWdlRFZ3M5dVJ4RVY2Y0NBM2dkTW1nU0xKOERhNGxUZmpBaXA4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkYjk4ZDNiMC01NTQwLTQxYjUtYWQwMi0zZjBlYWNiMGU1N2MiLCJyb2xlcyI6IkFkbWlufERyaXZlciIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMV9oSVdCU1l6N3oiLCJjb2duaXRvOnVzZXJuYW1lIjoiZGI5OGQzYjAtNTU0MC00MWI1LWFkMDItM2YwZWFjYjBlNTdjIiwidXNlcklkIjoiRVpRV0cwWjEiLCJjdXN0b206dXNlcklkIjoiRVpRV0cwWjEiLCJvcmlnaW5fanRpIjoiNjU3YjA0YTQtOWFkYS00MGZmLThmYTctMWM1ZDUxYTU5ZDM0IiwiYXVkIjoiNHFrZDE0dTZuYTBmbzF0Zmh0cmRhcmk0MWkiLCJldmVudF9pZCI6ImJjODE3MTdhLTBhMjQtNGJhMC1hMzliLWZhOGVlMjczMzkwNyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjI0NDcwNDQzLCJleHAiOjE2MjQ0NzQwNDMsImlhdCI6MTYyNDQ3MDQ0MywianRpIjoiOTM4M2NjMTQtZjI5My00OTRkLTliOTQtM2YwOTYyMjVkMWU3In0.iqFKygQQPXzDk1Yz0ZAwhp0V5eGM5GYqPmIHgP3gQHQpGw88rWO_2CmelPlK6_u0HX43lrMVwP-DB8mEOR-IV2WzgueP0xUl-d4dGtExCpyZd_fsiJjOUzpaR02_5MetN6qe0h6xb4ax78APMVBXDcx3Ep-QbxTeQM4xny6iuCgA8MrsZ8QRbvOdX7wZR5WDwtHKYA4ppA06hryGA0UzG6hAcG46_VGJcEjaV_It51R6vzAfohz367-vBtmUqLAcePeKGDIscAEKvgQXOlXi3_NT7KI9TW3zJc-5FxNt1XrC2rR-hTF91qQhtILZLYipb843AvxMKtP1j98cZXN8fQ"
      const rawObject = util.getUserIdByToken(token)
      // const userId = util.decodeUserId(rawObject)
      // console.log("Real User id : ", userId)
      const userId = 7

      const response = await this.searchServiceGet?.searchMe(PingController.instance, req.query, userId)
      return { ...response }
      // return {
      //   data: [],
      //   totalElements: null,
      //   size: null,
      //   numberOfElements: null,
      //   currentPage: null,
      //   totalPages: null,
      // }

    } catch (err) {
      console.log("Raw Erorr Controller : ", err)
      return err
    }
  }

}
