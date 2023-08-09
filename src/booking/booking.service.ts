import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from './model/booking.model';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking)
    private bookingRepo: typeof Booking,
  ) {}

  async createBooking(
    createBookingDto: CreateBookingDto,
  ): Promise<Booking> {
    const booking = await this.bookingRepo.create(createBookingDto);
    return booking;
  }

  async getAllBookings(): Promise<Booking[]> {
    const booking = await this.bookingRepo.findAll({
      include: { all: true },
    });
    return booking;
  }

  async getBookingById(id: number): Promise<Booking> {
    const booking = await this.bookingRepo.findOne({
      where: { id },
    });
    return booking;
  }

  async deleteBookingById(id: number): Promise<number> {
    return this.bookingRepo.destroy({ where: { id } });
  }

  async updateBooking(
    id: number,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    const booking = await this.bookingRepo.update(updateBookingDto, {
      where: { id },
      returning: true,
    });

    return booking[1][0].dataValues;
  }
}
