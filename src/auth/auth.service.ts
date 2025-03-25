import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "src/typeorm/entities/Users/Student.entity";
import { Wallet } from "src/typeorm/entities/wallet.entity";
import { QrCode } from "src/typeorm/entities/qrCode.entity";
import { CreateStudentDto } from "./dtos/student.dto";
import { MoreThanOrEqual, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { LoginStudentDto } from "./dtos/student-login.dto";
import { JwtService } from "@nestjs/jwt";
import { RefreshToken } from "src/typeorm/entities/RefreshToken/refreshToken.entity";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(Wallet) private walletRepo: Repository<Wallet>,
    @InjectRepository(QrCode) private qrCodeRepo: Repository<QrCode>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepo: Repository<RefreshToken>,
    private jwtService: JwtService
  ) {}

  async createStudent(dto: CreateStudentDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Create Wallet
    const wallet = this.walletRepo.create({ ticketBalance: 0 });
    await this.walletRepo.save(wallet);

    // Create QR Code
    const qrCode = this.qrCodeRepo.create({ code: `QR-${dto.nationalId}` });
    await this.qrCodeRepo.save(qrCode);

    // Create Student
    const student = this.studentRepo.create({
      ...dto,
      passwordHash: hashedPassword,
      wallet,
      qrCode,
    });

    await this.studentRepo.save(student);
  }

  async login(credentials: LoginStudentDto) {
    const { email, password } = credentials;
    
    // Find student by email
    const student = await this.studentRepo.findOne({ where: { email } });
    if (!student) {
      throw new UnauthorizedException("Wrong credentials");
    }

    const passwordMatch = await bcrypt.compare(password, student.passwordHash);
    if (!passwordMatch) {
      throw new UnauthorizedException("Wrong credentials");
    }

    return this.generateStudentTokens(
      student.nationalId,
      student.email,
      student.role
    );
  }

  async refreshTokens(refreshToken: string) {
    const token = await this.refreshTokenRepo.findOne({
      where: {
        refreshToken,
        expiresAt: MoreThanOrEqual(new Date()),
      },
    });

    if (!token) {
      throw new UnauthorizedException("Refresh token is invalid");
    }

    // Remove old refresh token (each user has only one active token)
    await this.refreshTokenRepo.remove(token);

    // Find student by national ID
    const student = await this.studentRepo.findOne({
      where: { nationalId: token.userNationalId },
    });

    if (!student) {
      throw new UnauthorizedException("Student not found");
    }

    return this.generateStudentTokens(
      student.nationalId,
      student.email,
      student.role
    );
  }

  async generateStudentTokens(studentNationalId, studentEmail, studentRole) {
    const payload = {
      sub: studentNationalId,  // Standard JWT field for subject
      email: studentEmail,
      role: studentRole,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = uuidv4();
    await this.storeRefreshToken(refreshToken, studentNationalId);

    return { accessToken, refreshToken };
  }

  async storeRefreshToken(token: string, studentNationalId: number) {
    // Expiry date (10 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 10);

    // Check if a refresh token exists for this user
    let existingToken = await this.refreshTokenRepo.findOne({
      where: { userNationalId: studentNationalId },
    });

    if (existingToken) {
      // Update existing token
      existingToken.refreshToken = token;
      existingToken.expiresAt = expiresAt;
      await this.refreshTokenRepo.save(existingToken);
    } else {
      // Create a new token
      const newToken = this.refreshTokenRepo.create({
        userNationalId: studentNationalId,
        refreshToken: token,
        expiresAt,
      });
      await this.refreshTokenRepo.save(newToken);
    }
  }
}
