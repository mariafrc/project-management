import { Controller, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { AddUserDto, ChangeNameDto, ChangePasswordDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
    constructor(private userService: UserService){}
    
    @Post()
    addUser(@Body() addUserDto: AddUserDto){
        this.userService.createUser(addUserDto);
    }

    @Patch(':id/change-name')
    changeName(@Param('id', ParseIntPipe) id: number, @Body() changeNameDto: ChangeNameDto){
        return this.userService.changeName(id, changeNameDto.username);
    }

    @Patch(':id/change-password')
    async changePassword(@Param('id', ParseIntPipe) id: number, @Body() changePasswordDto: ChangePasswordDto){
        if(!this.userService.isValid(id, changePasswordDto.lastPassword)){
            throw new BadRequestException("Password error");
        }
        return this.userService.changePassword(id, changePasswordDto.newPassword);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number){
        return this.userService.deleteUser(id);
    }
}
