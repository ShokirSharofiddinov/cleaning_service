import { Injectable } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Worker } from './model/worker.model';
import { UpdateWorkerDto } from './dto/update-worker.dto';

@Injectable()
export class WorkerService {
  constructor(
    @InjectModel(Worker)
    private workerRepo: typeof Worker,
  ) {}

  async createWorker(
    createWorkerDto: CreateWorkerDto,
  ): Promise<Worker> {
    const worker = await this.workerRepo.create(createWorkerDto);
    return worker;
  }

  async getAllWorkers(): Promise<Worker[]> {
    const worker = await this.workerRepo.findAll({
      include: { all: true },
    });
    return worker;
  }

  async getWorkerById(id: number): Promise<Worker> {
    const worker = await this.workerRepo.findOne({
      where: { id },
    });
    return worker;
  }

  async deleteWorkerById(id: number): Promise<number> {
    return this.workerRepo.destroy({ where: { id } });
  }

  async updateWorker(
    id: number,
    updateWorkerDto: UpdateWorkerDto,
  ): Promise<Worker> {
    const worker = await this.workerRepo.update(updateWorkerDto, {
      where: { id },
      returning: true,
    });

    return worker[1][0].dataValues;
  }
}
