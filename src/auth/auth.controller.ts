import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RefreshToken } from "./dtos/refresh-token.dto";


@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signUp(@Body() signupData) {
    return this.authService.createStudent(signupData);
  }

  @Post("login")
  async login(@Body() credentials) {
    return this.authService.login(credentials);
  }

  @Post("refresh")
  async refreshTokens(@Body() refreshTokenDto: RefreshToken){
    return this.authService.refreshTokens(refreshTokenDto.token)
  }
}
