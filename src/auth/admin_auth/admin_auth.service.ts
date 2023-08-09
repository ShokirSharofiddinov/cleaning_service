import { MailService } from '../../mail/mail.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from '../../admin/model/admin.model';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto } from './dto/admin_auth_login-auth.dto';
import { Op } from 'sequelize';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin) private adminRepo: typeof Admin,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async registration(createAdminDto: CreateAdminDto, res: Response) {
    const admin = await this.adminRepo.findOne({
      where: { email: createAdminDto.email },
    });
    if (admin) {
      throw new BadRequestException('Admin alerady exists!');
    }
    if (createAdminDto.password !== createAdminDto.password) {
      throw new BadRequestException('Password is not match!');
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminRepo.create({
      ...createAdminDto,
      password: hashed_password,
    });
    const tokens = await this.getTokens(newAdmin);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();

    const updateAdmin = await this.adminRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        active_link: uniqueKey,
      },
      { where: { id: newAdmin.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    await this.mailService.sendAdminConfirmation(updateAdmin[1][0]);

    const response = {
      message: 'Admin registerd',
      admin: updateAdmin[1][0],
      tokens,
    };
    return response;
  }

  async getTokens(admin: Admin) {
    const jwtPayload = {
      id: admin.id,
      is_active: admin.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async login(loginAdminDto: LoginDto, res: Response) {
    const { email, password } = loginAdminDto;
    const admin = await this.adminRepo.findOne({ where: { email } });
    if (!admin) {
      throw new UnauthorizedException('Admin not registered');
    }
    const isMatchPass = await bcrypt.compare(password, admin.password);
    if (!isMatchPass) {
      throw new UnauthorizedException('Admin not registered(pass)');
    }
    const tokens = await this.getTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updateAdmin = await this.adminRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: admin.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Admin logged in',
      admin: updateAdmin[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!adminData) {
      throw new ForbiddenException('Admin not found');
    }
    const updateAdmin = await this.adminRepo.update(
      { hashed_refresh_token: null },
      { where: { id: adminData.id }, returning: true },
    );

    res.clearCookie('refresh_token');
    const response = {
      message: 'Admin logged out successfully',
      admin: updateAdmin[1][0],
    };

    return response;
  }

  async refreshToken(admin_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (admin_id != decodedToken['id']) {
      throw new BadRequestException('admin not found');
    }
    const admin = await this.adminRepo.findOne({
      where: { id: admin_id },
    });
    if (!admin || !admin.hashed_refresh_token) {
      throw new BadRequestException('admin not found');
    }

    const tokenMatch = await bcrypt.compare(refreshToken, admin.password);

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updateAdmin = await this.adminRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: admin.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
    });

    const response = {
      message: 'Admin refreshed',
      admin: updateAdmin[1][0],
      tokens,
    };
    return response;
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Acktivation link not found');
    }
    const updateAdmin = await this.adminRepo.update(
      { is_active: true },
      { where: { active_link: link, is_active: false }, returning: true },
    );

    if (!updateAdmin[1][0]) {
      throw new BadRequestException('Admin already actived');
    }

    const response = {
      message: 'Admin activated successfully',
      admin: updateAdmin,
    };
    return response;
  }
}
