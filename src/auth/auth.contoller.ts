import { Body, Controller, Post } from "@nestjs/common";
import { AuthServiceStudent } from "./auth.service.student";
import { RefreshToken } from "./dtos/refresh-token.dto";
import { AuthServiceAdmin } from "./auth.service.admin";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authServiceStudent: AuthServiceStudent,
    private readonly authServiceAdmin: AuthServiceAdmin

  ) {}

  @Post("student-signup")
  async signUpStudent(@Body() signupData) {
    return this.authServiceStudent.createStudent(signupData);
  }

  @Post("student-login")
  async loginStudent(@Body() credentials) {
    return this.authServiceStudent.loginStudent(credentials);
  }
  @Post("admin-signup")
  async signUpAdmin(@Body() signupData) {
    return this.authServiceAdmin.createAdmin(signupData);
  }
  @Post("admin-login")
  async login(@Body() credentials) {
    return this.authServiceAdmin.loginAdmin(credentials);
  }

  @Post("student-refresh-token")
  async refreshTokensStudent(@Body() refreshTokenDto: RefreshToken) {
    return this.authServiceStudent.refreshTokens(refreshTokenDto.token);
  }
  @Post("admin-refresh-token")
  async refreshTokensAdmin(@Body() refreshTokenDto: RefreshToken) {
    return this.authServiceAdmin.refreshTokens(refreshTokenDto.token);
  }
}