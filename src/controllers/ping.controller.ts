import { FastifyReply, FastifyRequest, FastifyInstance, FastifySchema } from 'fastify';
import { Controller, GET, getInstanceByToken, FastifyInstanceToken } from 'fastify-decorators';
import PingService from '../services/ping.service';
import pingSchema from './ping.schema';
import { DtbTruck } from '../models'
@Controller({ route: '/api/v1/truck' })
export default class PingController {

  public static instance: FastifyInstance = getInstanceByToken(FastifyInstanceToken);
  private pingService = getInstanceByToken<PingService>(PingService);

  @GET({
    url: '/mobile',
    options: {
      schema: <FastifySchema>{
        response: {
          200: {
            type: 'object',
            properties: {
              data: { type: 'array' },
            },
          }
        },
      },
    },
  })
  // async pingHandler(): Promise<{ message: DtbTruck[] }> {
  async pingHandler(req: FastifyRequest, reply: FastifyReply): Promise<{ data: DtbTruck[] }> {
    try {
      // console.log("Event controller :: ", req)
      const data = await this.pingService?.ping(PingController.instance, null)
      // console.log("Final data : ", JSON.parse(JSON.stringify(data)))
      return { data }
    } catch (err) {
      console.log("Erorr Controller : ", err)
      throw err
    }

  }

}
