import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import { Controller, GET, POST, PUT, getInstanceByToken, FastifyInstanceToken } from 'fastify-decorators';
import SearchService from '../services/search.service';
import SearchServiceGet from '../services/search-get.service';
import TruckService from '../services/truck.service';
import FavoriteService from '../services/favorite.service'
import UpdateTruckProfileService from '../services/update-truck-profile.service'
import TruckDocumentService from '../services/truck-document.service'
import {
  TruckOne, TruckOneOnlyMe, TruckOneMST, FavoriteTruck, PostFavoriteTruck, generateUploadLinkResponse,
  deleteUploadLinkResponse, updateTruckDocumentResponse
} from './truck.schema';
import {
  searchGetSchema, createTruck, updateTruck, getMySchema, getAllMeSchema,
  getMyTruckSummary, getAllMeWithoutAuthorizeSchema
} from './search.schema';
import { RawUpdateTruck, Truck, TruckListResponse, TruckFilterGet } from './propsTypes'
import TruckDynamodbRepository, { UploadLink } from '../repositories/upload-link.repository'
import Utility from 'utility-layer/dist/security'
const util = new Utility();
@Controller({ route: '/api/v1/trucks' })
export default class TruckController {

  public static instance: FastifyInstance = getInstanceByToken(FastifyInstanceToken);
  private truckService = getInstanceByToken<TruckService>(TruckService);
  private searchServiceGet = getInstanceByToken<SearchServiceGet>(SearchServiceGet);
  private favoriteTruckService = getInstanceByToken<FavoriteService>(FavoriteService);
  private updateTruckProfileService = getInstanceByToken<UpdateTruckProfileService>(UpdateTruckProfileService);
  private truckDocumentService = getInstanceByToken<TruckDocumentService>(TruckDocumentService);

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
      const userId = req.body.carrierId
      const parseUserId = util.decodeUserId(userId)
      const newBody: any = req.body
      newBody.carrierId = parseUserId
      console.log("parse carrier id :: ", parseUserId)
      const result = await this.truckService?.createTruck(TruckController.instance, newBody)
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
  async updateTruck(req: FastifyRequest<{ Body: RawUpdateTruck, Params: { id: string }, Headers: { authorization: string } }>, reply: FastifyReply): Promise<any> {
    try {
      const data: any = req.body

      const id = util.decodeUserId(req.params.id);

      const userId = util.getUserIdByToken(req.headers.authorization)
      const decodeUserId = util.decodeUserId(userId)

      console.log("Decode id :  ", id)
      data.id = id
      // data.carrierId = carrierId

      const result = await this.truckService?.updateTruck(TruckController.instance, data, decodeUserId)
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















  @POST({
    url: '/:truckId/gen-doc-upload-link',
    options: {
      schema: generateUploadLinkResponse
    }
  })
  async GenerateLinkUpload(req: FastifyRequest<{ Params: { truckId: string } }>, reply: FastifyReply): Promise<any> {
    try {
      if (req.params.truckId) {

        const decodeId = util.decodeUserId(req.params.truckId)
        const data = { truckId: req.params.truckId }
        console.log("Data to jwt :: ", data)

        const base_url = process.env.BACK_OFFICE_URL ? `${process.env.BACK_OFFICE_URL}/${process.env.USER_UPLOAD || 'truck/upload/'}?token=` : "https://dev.backoffice.cargolink.co.th/truck/upload?token="
        const token = util.generateJwtToken(data)
        const link = base_url + token

        const repo = new TruckDynamodbRepository()
        const everHaveToken: UploadLink = await repo.findAttachCodeWithTruck(decodeId)

        let result: any
        const uploadLinkObject = {
          token,
          truck_id: decodeId
        }
        if (everHaveToken && typeof everHaveToken && Object.keys(everHaveToken).length > 0) {
          result = await repo.updateToken(uploadLinkObject)
        } else {
          result = await repo.createUploadLinkData(uploadLinkObject)
        }

        if (result && typeof result == "object")
          return { url: link, truckId: req.params.truckId }
        else return { url: null, truckId: req.params.truckId }
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  @POST({
    url: '/:truckId/clear-upload-link',
    options: {
      schema: deleteUploadLinkResponse
    }
  })
  async ClearUploadLink(req: FastifyRequest<{ Params: { truckId: string } }>, reply: FastifyReply): Promise<any> {
    try {
      if (req.params.truckId) {
        const decodeId = util.decodeUserId(req.params.truckId)
        const repo = new TruckDynamodbRepository()
        const result = await repo.deleteUploadLink(decodeId)

        if (result && typeof result == "object")
          return { data: true }
        else return { data: false }
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  @POST({  // call media/confirm & /:truckId/clear-upload-link
    url: '/:truckId/update-truck-profile',
    options: {
      schema: updateTruckDocumentResponse
    }
  })
  async updateUserProfile(req: FastifyRequest<{ Params: { truckId: string }, Body: { token: string, url: string[] } }>, reply: FastifyReply): Promise<any> {
    try {
      if (req.params.truckId) {

        const decodeId = util.decodeUserId(req.params.truckId)
        //  1. Validate token(latest upload link) in cgl_user_upload_link 
        const repo = new TruckDynamodbRepository()
        const uploadTokenLink = await repo.findAttachCodeWithTruck(decodeId)
        if (!uploadTokenLink || (typeof uploadTokenLink == "object" && Object.keys(uploadTokenLink).length == 0))
          reply.status(400).send({ message: "Link was expired, please contact manager" })

        if (uploadTokenLink && uploadTokenLink.token != req.body.token) {
          reply.status(400).send({ message: "Link was expired, please contact manager" })
        }
        console.log("Step 1 : upload link data : ", uploadTokenLink)

        // 2. call media/confirm
        if (Array.isArray(req.body.url) == false) {
          reply.status(400).send({ message: "Invalid url format type" })
        }
        const confirmResult = await this.updateTruckProfileService.confirmMedia(req.body.url)

        console.log("Step 2 : confirm media : ", confirmResult)

        // 3. call id/clear-upload-link
        if (confirmResult && confirmResult?.message == "confirm success") {
          await this.truckDocumentService.updateUserFile(decodeId, req.body.url)
          const controllerM = new TruckController()
          const clearUploadLinkResult = await controllerM.ClearUploadLink(req, reply)
          console.log("Step 3 : clear upload link : ", clearUploadLinkResult)
          return { message: "Update success" }
        } else {
          reply.status(400).send({ message: "Invalid url entry" })
        }
      } 
      else reply.status(400).send({message: "Invalid truckId"})
    } catch (err) {
      throw new Error(err)
    }
  }

}
