import { Body, Controller, Post } from "@nestjs/common";
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AuthServiceStudent } from "./auth.service.student";
import { AuthServiceAdmin } from "./auth.service.admin";
import { RefreshToken } from "./dtos/refresh-token.dto";
import { LoginSharedDto } from "./dtos/shared-login.dto";
import { CreateStudentDto } from "./dtos/student-signup.dto";
import { CreateAdminDto } from "./dtos/admin-signup.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authServiceStudent: AuthServiceStudent,
    private readonly authServiceAdmin: AuthServiceAdmin
  ) {}

  @Post("student-signup")
  @ApiCreatedResponse({ description: "Student created successfully" })
  @ApiBadRequestResponse({ description: "Invalid student data" })
  async signUpStudent(@Body() signupData: CreateStudentDto) {
    return this.authServiceStudent.createStudent(signupData);
  }

  @Post("student-login")
  @ApiCreatedResponse({
    description: "Student logged in successfully, tokens returned",
  })
  @ApiUnauthorizedResponse({ description: "Wrong credentials" })
  async loginStudent(@Body() credentials: LoginSharedDto) {
    return this.authServiceStudent.loginStudent(credentials);
  }

  @Post("admin-signup")
  @ApiCreatedResponse({ description: "Admin created successfully" })
  @ApiBadRequestResponse({ description: "Invalid admin data" })
  async signUpAdmin(@Body() signupData: CreateAdminDto) {
    return this.authServiceAdmin.createAdmin(signupData);
  }

  @Post("admin-login")
  @ApiCreatedResponse({
    description: "Admin logged in successfully, tokens returned",
  })
  @ApiUnauthorizedResponse({ description: "Wrong credentials" })
  async loginAdmin(@Body() credentials: LoginSharedDto) {
    return this.authServiceAdmin.loginAdmin(credentials);
  }

  @Post("student-refresh-token")
  @ApiCreatedResponse({ description: "Student tokens refreshed successfully" })
  @ApiUnauthorizedResponse({ description: "Invalid refresh token" })
  async refreshTokensStudent(@Body() refreshTokenDto: RefreshToken) {
    return this.authServiceStudent.refreshTokens(refreshTokenDto.token);
  }

  @Post("admin-refresh-token")
  @ApiCreatedResponse({ description: "Admin tokens refreshed successfully" })
  @ApiUnauthorizedResponse({ description: "Invalid refresh token" })
  async refreshTokensAdmin(@Body() refreshTokenDto: RefreshToken) {
    return this.authServiceAdmin.refreshTokens(refreshTokenDto.token);
  }
}
