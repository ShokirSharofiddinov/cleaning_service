import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './model/service.model';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service)
    private serviceRepo: typeof Service,
  ) {}

  async createService(createServiceDto: CreateServiceDto): Promise<Service> {
    const service = await this.serviceRepo.create(createServiceDto);
    return service;
  }

  async getAllServices(): Promise<Service[]> {
    const service = await this.serviceRepo.findAll({ include: { all: true } });
    return service;
  }

  async getServiceById(id: number): Promise<Service> {
    const service = await this.serviceRepo.findOne({
      where: { id },
    });
    return service;
  }

  async deleteServiceById(id: number): Promise<number> {
    return this.serviceRepo.destroy({ where: { id } });
  }

  async updateService(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    const service = await this.serviceRepo.update(updateServiceDto, {
      where: { id },
      returning: true,
    });

    return service[1][0].dataValues;
  }
}
