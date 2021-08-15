import { Service, Initializer, Destructor } from 'fastify-decorators';
import TruckRepository from '../repositories/truck-repository';
const truckRepository = new TruckRepository()
@Service()
export default class TruckDocumentService {

  @Initializer()
  async init(): Promise<void> {
  }

  async updateUserFile(truckId: number, url: string[]): Promise<any> {
    console.log("Truck id to update :: ", truckId)
    console.log("url attachCode to update :: ", url)
    const findUser = await truckRepository.findOne(truckId)
    if (!findUser.document) {
      const newDocument = {}
      url.forEach((e, i) => {
        newDocument[i] = e
      })
      findUser.document = newDocument
    } else {
      const tmpDocument = findUser.document
      const startLength = Object.keys(tmpDocument).length
      url.forEach((e, i) => {
        tmpDocument[startLength + i] = e
      })
      console.log(tmpDocument)
      findUser.document = tmpDocument
    }
    findUser.documentStatus = "WAIT_FOR_VERIFIED"
    console.log("Data send to update :: ", findUser)
    const updateProfile = await truckRepository.update(findUser)
    console.log("Data when finish update :: ", updateProfile)
    return updateProfile
  }


  @Destructor()
  async destroy(): Promise<void> {
  }
}
