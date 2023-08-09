import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './model/admin.model';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin)
    private adminRepo: typeof Admin,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin = await this.adminRepo.create(createAdminDto);
    return admin;
  }

  async getAllAdmins(): Promise<Admin[]> {
    const admin = await this.adminRepo.findAll({
      include: { all: true },
    });
    return admin;
  }

  async getAdminById(id: number): Promise<Admin> {
    const admin = await this.adminRepo.findOne({
      where: { id },
    });
    return admin;
  }

  async deleteAdminById(id: number): Promise<number> {
    return this.adminRepo.destroy({ where: { id } });
  }

  async updateAdmin(
    id: number,
    updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    const admin = await this.adminRepo.update(updateAdminDto, {
      where: { id },
      returning: true,
    });

    return admin[1][0].dataValues;
  }
}
