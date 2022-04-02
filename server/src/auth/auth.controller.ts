import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local/local-auth.guard';
import { LoginInput } from './dto/LoginInput.dto';
import { RegisterInput } from './dto/RegisterInput.dto';
import { UniqueUserValidationPipe } from './pipe/unique-user-validation.pipe';

@Controller('api')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginInput: LoginInput, @Req() req: any) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @UsePipes(UniqueUserValidationPipe)
  async register(@Body() registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }
}
