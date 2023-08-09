import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './model/region.model';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region)
    private regionRepo: typeof Region,
  ) {}

  async createRegion(createRegionDto: CreateRegionDto): Promise<Region> {
    const region = await this.regionRepo.create(createRegionDto);
    return region;
  }

  async getAllRegions(): Promise<Region[]> {
    const region = await this.regionRepo.findAll({ include: { all: true } });
    return region;
  }

  async getRegionById(id: number): Promise<Region> {
    const region = await this.regionRepo.findOne({
      where: { id },
    });
    return region;
  }

  async deleteRegionById(id: number): Promise<number> {
    return this.regionRepo.destroy({ where: { id } });
  }

  async updateRegion(
    id: number,
    updateRegionDto: UpdateRegionDto,
  ): Promise<Region> {
    const region = await this.regionRepo.update(updateRegionDto, {
      where: { id },
      returning: true,
    });

    return region[1][0].dataValues;
  }
}
