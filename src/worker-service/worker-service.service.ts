import { Injectable } from '@nestjs/common';
import { CreateWorkerServiceDto } from './dto/create-worker-service.dto'; 
import { InjectModel } from '@nestjs/sequelize';
import { WorkerService } from './model/worker-service.model';
import { UpdateWorkerServiceDto } from './dto/update-worker-service.dto'

@Injectable()
export class WorkerServiceService {
  constructor(
    @InjectModel(WorkerService)
    private regionRepo: typeof WorkerService,
  ) {}

  async createWorkerService(createWorkerServiceDto: CreateWorkerServiceDto): Promise<WorkerService> {
    const region = await this.regionRepo.create(createWorkerServiceDto);
    return region;
  }

  async getAllWorkerServices(): Promise<WorkerService[]> {
    const region = await this.regionRepo.findAll({ include: { all: true } });
    return region;
  }

  async getWorkerServiceById(id: number): Promise<WorkerService> {
    const region = await this.regionRepo.findOne({
      where: { id },
    });
    return region;
  }

  async deleteWorkerServiceById(id: number): Promise<number> {
    return this.regionRepo.destroy({ where: { id } });
  }

  async updateWorkerService(
    id: number,
    updateWorkerServiceDto: UpdateWorkerServiceDto,
  ): Promise<WorkerService> {
    const region = await this.regionRepo.update(updateWorkerServiceDto, {
      where: { id },
      returning: true,
    });

    return region[1][0].dataValues;
  }
}
