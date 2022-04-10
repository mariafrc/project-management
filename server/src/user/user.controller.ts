import {
  Controller,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt-auth.guard';
import { ChangeNameInput } from './dto/ChangeNameInput';
import { ChangePasswordInput } from './dto/ChangePasswordInput';

@Controller('api/users')
@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id/change-name')
  changeName(
    @Param('id') id: string,
    @Body() changeNameInput: ChangeNameInput,
  ) {
    return this.userService.changeName(id, changeNameInput.username);
  }

  @Patch(':id/change-password')
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordInput: ChangePasswordInput,
  ) {
    const { lastPassword, newPassword } = changePasswordInput;

    const passwordValid = await this.userService.isValid(id, lastPassword);
    if (!passwordValid) {
      throw new BadRequestException('Password error');
    }

    return this.userService.changePassword(id, newPassword);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
