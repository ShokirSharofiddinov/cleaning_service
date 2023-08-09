import { Injectable } from '@nestjs/common';
import { CreatePayTypeDto } from './dto/create-pay-type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PayType } from './model/pay-type.model';
import { UpdatePayTypeDto } from './dto/update-pay-type.dto';

@Injectable()
export class PayTypeService {
  constructor(
    @InjectModel(PayType)
    private payTypeRepo: typeof PayType,
  ) {}

  async createPayType(createPayTypeDto: CreatePayTypeDto): Promise<PayType> {
    const payType = await this.payTypeRepo.create(createPayTypeDto);
    return payType;
  }

  async getAllPayTypes(): Promise<PayType[]> {
    const payType = await this.payTypeRepo.findAll({ include: { all: true } });
    return payType;
  }

  async getPayTypeById(id: number): Promise<PayType> {
    const payType = await this.payTypeRepo.findOne({
      where: { id },
    });
    return payType;
  }

  async deletePayTypeById(id: number): Promise<number> {
    return this.payTypeRepo.destroy({ where: { id } });
  }

  async updatePayType(
    id: number,
    updatePayTypeDto: UpdatePayTypeDto,
  ): Promise<PayType> {
    const payType = await this.payTypeRepo.update(updatePayTypeDto, {
      where: { id },
      returning: true,
    });

    return payType[1][0].dataValues;
  }
}
