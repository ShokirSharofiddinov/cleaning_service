import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { InjectModel } from '@nestjs/sequelize';
import { District } from './model/district.model';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District)
    private districtRepo: typeof District,
  ) {}

  async createDistrict(createDistrictDto: CreateDistrictDto): Promise<District> {
    const district = await this.districtRepo.create(createDistrictDto);
    return district;
  }

  async getAllDistricts(): Promise<District[]> {
    const district = await this.districtRepo.findAll({ include: { all: true } });
    return district;
  }

  async getDistrictById(id: number): Promise<District> {
    const district = await this.districtRepo.findOne({
      where: { id },
    });
    return district;
  }

  async deleteDistrictById(id: number): Promise<number> {
    return this.districtRepo.destroy({ where: { id } });
  }

  async updateDistrict(
    id: number,
    updateDistrictDto: UpdateDistrictDto,
  ): Promise<District> {
    const district = await this.districtRepo.update(updateDistrictDto, {
      where: { id },
      returning: true,
    });

    return district[1][0].dataValues;
  }
}
