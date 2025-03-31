import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "src/typeorm/entities/Users/Admin.entity";
import { Repository, MoreThanOrEqual } from "typeorm";
import { CreateAdminDto } from "./dtos/admin-signup.dto";
import * as bcrypt from "bcrypt";
import { LoginSharedDto } from "./dtos/shared-login.dto";
import { JwtService } from "@nestjs/jwt";
import { RefreshToken } from "src/typeorm/entities/RefreshToken/refreshToken.entity";
import { v4 as uuidv4 } from "uuid";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthServiceAdmin {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepo: Repository<RefreshToken>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async createAdmin(dto: CreateAdminDto) {
    const hashedPassword = await bcrypt.hash(dto.passwordHash, 10);
    const admin = this.adminRepo.create({
      ...dto,
      passwordHash: hashedPassword,
    });
    await this.adminRepo.save(admin);
  }

  async loginAdmin(credentials: LoginSharedDto) {
    const { email, password } = credentials;
    const admin = await this.adminRepo.findOne({ where: { email } });
    if (!admin) {
      throw new UnauthorizedException("Wrong credentials Admin!");
    }

    const passwordMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!passwordMatch) {
      throw new UnauthorizedException("Wrong credentials Admin!");
    }

    return this.generateAdminTokens(
      admin.nationalId,
      admin.email,
      admin.role
    );
  }

  async refreshTokens(refreshToken: string) {
    const tokenEntity = await this.refreshTokenRepo.findOne({
      where: {
        refreshToken,
        expiresAt: MoreThanOrEqual(new Date()),
      },
    });

    if (!tokenEntity) {
      throw new UnauthorizedException("Refresh token is invalid");
    }

    await this.refreshTokenRepo.remove(tokenEntity);

    const admin = await this.adminRepo.findOne({
      where: { nationalId: tokenEntity.userNationalId },
    });

    if (!admin) {
      throw new UnauthorizedException("Admin not found");
    }

    return this.generateAdminTokens(
      admin.nationalId,
      admin.email,
      admin.role
    );
  }

  async generateAdminTokens(adminNationalId: number, adminEmail: string, adminRole: string) {
    const payload = {
      sub: adminNationalId, // Standard JWT subject field
      email: adminEmail,
      role: adminRole,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn: 3600 });
    const refreshToken = uuidv4();
    await this.storeRefreshToken(refreshToken, adminNationalId);
    return { accessToken, refreshToken };
  }

  async storeRefreshToken(token: string, adminNationalId: number) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 10); // Refresh token valid for 10 days

    let existingToken = await this.refreshTokenRepo.findOne({
      where: { userNationalId: adminNationalId },
    });

    if (existingToken) {
      existingToken.refreshToken = token;
      existingToken.expiresAt = expiresAt;
      await this.refreshTokenRepo.save(existingToken);
    } else {
      const newToken = this.refreshTokenRepo.create({
        userNationalId: adminNationalId,
        refreshToken: token,
        expiresAt,
      });
      await this.refreshTokenRepo.save(newToken);
    }
  }
}
