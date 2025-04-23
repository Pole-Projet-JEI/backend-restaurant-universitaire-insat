import {
  HttpStatus,
  HttpException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "src/typeorm/entities/Users/Student.entity";
import { Wallet } from "src/typeorm/entities/wallet.entity";
import { QrCode } from "src/typeorm/entities/qrCode.entity";
import { CreateStudentDto } from "./dtos/student-signup.dto";
import { MoreThanOrEqual, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { LoginSharedDto } from "./dtos/shared-login.dto";
import { JwtService } from "@nestjs/jwt";
import { RefreshToken } from "src/typeorm/entities/RefreshToken/refreshToken.entity";
import { v4 as uuidv4 } from "uuid";
import { ConfigService } from "@nestjs/config";
import { QrcodeService } from "src/QRCode/qrcode.service";

@Injectable()
export class AuthServiceStudent {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(Wallet) private walletRepo: Repository<Wallet>,
    @InjectRepository(QrCode) private qrCodeRepo: Repository<QrCode>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepo: Repository<RefreshToken>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly qrCodeService: QrcodeService
  ) {}

  async createStudent(dto: CreateStudentDto) {
    //If I find a student with same email or same CIN or same registration number, I throw an error
    const studentExists = await this.studentRepo.findOne({
      where: [
        { email: dto.email },
        { nationalId: dto.nationalId },
        { registrationNumber: dto.registrationNumber },
      ],
    });
    if (studentExists != null) {
      throw new HttpException("Student already exists", HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Create Wallet
    const wallet = this.walletRepo.create({ ticketBalance: 0 });
    await this.walletRepo.save(wallet);

    // Create QR Code
    const code = uuidv4();
    const qrCode = await this.qrCodeService.create({ userId: dto.nationalId, code });

    // Create Student
    const student = this.studentRepo.create({
      ...dto,
      passwordHash: hashedPassword,
      qrCode,
      wallet
    });

    await this.studentRepo.save(student);
  }

  async loginStudent(credentials: LoginSharedDto) {
    const { email, password } = credentials;

    // Find student by email
    const student = await this.studentRepo.findOne({ where: { email } });
    if (!student) {
      throw new UnauthorizedException("Wrong credentials Student!");
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

    await this.refreshTokenRepo.remove(token);

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
      sub: studentNationalId, // Standard JWT field for subject
      email: studentEmail,
      role: studentRole,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn: 3600 });
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
