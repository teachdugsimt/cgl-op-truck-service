import { FastifyReply, FastifyRequest, FastifyInstance, FastifySchema } from 'fastify';
import { Controller, GET, POST, getInstanceByToken, FastifyInstanceToken } from 'fastify-decorators';
import PingService from '../services/ping.service';
import SearchService from '../services/search.service';
import SearchServiceGet from '../services/search-get.service';
import TruckService from '../services/truck.service';
import { TruckSchema, TruckFilterSchema } from './truck.schema';
import searchSchema, { searchGetSchema } from './search.schema';
import { DtbTruck } from '../models'
import { TruckFilter, TruckListResponse, TruckFilterGet } from './propsTypes'
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
      schema: TruckSchema
    },
  })
  async findOneHandler(req: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply): Promise<{ data: DtbTruck }> {
    try {
      console.log("Request params :: ", req.params)
      const data = await this.truckService?.findTruckByID(PingController.instance, req.params.id)

      return { data }
    } catch (err) {
      console.log("Raw Erorr Controller : ", err)
      return err
    }
  }

  @POST({
    url: '/',
    options: {
      schema: searchSchema
    },
  })
  async searchTruckHandler(req: FastifyRequest<{ Body: TruckFilter }>, reply: FastifyReply): Promise<TruckListResponse> {
    try {
      const response = await this.searchService?.search(PingController.instance, req.body)
      return { ...response }

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

}
