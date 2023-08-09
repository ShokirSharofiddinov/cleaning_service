import { MailService } from '../../mail/mail.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateWorkerDto } from '../../workers/dto/create-worker.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Worker } from '../../workers/model/worker.model';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto } from './dto/worker_auth_login-auth.dto';

@Injectable()
export class WorkersService {
  constructor(
    @InjectModel(Worker) private workerRepo: typeof Worker,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async registration(createWorkerDto: CreateWorkerDto, res: Response) {
    const worker = await this.workerRepo.findOne({
      where: { email: createWorkerDto.email },
    });
    if (worker) {
      throw new BadRequestException('Worker alerady exists!');
    }
    if (createWorkerDto.password !== createWorkerDto.password) {
      throw new BadRequestException('Password is not match!');
    }

    const hashed_password = await bcrypt.hash(createWorkerDto.password, 7);
    const newWorker = await this.workerRepo.create({
      ...createWorkerDto,
      password: hashed_password,
    });
    const tokens = await this.getTokens(newWorker);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();

    const updateWorker = await this.workerRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        active_link: uniqueKey,
      },
      { where: { id: newWorker.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    await this.mailService.sendWorkerConfirmation(updateWorker[1][0]);

    const response = {
      message: 'Worker registerd',
      worker: updateWorker[1][0],
      tokens,
    };
    return response;
  }

  async getTokens(worker: Worker) {
    const jwtPayload = {
      id: worker.id,
      is_active: worker.is_active,
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

  async login(loginWorkerDto: LoginDto, res: Response) {
    const { email, password } = loginWorkerDto;
    const worker = await this.workerRepo.findOne({ where: { email } });
    if (!worker) {
      throw new UnauthorizedException('Worker not registered');
    }
    const isMatchPass = await bcrypt.compare(password, worker.password);
    if (!isMatchPass) {
      throw new UnauthorizedException('Worker not registered(pass)');
    }
    const tokens = await this.getTokens(worker);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updateWorker = await this.workerRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: worker.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
    });

    const response = {
      message: 'Worker logged in',
      worker: updateWorker[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const workerData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!workerData) {
      throw new ForbiddenException('Worker not found');
    }
    const updateWorker = await this.workerRepo.update(
      { hashed_refresh_token: null },
      { where: { id: workerData.id }, returning: true },
    );

    res.clearCookie('refresh_token');
    const response = {
      message: 'Worker logged out successfully',
      worker: updateWorker[1][0],
    };

    return response;
  }

  async refreshToken(worker_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (worker_id != decodedToken['id']) {
      throw new BadRequestException('worker not found');
    }
    const worker = await this.workerRepo.findOne({
      where: { id: worker_id },
    });
    if (!worker || !worker.hashed_refresh_token) {
      throw new BadRequestException('worker not found');
    }

    const tokenMatch = await bcrypt.compare(refreshToken, worker.password);

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(worker);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updateWorker = await this.workerRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: worker.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
    });

    const response = {
      message: 'Worker refreshed',
      worker: updateWorker[1][0],
      tokens,
    };
    return response;
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Acktivation link not found');
    }
    const updateWorker = await this.workerRepo.update(
      { is_active: true },
      { where: { active_link: link, is_active: false }, returning: true },
    );

    if (!updateWorker[1][0]) {
      throw new BadRequestException('Worker already actived');
    }

    const response = {
      message: 'Worker activated successfully',
      worker: updateWorker,
    };
    return response;
  }
}
