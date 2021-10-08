import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import { Controller, GET, getInstanceByToken, FastifyInstanceToken } from 'fastify-decorators';
import TruckService from '../services/truck.service';
import { TruckOneOnlyMe } from './truck.schema';
import Utility from 'utility-layer/dist/security'
const util = new Utility();

@Controller({ route: '/api/v2/trucks' })
export default class TruckV2Controller {

  public static instance: FastifyInstance = getInstanceByToken(FastifyInstanceToken);
  private truckService = getInstanceByToken<TruckService>(TruckService);
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
      const data = await this.truckService?.findMyTruckWithId(TruckV2Controller.instance, truck_id)
      console.log("Final data find one (my truck) :: ", data)
      return { data }
    } catch (err) {
      console.log("Raw Erorr Controller : ", err)
      return err
    }
  }

}
