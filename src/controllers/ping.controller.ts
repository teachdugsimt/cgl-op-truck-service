import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import { Controller, GET, getInstanceByToken, FastifyInstanceToken } from 'fastify-decorators';
import PingService from '../services/ping.service';
import pingSchema from './ping.schema';


@Controller({ route: '/ping' })
export default class PingController {

  public static instance: FastifyInstance = getInstanceByToken(FastifyInstanceToken);
  private pingService = getInstanceByToken<PingService>(PingService);

  @GET({
    url: '/',
    options: {
      schema: pingSchema
    }
  })
  async pingHandler(req: FastifyRequest, reply: FastifyReply): Promise<object> {
    console.log("Request handler 2 :: ",req.query)
    return { message: await this.pingService?.ping(PingController.instance, req.query) }
  }

}
