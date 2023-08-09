import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Location } from './model/location.model';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location)
    private locationRepo: typeof Location,
  ) {}

  async createLocation(
    createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    const location = await this.locationRepo.create(createLocationDto);
    return location;
  }

  async getAllLocations(): Promise<Location[]> {
    const location = await this.locationRepo.findAll({
      include: { all: true },
    });
    return location;
  }

  async getLocationById(id: number): Promise<Location> {
    const location = await this.locationRepo.findOne(
      {
        where: { id },
        include: {all: true}
      },
    );
    return location;
  }

  async deleteLocationById(id: number): Promise<number> {
    return this.locationRepo.destroy({ where: { id }, });
  }

  async updateLocation(
    id: number,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    const location = await this.locationRepo.update(updateLocationDto, {
      where: { id },
      returning: true,
    });

    return location[1][0].dataValues;
  }
}
