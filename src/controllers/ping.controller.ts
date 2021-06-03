import { FastifyReply, FastifyRequest, FastifyInstance, FastifySchema } from 'fastify';
import { Controller, GET, POST, getInstanceByToken, FastifyInstanceToken } from 'fastify-decorators';
import PingService from '../services/ping.service';
import SearchService from '../services/search.service';
import pingSchema from './ping.schema';
import searchSchema from './search.schema';
import { DtbTruck } from '../models'
import { TruckFilter, TruckListResponse } from './propsTypes'
@Controller({ route: '/api/v1/truck' })
export default class PingController {

  public static instance: FastifyInstance = getInstanceByToken(FastifyInstanceToken);
  private pingService = getInstanceByToken<PingService>(PingService);
  private searchService = getInstanceByToken<SearchService>(SearchService);

  @GET({
    url: '/mobile',
    options: {
      schema: pingSchema
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

  @POST({
    url: '/list',
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

}
