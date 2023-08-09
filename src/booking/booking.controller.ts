import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './model/booking.model';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminSelfGuard } from '../guards/admin.self.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOperation({ summary: 'for create booking' })
  @ApiResponse({ status: 200, description: 'New booking' })
  @Post('create')
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    const booking = await this.bookingService.createBooking(createBookingDto);
    return booking;
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'take all bookinges' })
  @ApiResponse({ status: 200, description: 'get all booking' })
  @Get('all')
  async getAllBooking(): Promise<Booking[]> {
    return this.bookingService.getAllBookings();
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'take bookings by id' })
  @ApiResponse({ status: 200, description: 'get booking by id' })
  @Get(':id')
  async getBookingById(@Param('id') id: string): Promise<Booking> {
    return this.bookingService.getBookingById(+id);
  }


  @ApiOperation({ summary: 'for delete booking' })
  @ApiResponse({ status: 200, description: 'delete booking' })
  @Delete(':id')
  async deleteBookingById(@Param('id') id: string): Promise<number> {
    return this.bookingService.deleteBookingById(+id);
  }

  @ApiOperation({ summary: 'for update booking' })
  @ApiResponse({ status: 200, description: 'update booking' })
  @Put(':id')
  async updateBooking(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    return this.bookingService.updateBooking(+id, updateBookingDto);
  }
}
