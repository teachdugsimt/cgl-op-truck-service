import { FastifyInstance } from 'fastify';
import { FastifyInstanceToken, getInstanceByToken } from 'fastify-decorators';
import { DtbTruck } from '../models';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

export default class MigrateRepository {

  private instance: FastifyInstance = getInstanceByToken(FastifyInstanceToken);

  async find(filter: FindManyOptions = {}): Promise<any> {
    const server: any = this.instance
    const TruckRepository: Repository<DtbTruck> = server?.db?.truck;
    return TruckRepository.find(filter);
  }

  async addUpdate(data: any): Promise<any> {
    const server: any = this.instance
    const TruckRepository: Repository<DtbTruck> = server?.db?.truck;
    return TruckRepository.save(data);
  }
}
