import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '~module/user/user.module';
import { PassportModule } from '@nestjs/passport';
// import { APP_PIPE } from '@nestjs/core';
// import { ValidationPipe } from '../../validation.pipe';
import { JwtStrategy } from './strategy/jwt-strategy';

@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },
  ],
})
export class AuthModule {}
